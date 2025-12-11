"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);

	const springConfig = { damping: 25, stiffness: 700 };
	const cursorXSpring = useSpring(cursorX, springConfig);
	const cursorYSpring = useSpring(cursorY, springConfig);

	useEffect(() => {
		const moveCursor = (e: MouseEvent) => {
			cursorX.set(e.clientX - 150);
			cursorY.set(e.clientY - 150);
		};

		window.addEventListener("mousemove", moveCursor);

		return () => {
			window.removeEventListener("mousemove", moveCursor);
		};
	}, [cursorX, cursorY]);

	return (
		<motion.div
			className="pointer-events-none fixed inset-0 z-30 transition duration-300 hidden lg:block"
			style={{
				x: cursorXSpring,
				y: cursorYSpring,
			}}
		>
			<div className="h-[300px] w-[300px] rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-[100px] dark:from-blue-400/5 dark:via-purple-400/5 dark:to-pink-400/5" />
		</motion.div>
	);
}
