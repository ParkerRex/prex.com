"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedGradientProps {
	children: ReactNode;
	className?: string;
}

export function AnimatedGradient({ children, className = "" }: AnimatedGradientProps) {
	return (
		<div className={`relative ${className}`}>
			<motion.div
				className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10 blur-xl"
				animate={{
					backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
				}}
				transition={{
					duration: 10,
					ease: "linear",
					repeat: Infinity,
				}}
				style={{
					backgroundSize: "200% 200%",
				}}
			/>
			<div className="relative">{children}</div>
		</div>
	);
}

export function ShimmerText({ 
	children, 
	className = "" 
}: { 
	children: ReactNode; 
	className?: string;
}) {
	return (
		<span className={`relative inline-block ${className}`}>
			{children}
		</span>
	);
}

export function GradientBorder({ 
	children, 
	className = "" 
}: { 
	children: ReactNode; 
	className?: string;
}) {
	return (
		<div className={`relative p-[1px] ${className}`}>
			<motion.div
				className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
				animate={{
					backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
				}}
				transition={{
					duration: 5,
					ease: "linear",
					repeat: Infinity,
				}}
				style={{
					backgroundSize: "200% 200%",
				}}
			/>
			<div className="relative bg-white dark:bg-black rounded-lg">
				{children}
			</div>
		</div>
	);
}