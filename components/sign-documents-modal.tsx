"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SignDocumentsModalProps {
  taskName: string;
  onClose: () => void;
  onComplete: () => void;
}

// ─── Document definitions ─────────────────────────────────────────────────────

const DOCUMENTS = [
  {
    id: "master-agreement",
    title: "Master Agreement",
    subtitle:
      "Business Associate Agreement · AI Usage Attestation · Consulting Agreement",
  },
  {
    id: "sow",
    title: "Statement of Work",
    subtitle: "Scope of work, deliverables, timeline, and compensation",
  },
];

const STEP_LABELS = DOCUMENTS.map((d) => d.title);

// ─── Document content ─────────────────────────────────────────────────────────

function MasterAgreementContent({ date }: { date: string }) {
  return (
    <div className="space-y-7 text-sm leading-relaxed font-[Georgia,serif]">
      <p className="text-slate-600">
        This Master Agreement ("Agreement") is entered into by and between{" "}
        <strong className="text-foreground">Centaur Diagnostics, Inc.</strong>{" "}
        ("Company") and the undersigned specialist ("Contractor"), effective as
        of {date}.
      </p>
      <p className="text-slate-600">
        This Master Agreement consists of the following integrated documents:
      </p>
      <ul className="space-y-1 pl-5 list-disc text-slate-600">
        <li>Business Associate Agreement (BAA)</li>
        <li>AI Usage Attestation</li>
        <li>Consulting Agreement</li>
      </ul>

      {/* Part 1 */}
      <div className="pt-2 border-t border-border/60">
        <h3 className="text-base font-semibold text-foreground mb-3 font-sans">
          Part 1: Business Associate Agreement
        </h3>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-accent-foreground font-sans mb-1">
              1.1 Purpose and Scope
            </p>
            <p className="text-slate-600">
              This Business Associate Agreement ("BAA") is required under HIPAA
              and its implementing regulations. Contractor acknowledges that they
              may have access to Protected Health Information (PHI) in the course
              of performing services for Company.
            </p>
          </div>
          <div>
            <p className="font-semibold text-accent-foreground font-sans mb-1">
              1.2 Obligations of Contractor
            </p>
            <p className="text-slate-600">
              Contractor agrees to not use or disclose PHI other than as
              permitted by this Agreement or as required by law. Contractor shall
              use appropriate safeguards to prevent unauthorized use or
              disclosure of PHI and shall report any breach to Company within 24
              hours of becoming aware of it.
            </p>
          </div>
        </div>
      </div>

      {/* Part 2 */}
      <div className="pt-2 border-t border-border/60">
        <h3 className="text-base font-semibold text-foreground mb-3 font-sans">
          Part 2: AI Usage Attestation
        </h3>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-accent-foreground font-sans mb-1">
              2.1 AI Tool Usage Declaration
            </p>
            <p className="text-slate-600">
              Contractor attests that all final determinations must be made using
              their professional medical judgment. While AI-assisted tools may be
              used for preliminary analysis, they do not replace clinical
              expertise.
            </p>
          </div>
          <div>
            <p className="font-semibold text-accent-foreground font-sans mb-1">
              2.2 Prohibited AI Usage
            </p>
            <p className="text-slate-600">
              Contractor agrees not to use generative AI tools or automated
              decision-making systems as a substitute for their professional
              medical expertise. Any AI tools used must be disclosed to Company
              and approved in advance.
            </p>
          </div>
        </div>
      </div>

      {/* Part 3 */}
      <div className="pt-2 border-t border-border/60">
        <h3 className="text-base font-semibold text-foreground mb-3 font-sans">
          Part 3: Consulting Agreement
        </h3>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-accent-foreground font-sans mb-1">
              3.1 Independent Contractor Status
            </p>
            <p className="text-slate-600">
              Contractor is an independent contractor and not an employee of
              Company. Contractor is responsible for all taxes, insurance, and
              obligations associated with independent contractor status.
            </p>
          </div>
          <div>
            <p className="font-semibold text-accent-foreground font-sans mb-1">
              3.2 Intellectual Property
            </p>
            <p className="text-slate-600">
              All work product, analyses, annotations, and deliverables created
              by Contractor in the course of performing services shall be the
              exclusive property of Company. Contractor hereby assigns all
              rights, title, and interest in such work product to Company.
            </p>
          </div>
          <div>
            <p className="font-semibold text-accent-foreground font-sans mb-1">
              3.3 Confidentiality
            </p>
            <p className="text-slate-600">
              Contractor agrees to maintain strict confidentiality of all
              proprietary information of Company, including patient data, business
              strategies, and technical information.
            </p>
          </div>
        </div>
      </div>

      <p className="pt-2 text-xs text-slate-400 italic border-t border-border/60">
        By signing, Contractor acknowledges they have read, understood, and
        agree to be bound by all three parts of this Agreement.
      </p>
    </div>
  );
}

