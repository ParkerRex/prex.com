"use client";

import { motion } from "framer-motion";

interface LoadingDotsProps {
	size?: "sm" | "md" | "lg";
	className?: string;
}

export function LoadingDots({ size = "md", className = "" }: LoadingDotsProps) {
	const sizeClasses = {
		sm: "w-1 h-1",
		md: "w-2 h-2",
		lg: "w-3 h-3"
	};

	const dotVariants = {
		initial: { y: 0 },
		animate: { y: -10 }
	};

	const containerVariants = {
		initial: {},
		animate: {
			transition: {
				staggerChildren: 0.2,
				repeat: Infinity,
				repeatType: "reverse" as const,
				duration: 0.6
			}
		}
	};

	return (
		<motion.div 
			className={`flex space-x-1 ${className}`}
			variants={containerVariants}
			initial="initial"
			animate="animate"
		>
			{[0, 1, 2].map((i) => (
				<motion.div
					key={i}
					className={`${sizeClasses[size]} bg-current rounded-full`}
					variants={dotVariants}
				/>
			))}
		</motion.div>
	);
}

export function LoadingSpinner({ className = "" }: { className?: string }) {
	return (
		<motion.div
			className={`w-6 h-6 border-2 border-current border-t-transparent rounded-full ${className}`}
			animate={{ rotate: 360 }}
			transition={{
				duration: 1,
				repeat: Infinity,
				ease: "linear"
			}}
		/>
	);
}

export function LoadingPulse({ className = "" }: { className?: string }) {
	return (
		<motion.div
			className={`w-4 h-4 bg-current rounded-full ${className}`}
			animate={{
				scale: [1, 1.2, 1],
				opacity: [0.6, 1, 0.6]
			}}
			transition={{
				duration: 1.5,
				repeat: Infinity,
				ease: "easeInOut"
			}}
		/>
	);
}

interface TypewriterProps {
	text: string;
	delay?: number;
	speed?: number;
	className?: string;
}

export function Typewriter({ 
	text, 
	delay = 0, 
	speed = 50, 
	className = "" 
}: TypewriterProps) {
	return (
		<motion.span
			className={className}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay }}
		>
			{text.split("").map((char, i) => (
				<motion.span
					key={i}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ 
						delay: delay + (i * speed / 1000),
						duration: 0
					}}
				>
					{char}
				</motion.span>
			))}
		</motion.span>
	);
}