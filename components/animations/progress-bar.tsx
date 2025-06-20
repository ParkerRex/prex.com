"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedProgressBarProps {
	progress: number;
	className?: string;
	delay?: number;
}

export function AnimatedProgressBar({ 
	progress, 
	className = "", 
	delay = 0 
}: AnimatedProgressBarProps) {
	const [animatedProgress, setAnimatedProgress] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			setAnimatedProgress(progress);
		}, delay * 1000);

		return () => clearTimeout(timer);
	}, [progress, delay]);

	return (
		<div className={`w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 overflow-hidden ${className}`}>
			<motion.div
				className="bg-orange-500 h-2 rounded-full relative"
				initial={{ width: "0%" }}
				animate={{ width: `${animatedProgress}%` }}
				transition={{ 
					duration: 1.5, 
					ease: [0.25, 0.1, 0.25, 1],
					delay: delay
				}}
			>
				<motion.div
					className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
					animate={{ x: ["-100%", "200%"] }}
					transition={{
						duration: 2,
						ease: "linear",
						repeat: Infinity,
						repeatDelay: 3
					}}
				/>
			</motion.div>
		</div>
	);
}