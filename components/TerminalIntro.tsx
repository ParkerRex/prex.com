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
		<div className="bg-[#2d2d2d] text-[#f0f0f0] p-6 font-mono text-sm mb-8">
			<div className="flex items-start">
				<span className="text-[#888] select-none mr-2">{">"}</span>
				<span>Hello</span>
			</div>
			<div className="flex items-start">
				<span className="text-[#888] select-none mr-2">{">"}</span>
				<span>My name is Parker</span>
			</div>
			<div className="flex items-start">
				<span className="text-[#888] select-none mr-2">{">"}</span>
				<span>
					Welcome to the Arena!
					<span
						className={`inline-block w-2 h-4 bg-[#f0f0f0] ml-1 ${
							showCursor ? "opacity-100" : "opacity-0"
						}`}
						style={{ verticalAlign: "text-bottom" }}
					/>
				</span>
			</div>
		</div>
	);
}
