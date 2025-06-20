"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxProps {
	children: ReactNode;
	offset?: number;
	className?: string;
}

export function Parallax({ 
	children, 
	offset = 50, 
	className = "" 
}: ParallaxProps) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});

	const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

	return (
		<motion.div
			ref={ref}
			style={{ y }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export function ParallaxText({ 
	children, 
	className = "" 
}: { 
	children: ReactNode; 
	className?: string;
}) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});

	const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

	return (
		<motion.div
			ref={ref}
			style={{ opacity, scale }}
			className={className}
		>
			{children}
		</motion.div>
	);
}