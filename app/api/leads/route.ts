import { NextResponse } from "next/server";

type LeadRequest = {
  niche?: string;
  page?: string;
  pagePath?: string;
  consentStatus?: string;
  answers?: Record<string, string | string[]>;
  utm?: Record<string, string>;
};

function isValidLeadRequest(body: LeadRequest) {
  return Boolean(body.niche && body.page && body.answers && typeof body.answers === "object");
}

function normalizeFunnelType(niche?: string) {
  const normalized = (niche || "").toLowerCase();

  if (normalized.includes("study")) {
    return "study_abroad";
  }

  if (normalized.includes("real")) {
    return "real_estate";
  }

  return "growth";
}

function flattenAnswer(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value.join(", ");
  return value || "";
}

function buildLeadPayload(body: LeadRequest) {
  const answers = body.answers || {};
  const utm = body.utm || {};

  return {
    submittedAt: new Date().toISOString(),
    funnelType: normalizeFunnelType(body.niche),
    name: flattenAnswer(answers.name),
    phone: flattenAnswer(answers.whatsapp),
    email: flattenAnswer(answers.email),
    businessName: flattenAnswer(answers.businessName),
    city: flattenAnswer(answers.location),
    businessType: flattenAnswer(answers.businessType),
    niche: body.niche || "",
    category: flattenAnswer(answers.propertyType || answers.services || answers.countries) || body.niche || "",
    adPlatform: flattenAnswer(answers.helpNeeded || answers.leadSource),
    monthlyBudget: flattenAnswer(answers.monthlyBudget),
    mainProblem: flattenAnswer(answers.biggestProblem),
    leadSource: flattenAnswer(answers.leadSource),
    propertyTypes: flattenAnswer(answers.propertyType || answers.services),
    leadSources: flattenAnswer(answers.leadSource),
    biggestProblems: flattenAnswer(answers.biggestProblem),
    currentBottlenecks: flattenAnswer(answers.helpNeeded),
    answers,
    allQuestionnaireAnswers: answers,
    utm: {
      ...utm,
      source: utm.utm_source || "",
      medium: utm.utm_medium || "",
      campaign: utm.utm_campaign || "",
      content: utm.utm_content || "",
      term: utm.utm_term || ""
    },
    utmSource: utm.utm_source || "",
    utmMedium: utm.utm_medium || "",
    utmCampaign: utm.utm_campaign || "",
    utmContent: utm.utm_content || "",
    utmTerm: utm.utm_term || "",
    utm_source: utm.utm_source || "",
    utm_medium: utm.utm_medium || "",
    utm_campaign: utm.utm_campaign || "",
    utm_content: utm.utm_content || "",
    utm_term: utm.utm_term || "",
    pagePath: body.pagePath || `/${body.page}`,
    consentStatus: body.consentStatus || "contact_consent_accepted",
    consent: body.consentStatus || "contact_consent_accepted",
    page: body.page || "",
    notificationEmail: process.env.NOTIFICATION_EMAIL || null,
    leadGoogleSheetUrl: process.env.LEAD_GOOGLE_SHEET_URL || null
  };
}

export async function POST(request: Request) {
  let body: LeadRequest;

  try {
    body = (await request.json()) as LeadRequest;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request payload." }, { status: 400 });
  }

  if (!isValidLeadRequest(body)) {
    return NextResponse.json({ ok: false, message: "Missing required lead fields." }, { status: 400 });
  }

  const payload = buildLeadPayload(body);

  if (!process.env.LEAD_WEBHOOK_URL) {
    // Setup warning: a normal Google Sheet edit URL cannot receive POST requests.
    // Add a Google Apps Script webhook or CRM webhook to LEAD_WEBHOOK_URL before launch.
    if (process.env.NODE_ENV !== "production") {
      console.info("Lead webhook not configured. Development lead payload:", payload);
    }

    return NextResponse.json({
      ok: true,
      warning: process.env.LEAD_GOOGLE_SHEET_URL
        ? "Google Sheet destination is recorded, but LEAD_WEBHOOK_URL is still needed to submit leads automatically."
        : "Lead webhook is not configured yet. Add LEAD_WEBHOOK_URL before launch."
    });
  }

  try {
    const webhookResponse = await fetch(process.env.LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      cache: "no-store"
    });

    if (!webhookResponse.ok) {
      const webhookError = await webhookResponse.text().catch(() => "");
      console.error("Lead webhook rejected the submission.", {
        status: webhookResponse.status,
        statusText: webhookResponse.statusText,
        response: webhookError
      });

      return NextResponse.json({ ok: false, message: "Lead webhook rejected the submission." }, { status: 502 });
    }

    let duplicate = false;
    try {
      const webhookBody = (await webhookResponse.json()) as { ok?: boolean; duplicate?: boolean };
      duplicate = webhookBody.duplicate === true;
    } catch {
      // Apps Script may not always return parseable JSON — treat as non-duplicate
    }

    return NextResponse.json({ ok: true, duplicate });
  } catch (error) {
    console.error("Lead webhook could not be reached.", error);
    return NextResponse.json({ ok: false, message: "Lead webhook could not be reached." }, { status: 502 });
  }
}
