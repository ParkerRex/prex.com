"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef, MouseEvent } from "react";

interface MagneticButtonProps {
	children: ReactNode;
	className?: string;
	strength?: number;
	onClick?: () => void;
	href?: string;
	target?: string;
	rel?: string;
}

export function MagneticButton({ 
	children, 
	className = "", 
	strength = 0.3,
	onClick,
	href,
	target,
	rel
}: MagneticButtonProps) {
	const buttonRef = useRef<HTMLElement>(null);

	const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
		if (!buttonRef.current) return;

		const rect = buttonRef.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		
		const deltaX = (e.clientX - centerX) * strength;
		const deltaY = (e.clientY - centerY) * strength;

		buttonRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
	};

	const handleMouseLeave = () => {
		if (!buttonRef.current) return;
		buttonRef.current.style.transform = "translate(0px, 0px)";
	};

	const Component = href ? motion.a : motion.button;
	const props = href ? { href, target, rel } : { onClick };

	return (
		<Component
			ref={buttonRef}
			{...props}
			className={`transition-transform duration-300 ease-out ${className}`}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
		>
			{children}
		</Component>
	);
}