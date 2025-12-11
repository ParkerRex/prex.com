"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface BlurInProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	duration?: number;
}

export function BlurIn({
	children,
	className = "",
	delay = 0,
	duration = 0.8,
}: BlurInProps) {
	return (
		<motion.div
			initial={{
				opacity: 0,
				filter: "blur(10px)",
				scale: 0.95,
			}}
			whileInView={{
				opacity: 1,
				filter: "blur(0px)",
				scale: 1,
			}}
			transition={{
				duration,
				delay,
				ease: [0.25, 0.1, 0.25, 1],
			}}
			viewport={{ once: true, margin: "-50px" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

interface BlurFadeProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	duration?: number;
	yOffset?: number;
}

export function BlurFade({
	children,
	className = "",
	delay = 0,
	duration = 0.6,
	yOffset = 20,
}: BlurFadeProps) {
	return (
		<motion.div
			initial={{
				opacity: 0,
				filter: "blur(4px)",
				y: yOffset,
			}}
			animate={{
				opacity: 1,
				filter: "blur(0px)",
				y: 0,
			}}
			transition={{
				duration,
				delay,
				ease: "easeOut",
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}
