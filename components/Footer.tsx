import Link from "next/link";
import { CookiePreferencesLink } from "@/components/CookiePreferencesLink";

const groups = [
  { title: "Agency", links: [["Performance marketing", "/services/performance-marketing-lead-generation"], ["Social media marketing", "/services/social-media-marketing"], ["Growth audit", "/free-growth-audit"]] },
  { title: "Learn", links: [["Learning Hub", "/blog"], ["Resources", "/resources"], ["Courses", "/courses"], ["Survival Kit", "/performance-marketing-survival-kit"]] },
  { title: "Company", links: [["Privacy policy", "/privacy-policy"], ["Contact", "/free-growth-audit"]] }
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-10 md:grid-cols-[1.3fr_2fr] md:px-8 md:py-12">
        <div className="max-w-sm">
          <p className="text-xl font-black">Technocrats Digimate</p>
          <p className="mt-4 text-sm leading-6 text-slate-300">Connected performance marketing systems for Indian businesses that need qualified sales conversations—not disconnected campaign reports.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-xs font-black uppercase tracking-[0.16em] text-white">{group.title}</h2>
              <ul className="mt-3 space-y-2">
                {group.links.map(([label, href]) => (
                  <li key={label}><Link className="inline-flex min-h-11 items-center text-sm text-slate-300 hover:text-white" href={href}>{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-5 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Technocrats Digimate Pvt Ltd.</p>
          <CookiePreferencesLink />
        </div>
      </div>
    </footer>
  );
}
