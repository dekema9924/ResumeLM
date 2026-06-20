import { useResumeStore } from "@/store/resume-store";
import { useEffect, useRef, useId } from "react";
import { useParams } from "next/navigation";

interface ScoreItem {
    label: string;
    badge: string;
    score: number;
}

const badgeColorMap: Record<string, string> = {
    Strong: "#2563eb",
    "Good Start": "#16a34a",
    "Needs work": "#dc2626",
};

function getBadgeColor(badge: string) {
    return badgeColorMap[badge] ?? "#9ca3af";
}

export default function ScoreCard() {
    const arcRef = useRef<SVGCircleElement>(null);
    const uid = useId();
    const gradId = `arcGrad-${uid.replace(/:/g, "")}`;

    const resumes = useResumeStore((state) => state.resumes);
    const { id } = useParams();
    const findResume = resumes.find((r) => r.id === id);

    const total = 100;
    const score = findResume?.atsScore;
    const issues = findResume?.atsIssueCount;
    const items = (findResume?.items as ScoreItem[] | undefined) ?? [];

    useEffect(() => {
        if (score == null) return;

        const r = 64;
        const circ = 2 * Math.PI * r;
        const arcLen = (200 / 360) * circ;
        const filled = (score / total) * arcLen;
        if (arcRef.current) {
            arcRef.current.style.strokeDasharray = `${filled} ${circ}`;
        }
    }, [score, total]);

    if (!findResume) {
        return (
            <section className="shadow-2xl shadow-red-100 border border-gray-100 rounded-lg p-4">
                <p className="text-sm text-gray-400">Analyzing resume...</p>
            </section>
        );
    }

    return (
        <section className="shadow-2xl shadow-red-100 border border-gray-100 rounded-lg p-4">
            <div className="flex items-center">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <svg width={160} height={95} viewBox="0 0 160 95">
                        <defs>
                            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f9a8c9" />
                                <stop offset="100%" stopColor="#c4b5fd" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx={80} cy={80} r={64}
                            fill="none" stroke="#e5e7eb" strokeWidth={7}
                            strokeDasharray="179 224"
                            strokeLinecap="round"
                            transform="rotate(160 80 80)"
                        />
                        <circle
                            ref={arcRef}
                            cx={80} cy={80} r={64}
                            fill="none" stroke={`url(#${gradId})`} strokeWidth={7}
                            strokeDasharray="0 402"
                            strokeLinecap="round"
                            transform="rotate(160 80 80)"
                        />
                        <text x={80} y={72} textAnchor="middle" fontSize={22} fontWeight={500} fill="currentColor">
                            {score ?? "--"}
                            <tspan fontSize={14} fill="#9ca3af">/{total}</tspan>
                        </text>
                    </svg>
                    <span style={{ fontSize: 12, color: "#9ca3af", marginTop: -4 }}>{issues ?? 0} issues</span>
                </div>
                <div>
                    <h2 className="font-semibold text-lg">Your resume score</h2>
                    <span className="text-[#475467]">This score is calculated based on the variables listed below</span>
                </div>
            </div>

            <div className="mt-4 divide-y divide-gray-100">
                {items.map((item) => (
                    <div key={item.label} className="flex bg-gray-100 rounded-lg px-3 my-1 h-14 items-center justify-between py-3">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{item.label}</span>
                            <span
                                className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={{
                                    color: getBadgeColor(item.badge),
                                    backgroundColor: `${getBadgeColor(item.badge)}18`,
                                }}
                            >
                                {item.badge}
                            </span>
                        </div>
                        <div className="text-sm font-medium">
                            <span style={{ color: item.score >= 60 ? "#ca8a04" : "#dc2626" }}>
                                {item.score}
                            </span>
                            <span className="text-gray-400">/100</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}