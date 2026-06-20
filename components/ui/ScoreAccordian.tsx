"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useResumeStore } from "@/store/resume-store";
import {
    CheckCircle2,
    AlertTriangle,
    Plus,
    Lightbulb,
    Sparkles,
    ChevronDown,
} from "lucide-react";


interface AtsIssue {
    problem: string;
    fix: string;
    section: string;
    severity: string;
}

function toAtsIssueArray(value: unknown): AtsIssue[] {
    if (!Array.isArray(value)) return [];
    return value.filter(
        (v): v is AtsIssue =>
            !!v && typeof v === "object" && "problem" in v && "fix" in v
    );
}

function getSeverityTone(severity: string) {
    const normalized = severity.toLowerCase();
    if (normalized === "high") {
        return {
            chipBg: "bg-rose-100",
            chipText: "text-rose-700",
            cardBorder: "border-rose-200",
            cardBg: "bg-rose-50/60",
        };
    }
    if (normalized === "medium") {
        return {
            chipBg: "bg-amber-100",
            chipText: "text-amber-700",
            cardBorder: "border-amber-200",
            cardBg: "bg-amber-50/60",
        };
    }
    return {
        chipBg: "bg-slate-100",
        chipText: "text-slate-600",
        cardBorder: "border-slate-200",
        cardBg: "bg-slate-50",
    };
}

function toStringArray(value: unknown): string[] {
    if (!Array.isArray(value)) return [];
    return value.filter((v): v is string => typeof v === "string");
}

function CountBadge({ count }: { count: number }) {
    if (count === 0) return null;
    return (
        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-100 px-1.5 text-xs font-medium text-slate-500">
            {count}
        </span>
    );
}

function AccordionItem({
    icon,
    title,
    count,
    isOpen,
    onToggle,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    count: number;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="border-b border-slate-100 last:border-b-0">
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-5 sm:py-4"
            >
                <span className="flex items-center gap-2 min-w-0">
                    {icon}
                    <span className="truncate text-sm font-medium text-slate-800">{title}</span>
                    <CountBadge count={count} />
                </span>
                <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {isOpen && <div className="px-4 pb-4 sm:px-5 sm:pb-5">{children}</div>}
        </div>
    );
}

function EmptyState({ message }: { message: string }) {
    return <p className="text-sm text-slate-400">{message}</p>;
}

export default function ScoreAccordian() {
    const { id } = useParams<{ id: string }>();
    const resumes = useResumeStore((state) => state.resumes);
    const findResume = resumes.find((r) => r.id === id);

    const [openSections, setOpenSections] = useState<Set<string>>(new Set());

    const toggleSection = (key: string) => {
        setOpenSections((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    if (!findResume) {
        return (
            <div className="rounded-2xl border border-slate-200 p-6 text-sm text-slate-500">
                No resume analysis found.
            </div>
        );
    }

    const issues = toAtsIssueArray(findResume.atsIssues);
    const missingKeywords = toStringArray(findResume.missingKeywords);
    const matchingStrengths = toStringArray(findResume.matchingStrengths);
    const feedback = toStringArray(findResume.feedback);
    const jobFitSummary =
        typeof findResume.jobFitSummary === "string" ? findResume.jobFitSummary : null;

    return (
        <div className="space-y-4 mt-12 p-6 shadow rounded-2xl">


            {/* Collapsible detail sections */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {jobFitSummary && (
                    <AccordionItem
                        icon={<Sparkles className="h-4 w-4 shrink-0 text-indigo-500" />}
                        title="Job Fit Insight"
                        count={0}
                        isOpen={openSections.has("jobFit")}
                        onToggle={() => toggleSection("jobFit")}
                    >
                        <p className="text-sm leading-relaxed text-slate-600">{jobFitSummary}</p>
                    </AccordionItem>
                )}

                <AccordionItem
                    icon={<AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />}
                    title="Issues to Fix"
                    count={issues.length}
                    isOpen={openSections.has("issues")}
                    onToggle={() => toggleSection("issues")}
                >
                    {issues.length === 0 ? (
                        <EmptyState message="No major issues detected." />
                    ) : (
                        <ul className="space-y-3">
                            {issues.map((issue, i) => {
                                const tone = getSeverityTone(issue.severity);
                                return (
                                    <li
                                        key={i}
                                        className={`rounded-xl border p-3 ${tone.cardBorder} ${tone.cardBg}`}
                                    >
                                        <div className="mb-1 flex flex-wrap items-center gap-2">
                                            <span
                                                className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium capitalize sm:text-xs ${tone.chipBg} ${tone.chipText}`}
                                            >
                                                {issue.severity}
                                            </span>
                                            <span className="text-xs text-slate-400">{issue.section}</span>
                                        </div>
                                        <p className="text-sm font-medium text-slate-800">{issue.problem}</p>
                                        <p className="mt-1 text-sm text-slate-600">
                                            <span className="font-medium text-slate-500">Fix: </span>
                                            {issue.fix}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </AccordionItem>

                <AccordionItem
                    icon={<CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />}
                    title="What's Working"
                    count={matchingStrengths.length}
                    isOpen={openSections.has("strengths")}
                    onToggle={() => toggleSection("strengths")}
                >
                    {matchingStrengths.length === 0 ? (
                        <EmptyState message="No standout strengths flagged yet." />
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {matchingStrengths.map((s, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700"
                                >
                                    <CheckCircle2 className="h-3 w-3" />
                                    {s}
                                </span>
                            ))}
                        </div>
                    )}
                </AccordionItem>

                <AccordionItem
                    icon={<Plus className="h-4 w-4 shrink-0 text-rose-500" />}
                    title="Keywords to Add"
                    count={missingKeywords.length}
                    isOpen={openSections.has("keywords")}
                    onToggle={() => toggleSection("keywords")}
                >
                    {missingKeywords.length === 0 ? (
                        <EmptyState message="No missing keywords detected." />
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {missingKeywords.map((k, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1 rounded-full border border-rose-300 bg-rose-50 px-2.5 py-1 text-xs text-rose-700"
                                >
                                    <Plus className="h-3 w-3" />
                                    {k}
                                </span>
                            ))}
                        </div>
                    )}
                </AccordionItem>

                <AccordionItem
                    icon={<Lightbulb className="h-4 w-4 shrink-0 text-indigo-500" />}
                    title="Quick Wins"
                    count={feedback.length}
                    isOpen={openSections.has("feedback")}
                    onToggle={() => toggleSection("feedback")}
                >
                    {feedback.length === 0 ? (
                        <EmptyState message="No suggestions available." />
                    ) : (
                        <ul className="space-y-2">
                            {feedback.map((tip, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </AccordionItem>
            </div>
        </div>
    );
}