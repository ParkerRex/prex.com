import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/footer";

// Data from the research
const tokenData = [
	{ date: "Jun 13", inputTokens: 28690, outputTokens: 193395 },
	{ date: "Jun 14", inputTokens: 246, outputTokens: 9147 },
	{ date: "Jun 16", inputTokens: 9733, outputTokens: 123613 },
	{ date: "Jun 17", inputTokens: 57584, outputTokens: 240648 },
	{ date: "Jun 18", inputTokens: 22292, outputTokens: 309916 },
	{ date: "Jun 19", inputTokens: 37350, outputTokens: 764788 },
];

const efficiencyData = tokenData.map((item) => ({
	date: item.date,
	ratio: item.outputTokens / item.inputTokens,
	optimized: ["Jun 17", "Jun 18", "Jun 19"].includes(item.date),
}));

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
		<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
			<div className="container mx-auto px-4 py-16 max-w-2xl">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold mb-4">
						subagent leverage analysis
					</h1>
					<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
						quantifying input efficiency improvements in human-ai interaction
						through subagent leverage techniques
					</p>
				</div>

				{/* Executive Summary */}
				<div className="mb-12">
					<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						executive summary
					</h2>
					<div className="bg-gray-100 dark:bg-gray-900 p-4">
						<div className="grid grid-cols-3 gap-4 text-center">
							{metrics.map((metric, index) => (
								<div key={index}>
									<div className="text-2xl font-bold mb-1">{metric.value}</div>
									<div className="text-gray-600 dark:text-gray-400 text-xs uppercase">
										{metric.label}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Token Data */}
				<div className="mb-12">
					<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						token distribution
					</h2>
					<div className="space-y-4">
						{tokenData.map((item, index) => (
							<div
								key={index}
								className="bg-gray-100 dark:bg-gray-900 p-4 hover:bg-gray-200 dark:hover:bg-gray-800"
							>
								<div className="flex justify-between items-center mb-2">
									<div className="font-semibold">{item.date}</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">
										ratio: {(item.outputTokens / item.inputTokens).toFixed(1)}x
									</div>
								</div>
								<div className="grid grid-cols-2 gap-4 text-sm">
									<div>
										<span className="text-gray-600 dark:text-gray-400">
											input:{" "}
										</span>
										<span className="font-mono">
											{item.inputTokens.toLocaleString()}
										</span>
									</div>
									<div>
										<span className="text-gray-600 dark:text-gray-400">
											output:{" "}
										</span>
										<span className="font-mono">
											{item.outputTokens.toLocaleString()}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Performance Metrics */}
				<div className="mb-12">
					<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						performance metrics
					</h2>
					<div className="space-y-4">
						{performanceData.map((item, index) => (
							<div
								key={index}
								className="bg-gray-100 dark:bg-gray-900 p-4 hover:bg-gray-200 dark:hover:bg-gray-800"
							>
								<div className="flex justify-between items-center">
									<div>
										<div className="font-semibold">{item.metric}</div>
										<div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
											{item.preOptimization} → {item.postOptimization}
										</div>
									</div>
									<div className="text-right">
										<div className="text-sm font-semibold text-green-600 dark:text-green-400">
											{item.delta}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Key Finding */}
				<div className="mb-12">
					<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						key finding
					</h2>
					<div className="bg-gray-100 dark:bg-gray-900 p-4">
						<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
							the implementation of subagent leverage techniques on june 17,
							2025 resulted in a paradigm shift in human-ai interaction
							efficiency. while absolute input tokens increased marginally
							(+101%), the output generation increased disproportionately
							(+221%), yielding an effective work multiplication factor of{" "}
							<span className="font-mono font-semibold">11.7×</span>.
						</p>
						<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-4">
							this represents a fundamental transition from direct instruction
							to delegated orchestration, where the user provides high-level
							strategic input and the system autonomously generates
							comprehensive outputs through subagent activation.
						</p>
					</div>
				</div>

				{/* Methodology */}
				<div className="mb-12">
					<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						methodology
					</h2>
					<div className="bg-gray-100 dark:bg-gray-900 p-4">
						<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
							data collected from claude api usage logs spanning june 13-19,
							2025. pre-optimization period defined as june 13-16;
							post-optimization period as june 17-19. efficiency index
							calculated as the composite of output/input ratio improvement and
							absolute output increase.
						</p>
					</div>
				</div>

				<Footer />
			</div>
		</div>
	);
}
