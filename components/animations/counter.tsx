"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
	from?: number;
	to: number;
	duration?: number;
	decimals?: number;
	className?: string;
	suffix?: string;
}

export function AnimatedCounter({ 
	from = 0, 
	to, 
	duration = 2, 
	decimals = 0,
	className = "",
	suffix = ""
}: AnimatedCounterProps) {
	const ref = useRef(null);
	const motionValue = useMotionValue(from);
	const springValue = useSpring(motionValue, {
		damping: 100,
		stiffness: 100
	});
	const isInView = useInView(ref, { once: true, margin: "-50px" });

	useEffect(() => {
		if (isInView) {
			motionValue.set(to);
		}
	}, [motionValue, to, isInView]);

	useEffect(() => {
		return springValue.on("change", (latest) => {
			if (ref.current) {
				ref.current.textContent = latest.toFixed(decimals) + suffix;
			}
		});
	}, [springValue, decimals, suffix]);

	return <span ref={ref} className={className}>{from}</span>;
}

interface AnimatedPercentageProps {
	value: number;
	className?: string;
}

export function AnimatedPercentage({ value, className = "" }: AnimatedPercentageProps) {
	return (
		<AnimatedCounter
			to={value}
			duration={1.5}
			decimals={0}
			suffix="%"
			className={className}
		/>
	);
}