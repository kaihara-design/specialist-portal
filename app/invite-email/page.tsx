import Link from "next/link";

export default function InviteEmailMockup() {
  return (
    <main className="min-h-screen bg-[#f3f4f6] flex items-center justify-center px-4 py-12">
      {/* Email client outer wrapper */}
      <div className="w-full max-w-[560px]">
        {/* Email card */}
        <div className="bg-white border border-[#e5e7eb] rounded-[4px] overflow-hidden">
          {/* Header with logo */}
          <div className="bg-white px-10 pt-10 pb-8 text-center border-b border-[#f3f4f6]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/centaur-logo.svg"
              alt="Centaur"
              className="h-9 w-auto mx-auto"
            />
          </div>

          {/* Body */}
          <div className="px-10 py-8 space-y-6">
            <h1 className="text-[22px] font-bold text-[#111827] text-center leading-snug">
              You&apos;re invited!
            </h1>

            <p className="text-[15px] text-[#374151] leading-relaxed">
              Click the link below and follow the steps to create your Centaur account.
              If you already have an account, sign in and you&apos;ll be automatically added
              to the Centaur specialist network. Please only act if you trust Centaur.
            </p>

            {/* CTA */}
            <div className="text-center py-2">
              <Link
                href="/invite?invite=preview&role=specialist&email=demo@centaur.ai"
                className="inline-block px-8 py-3 rounded-[6px] bg-[#4f46e5] text-white text-[15px] font-semibold hover:bg-[#4338ca] transition-colors"
              >
                Claim Invite
              </Link>
            </div>

            <p className="text-[13px] text-[#6b7280] leading-relaxed">
              This link will expire in 24 hours. Please{" "}
              <a href="mailto:support@centaurlabs.com" className="text-[#4f46e5] underline">
                contact us
              </a>{" "}
              if you have any questions.
            </p>

            <p className="text-[14px] text-[#374151]">
              Your friendly Centaur team,
              <br />
              <span className="font-semibold">— Centaur Labs</span>
            </p>
          </div>

          {/* Footer */}
          <div className="bg-[#f9fafb] border-t border-[#e5e7eb] px-10 py-6 text-center space-y-2">
            <p className="text-[12px] text-[#9ca3af]">
              © 2026 Centaur Labs · 883 Boylston St, Suite 200, Boston MA 02116
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
