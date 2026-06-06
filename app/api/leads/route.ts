import { NextResponse } from "next/server";

// ─── GET: health / method-check ───────────────────────────────────────────────
// Browsers and uptime monitors hit this URL via GET.
// Return 405 so Hostinger's reverse proxy gets a valid HTTP response (not 503).
export async function GET() {
  return NextResponse.json(
    { ok: false, message: "Use POST to submit leads." },
    { status: 405 }
  );
}

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
  } catch (parseError) {
    console.error("[/api/leads] Failed to parse request JSON.", parseError);
    return NextResponse.json({ ok: false, message: "Invalid request payload." }, { status: 400 });
  }

  if (!isValidLeadRequest(body)) {
    console.error("[/api/leads] Invalid lead payload — missing required fields.", {
      hasNiche: Boolean(body.niche),
      hasPage: Boolean(body.page),
      hasAnswers: Boolean(body.answers),
    });
    return NextResponse.json({ ok: false, message: "Missing required lead fields." }, { status: 400 });
  }

  const payload = buildLeadPayload(body);

  if (!process.env.LEAD_WEBHOOK_URL) {
    console.error(
      "[/api/leads] LEAD_WEBHOOK_URL is not set. " +
      "Add it to your environment variables (Hostinger → Node.js → Environment Variables)."
    );
    return NextResponse.json(
      { ok: false, error: "LEAD_WEBHOOK_URL missing", message: "Lead webhook is not configured. Contact the site admin." },
      { status: 500 }
    );
  }

  try {
    // 10-second timeout — prevents the serverless function from hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10_000);

    let webhookResponse: Response;
    try {
      webhookResponse = await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!webhookResponse.ok) {
      const webhookError = await webhookResponse.text().catch(() => "");
      console.error("[/api/leads] Webhook rejected the submission.", {
        status: webhookResponse.status,
        statusText: webhookResponse.statusText,
        response: webhookError,
        niche: body.niche,
        page: body.page,
      });
      return NextResponse.json(
        { ok: false, message: `Lead webhook returned ${webhookResponse.status}. Please try again or contact us on WhatsApp.` },
        { status: 502 }
      );
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
    const isTimeout = error instanceof Error && error.name === "AbortError";
    if (isTimeout) {
      console.error("[/api/leads] Webhook timed out after 10s.", { niche: body.niche, page: body.page });
      return NextResponse.json(
        { ok: false, message: "The server took too long to respond. Please try again." },
        { status: 504 }
      );
    }
    console.error("[/api/leads] Unexpected error reaching webhook.", error);
    return NextResponse.json(
      { ok: false, message: "Could not reach the lead server. Please try again or contact us on WhatsApp." },
      { status: 502 }
    );
  }
}
