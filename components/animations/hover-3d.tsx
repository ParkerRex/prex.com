"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

interface Hover3DProps {
	children: ReactNode;
	className?: string;
	depth?: number;
}

export function Hover3D({ 
	children, 
	className = "", 
	depth = 20 
}: Hover3DProps) {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const rotateX = useMotionTemplate`${mouseY}deg`;
	const rotateY = useMotionTemplate`${mouseX}deg`;

	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		
		const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -depth;
		const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * depth;

		mouseX.set(rotateYValue);
		mouseY.set(rotateXValue);
	};

	const handleMouseLeave = () => {
		mouseX.set(0);
		mouseY.set(0);
	};

	return (
		<motion.div
			className={`${className}`}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				transformStyle: "preserve-3d",
				rotateX,
				rotateY,
			}}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
		>
			<div style={{ transform: "translateZ(50px)" }}>
				{children}
			</div>
		</motion.div>
	);
}

interface HoverTiltProps {
	children: ReactNode;
	className?: string;
}

export function HoverTilt({ children, className = "" }: HoverTiltProps) {
	return (
		<motion.div
			className={className}
			whileHover={{
				scale: 1.02,
				rotateX: -5,
				rotateY: 5,
			}}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 20,
			}}
			style={{
				transformStyle: "preserve-3d",
				transformPerspective: 1000,
			}}
		>
			{children}
		</motion.div>
	);
}

interface HoverLiftProps {
	children: ReactNode;
	className?: string;
	lift?: number;
}

export function HoverLift({ 
	children, 
	className = "", 
	lift = -10 
}: HoverLiftProps) {
	return (
		<motion.div
			className={`transition-shadow ${className}`}
			whileHover={{
				y: lift,
				boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
			}}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 20,
			}}
		>
			{children}
		</motion.div>
	);
}