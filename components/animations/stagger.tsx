"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerContainerProps {
	children: ReactNode;
	staggerDelay?: number;
	className?: string;
}

export function StaggerContainer({ 
	children, 
	staggerDelay = 0.1, 
	className = "" 
}: StaggerContainerProps) {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: staggerDelay,
				delayChildren: 0.1
			}
		}
	};

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-50px" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

interface StaggerItemProps {
	children: ReactNode;
	className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: [0.25, 0.1, 0.25, 1]
			}
		}
	};

	return (
		<motion.div
			variants={itemVariants}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export function HoverScale({ 
	children, 
	scale = 1.02, 
	className = "" 
}: {
	children: ReactNode;
	scale?: number;
	className?: string;
}) {
	return (
		<motion.div
			whileHover={{ scale }}
			whileTap={{ scale: scale * 0.95 }}
			transition={{ type: "spring", stiffness: 300, damping: 20 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}