function SOWContent({ date }: { date: string }) {
  return (
    <div className="space-y-7 text-sm leading-relaxed font-[Georgia,serif]">
      <p className="text-slate-600">
        This Statement of Work ("SOW") is entered into by and between{" "}
        <strong className="text-foreground">Centaur Diagnostics, Inc.</strong>{" "}
        ("Company") and the undersigned specialist ("Contractor"), effective as
        of {date}.
      </p>

      {/* Section 1 */}
      <div className="pt-2 border-t border-border/60">
        <h3 className="text-base font-semibold text-foreground mb-3 font-sans">
          1. Project Overview
        </h3>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-accent-foreground font-sans mb-1">
              1.1 Task Description
            </p>
            <p className="text-slate-600">
              <strong className="text-accent-foreground">Task Name:</strong> Skin Lesion
              Classification
            </p>
            <p className="text-slate-600 mt-2">
              Contractor shall provide professional medical expertise to classify
              and annotate dermatological images for the purpose of training
              machine learning models to assist in early detection of skin cancer.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="pt-2 border-t border-border/60">
        <h3 className="text-base font-semibold text-foreground mb-3 font-sans">
          2. Scope of Work
        </h3>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-accent-foreground font-sans mb-1">
              2.1 Deliverables
            </p>
            <ul className="space-y-1 pl-5 list-disc text-slate-600">
              <li>Classification of dermatological images into predefined categories</li>
              <li>Annotation of regions of interest within images</li>
              <li>Quality assurance review of previously annotated images</li>
              <li>Documentation of clinical observations and diagnostic rationale</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-accent-foreground font-sans mb-1">
              2.2 Timeline
            </p>
            <p className="text-slate-600">
              <strong className="text-accent-foreground">Start Date:</strong> Upon
              execution of this SOW
              <br />
              <strong className="text-accent-foreground">Initial Batch:</strong> 500 images
              <br />
              <strong className="text-accent-foreground">Expected Completion:</strong>{" "}
              Within 30 days of start date
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="pt-2 border-t border-border/60">
        <h3 className="text-base font-semibold text-foreground mb-3 font-sans">
          3. Compensation
        </h3>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-accent-foreground font-sans mb-1">
              3.1 Payment Terms
            </p>
            <p className="text-slate-600">
              <strong className="text-accent-foreground">Rate:</strong> $2.50 per image classification
              <br />
              <strong className="text-accent-foreground">Estimated Total:</strong>{" "}
              $1,250.00 (based on initial batch of 500 images)
              <br />
              <strong className="text-accent-foreground">Payment Schedule:</strong> Net 30 days
              upon completion and approval of deliverables
            </p>
          </div>
          <div>
            <p className="font-semibold text-accent-foreground font-sans mb-1">
              3.2 Quality Standards
            </p>
            <p className="text-slate-600">
              All deliverables must meet Company's quality standards, including
              minimum inter-rater reliability scores. Company reserves the right
              to reject work that does not meet these standards.
            </p>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="pt-2 border-t border-border/60">
        <h3 className="text-base font-semibold text-foreground mb-3 font-sans">
          4. Additional Terms
        </h3>
        <p className="text-slate-600">
          This SOW is governed by the Master Agreement between Company and
          Contractor. In the event of any conflict, the Master Agreement shall
          control.
        </p>
      </div>

      <p className="pt-2 text-xs text-slate-400 italic border-t border-border/60">
        Page 1 of 1 · Centaur.ai Specialist Portal · {date}
      </p>
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────

export function SignDocumentsModal({
  taskName,
  onClose,
  onComplete,
}: SignDocumentsModalProps) {
  const [step, setStep] = useState(0);
  const [agreed, setAgreed] = useState<Set<string>>(new Set());
  const [scrolledToBottom, setScrolledToBottom] = useState<Set<number>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const currentDoc = DOCUMENTS[step];
  const hasScrolled = scrolledToBottom.has(step);
  const canAdvance = agreed.has(currentDoc.id);

  const scrollToTop = () => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  // Auto-mark step as scrolled if content fits without scrolling
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      if (el.scrollHeight <= el.clientHeight + 32) {
        setScrolledToBottom((prev) => new Set([...prev, step]));
      }
    });
    return () => cancelAnimationFrame(id);
  }, [step]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 32) {
      setScrolledToBottom((prev) => new Set([...prev, step]));
    }
  }, [step]);

  const handleNext = () => {
    if (!canAdvance) return;
    if (step === DOCUMENTS.length - 1) {
      onComplete();
      return;
    }
    scrollToTop();
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    scrollToTop();
    setStep((s) => s - 1);
  };

  const toggleAgreed = (id: string) => {
    setAgreed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6 animate-fade-in">
      <div className="w-full max-w-3xl h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">

        {/* ── Header ── */}
        <div className="px-8 py-6 border-b border-border flex-shrink-0 relative">
          {/* Close button — absolute top-right */}
          <button
            onClick={onClose}
            className="absolute top-5 right-6 p-1.5 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={18} className="text-muted-foreground" />
          </button>

          {/* Row 1: title + task name — left aligned */}
          <div className="mb-3">
            <h2 className="text-xl font-bold text-foreground">Sign Documents</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {taskName}
            </p>
          </div>

          {/* Row 2: step indicator — centered */}
          <div className="flex items-start justify-center">
            {STEP_LABELS.map((label, i) => (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center gap-1 min-w-0">
                  {/* Circle */}
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors",
                      i < step
                        ? "bg-indigo-50 text-indigo-600"
                        : i === step
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    )}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  {/* Label */}
                  <span
                    className={cn(
                      "text-[10px] font-medium text-center whitespace-nowrap leading-tight",
                      i < step
                        ? "text-indigo-600"
                        : i === step
                          ? "text-foreground"
                          : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                </div>
                {/* Connector */}
                {i < STEP_LABELS.length - 1 && (
                  <div
                    className={cn(
                      "w-16 h-px mt-3 mx-2",
                      i < step ? "bg-indigo-200" : "bg-border"
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto bg-muted min-h-0"
        >
          <div className="px-12 py-8">
            <div className="bg-white rounded-[10px] shadow-sm border border-border overflow-hidden">
              {/* Document header */}
              <div className="px-8 py-6 border-b border-border">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                  Document {step + 1} of {DOCUMENTS.length}
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {currentDoc.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {currentDoc.subtitle}
                </p>
              </div>

              {/* Document body */}
              <div className="px-8 py-8">
                {currentDoc.id === "master-agreement" ? (
                  <MasterAgreementContent date={date} />
                ) : (
                  <SOWContent date={date} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="border-t border-border bg-white px-8 py-6 flex-shrink-0">
          <div className="flex items-start justify-between gap-6">
            {/* Left: checkbox + label + scroll hint */}
            <label
              className={cn(
                "flex items-start gap-2.5 flex-1 select-none",
                hasScrolled ? "cursor-pointer" : "cursor-not-allowed"
              )}
            >
              <input
                type="checkbox"
                id={`agree-${currentDoc.id}`}
                checked={agreed.has(currentDoc.id)}
                onChange={() => hasScrolled && toggleAgreed(currentDoc.id)}
                disabled={!hasScrolled}
                className="w-4 h-4 rounded mt-0.5 flex-shrink-0 disabled:cursor-not-allowed"
                style={{ accentColor: "var(--primary)" }}
              />
              <div className="space-y-1.5">
                <span className={cn("text-sm text-foreground", !hasScrolled && "opacity-50")}>
                  I have read and agree to this document
                </span>
                {!hasScrolled && (
                  <p className="text-xs text-muted-foreground">
                    Scroll to read the full document to continue
                  </p>
                )}
              </div>
            </label>

            {/* Right: Back + CTA */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                className={cn(step === 0 && "invisible")}
              >
                Back
              </Button>
              <Button
                size="sm"
                disabled={!canAdvance}
                onClick={handleNext}
                className={cn(canAdvance && "btn-shadow")}
              >
                {step === DOCUMENTS.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
