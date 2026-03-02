"use client";

interface FigmaLinkBadgeProps {
  href: string;
}

export function FigmaLinkBadge({ href }: FigmaLinkBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-medium text-[#1e293b] hover:border-[#615fff]/40 hover:shadow-md transition-all"
    >
      {/* Figma logo */}
      <svg width="12" height="16" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 28.5a9.5 9.5 0 0 1 9.5-9.5h0A9.5 9.5 0 0 1 38 28.5h0a9.5 9.5 0 0 1-9.5 9.5h0A9.5 9.5 0 0 1 19 28.5z" fill="#1ABCFE"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
      </svg>
      View in Figma
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 9L9 1M9 1H3M9 1V7" stroke="#62748e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}
