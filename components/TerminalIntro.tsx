"use client";

import { useEffect, useState } from "react";

export function TerminalIntro() {
	const [showCursor, setShowCursor] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setShowCursor((prev) => !prev);
		}, 530); // Classic terminal cursor blink rate

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="bg-[#2d2d2d] text-[#f0f0f0] p-6 font-mono text-sm mb-8 overflow-x-auto">
			<div className="space-y-1">
				<div>
					<span className="text-[#888] select-none mr-2">{">"}</span>
					<span className="font-bold text-green-400">SYSTEM_STATUS:</span>{" "}
					ONLINE
				</div>
				<div>
					<span className="text-[#888] select-none mr-2">{">"}</span>
					<span className="font-bold text-blue-400">IDENTITY:</span> Applied AI
					Architect
				</div>
				<div>
					<span className="text-[#888] select-none mr-2">{">"}</span>
					<span className="font-bold text-purple-400">MISSION:</span>{" "}
					Infrastructure for Revenue Teams
				</div>
				<div>
					<span className="text-[#888] select-none mr-2">{">"}</span>
					<span className="font-bold text-yellow-400">CURRENT_FOCUS:</span>{" "}
					Building High-Margin Systems
				</div>

				<div className="h-4" />

				<div className="text-gray-400 font-bold">{"// ENGAGEMENT MODELS"}</div>

				<div className="h-4" />

				<div className="font-bold">1. THE AUDIT ($5,000)</div>
				<div className="pl-4">
					<span className="text-[#888] select-none mr-2">{">"}</span>
					Deep dive into your Data, Auth, and API readiness.
				</div>
				<div className="pl-4">
					<span className="text-[#888] select-none mr-2">{">"}</span>
					Deliverable: 12-Month AI Roadmap.
				</div>

				<div className="h-4" />

				<div className="font-bold">
					2. THE INFRASTRUCTURE BUILD ($30k - $50k)
				</div>
				<div className="pl-4">
					<span className="text-[#888] select-none mr-2">{">"}</span>
					Custom Microservice Architecture.
				</div>
				<div className="pl-4">
					<span className="text-[#888] select-none mr-2">{">"}</span>
					Focus: Sales Logic, Deep Research Agents, RAG Pipelines.
				</div>
				<div className="pl-4">
					<span className="text-[#888] select-none mr-2">{">"}</span>
					Delivery: Full Code Ownership + Documentation.
					<span
						className={`inline-block w-2 h-4 bg-[#f0f0f0] ml-1 ${
							showCursor ? "opacity-100" : "opacity-0"
						}`}
						style={{ verticalAlign: "text-bottom" }}
					/>
				</div>
			</div>
		</div>
	);
}
