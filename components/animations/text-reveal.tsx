"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TextRevealProps {
	children: ReactNode;
	delay?: number;
	duration?: number;
	className?: string;
}

export function TextReveal({ 
	children, 
	delay = 0, 
	duration = 0.6, 
	className = "" 
}: TextRevealProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ 
				duration, 
				delay, 
				ease: [0.25, 0.1, 0.25, 1] 
			}}
			viewport={{ once: true, margin: "-50px" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

interface AnimatedTextProps {
	text: string;
	className?: string;
	staggerDelay?: number;
}

export function AnimatedText({ 
	text, 
	className = "", 
	staggerDelay = 0.02 
}: AnimatedTextProps) {
	const words = text.split(" ");
	
	return (
		<motion.div className={className}>
			{words.map((word, i) => (
				<motion.span
					key={i}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.5,
						delay: i * staggerDelay,
						ease: [0.25, 0.1, 0.25, 1]
					}}
					viewport={{ once: true, margin: "-50px" }}
					className="inline-block mr-1"
				>
					{word}
				</motion.span>
			))}
		</motion.div>
	);
}