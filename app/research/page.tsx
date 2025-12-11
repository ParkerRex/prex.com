import type { Metadata } from "next";

import Footer from "@/components/Footer";

// Data from the research
const tokenData = [
	{ date: "Jun 13", inputTokens: 28690, outputTokens: 193395 },
	{ date: "Jun 14", inputTokens: 246, outputTokens: 9147 },
	{ date: "Jun 16", inputTokens: 9733, outputTokens: 123613 },
	{ date: "Jun 17", inputTokens: 57584, outputTokens: 240648 },
	{ date: "Jun 18", inputTokens: 22292, outputTokens: 309916 },
	{ date: "Jun 19", inputTokens: 37350, outputTokens: 764788 },
];

const metrics = [
	{ value: "73%", label: "Input Reduction" },
	{ value: "215%", label: "Output Increase" },
	{ value: "11.7×", label: "Efficiency Gain" },
];

const performanceData = [
	{
		metric: "Mean Input Tokens",
		preOptimization: "19,419",
		postOptimization: "39,075",
		delta: "+101.2%",
	},
	{
		metric: "Mean Output Tokens",
		preOptimization: "136,446",
		postOptimization: "438,450",
		delta: "+221.3%",
	},
	{
		metric: "Output/Input Ratio",
		preOptimization: "7.0",
		postOptimization: "11.2",
		delta: "+60.0%",
	},
	{
		metric: "Efficiency Index",
		preOptimization: "1.0",
		postOptimization: "11.7",
		delta: "+1070%",
	},
];

// Need to remove "use client" for metadata export
export const metadata: Metadata = {
	title: "Research: Subagent Leverage Analysis",
	description:
		"Quantifying input efficiency improvements in human-AI interaction through subagent leverage techniques",
	openGraph: {
		title: "Research: Subagent Leverage Analysis",
		description:
			"Quantifying input efficiency improvements in human-AI interaction",
		type: "article",
		authors: ["Parker Rex"],
	},
};

export default function ResearchPage() {
	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col font-mono text-sm">
			<div className="container mx-auto px-4 py-16 max-w-2xl flex-1 flex flex-col">
				{/* Header */}
				<div className="text-left mb-12 border-b border-border pb-8">
					<h1 className="text-xl font-bold mb-6 uppercase tracking-widest border-l-4 border-signal pl-4">
						Subagent Leverage Analysis
					</h1>
					<p className="text-muted-foreground text-sm uppercase tracking-wider pl-5">
						Quantifying input efficiency improvements in human-ai interaction
					</p>
				</div>

				{/* Executive Summary */}
				<div className="mb-12">
					<h2 className="text-muted-foreground text-[10px] uppercase tracking-widest mb-4 border-b border-border pb-1">
						// Executive Summary
					</h2>
					<div className="border border-border p-6 bg-background">
						<div className="grid grid-cols-3 gap-4 text-center">
							{metrics.map((metric) => (
								<div key={metric.label}>
									<div className="text-2xl lg:text-3xl font-bold mb-2 text-signal">
										{metric.value}
									</div>
									<div className="text-muted-foreground text-[10px] uppercase tracking-widest">
										{metric.label}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Key Finding - Moved up for impact */}
				<div className="mb-12">
					<div className="border-l-4 border-signal pl-6 py-2 bg-secondary/30">
						<p className="text-sm leading-relaxed italic">
							"The implementation of subagent leverage techniques resulted in an
							effective work multiplication factor of{" "}
							<span className="font-bold text-foreground not-italic bg-signal/10 px-1">
								11.7×
							</span>
							."
						</p>
					</div>
				</div>

				{/* Token Data */}
				<div className="mb-12">
					<h2 className="text-muted-foreground text-[10px] uppercase tracking-widest mb-4 border-b border-border pb-1">
						// Token Distribution
					</h2>
					<div className="border-t border-border">
						{tokenData.map((item) => (
							<div
								key={item.date}
								className="border-b border-border py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-secondary/50 transition-colors px-2"
							>
								<div className="font-bold text-xs w-24 text-muted-foreground uppercase">
									{item.date}
								</div>

								<div className="flex-1 grid grid-cols-2 gap-4 text-xs">
									<div>
										<span className="text-muted-foreground mr-2">In:</span>
										<span className="font-mono">
											{item.inputTokens.toLocaleString()}
										</span>
									</div>
									<div>
										<span className="text-muted-foreground mr-2">Out:</span>
										<span className="font-mono">
											{item.outputTokens.toLocaleString()}
										</span>
									</div>
								</div>

								<div className="text-xs font-bold text-right w-24">
									<span className="text-signal">
										{(item.outputTokens / item.inputTokens).toFixed(1)}x
									</span>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Performance Metrics */}
				<div className="mb-12">
					<h2 className="text-muted-foreground text-[10px] uppercase tracking-widest mb-4 border-b border-border pb-1">
						// Performance Metrics
					</h2>
					<div className="border border-border">
						<table className="w-full text-xs text-left">
							<thead className="bg-secondary text-muted-foreground uppercase tracking-wider font-medium border-b border-border">
								<tr>
									<th className="px-4 py-3">Metric</th>
									<th className="px-4 py-3">Pre</th>
									<th className="px-4 py-3">Post</th>
									<th className="px-4 py-3 text-right">Delta</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border">
								{performanceData.map((item) => (
									<tr key={item.metric} className="hover:bg-secondary/30">
										<td className="px-4 py-3 font-medium">{item.metric}</td>
										<td className="px-4 py-3 text-muted-foreground">
											{item.preOptimization}
										</td>
										<td className="px-4 py-3 text-muted-foreground">
											{item.postOptimization}
										</td>
										<td className="px-4 py-3 text-right font-bold text-signal">
											{item.delta}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Methodology */}
				<div className="mb-12 opacity-80">
					<h2 className="text-muted-foreground text-[10px] uppercase tracking-widest mb-4 border-b border-border pb-1">
						// Methodology
					</h2>
					<p className="text-xs text-muted-foreground leading-relaxed">
						Data collected from Claude API usage logs spanning June 13-19, 2025.
						Pre-optimization period: June 13-16. Post-optimization period: June
						17-19. Efficiency index calculated as the composite of output/input
						ratio improvement and absolute output increase.
					</p>
				</div>

				<Footer currentPage="research" />
			</div>
		</div>
	);
}
