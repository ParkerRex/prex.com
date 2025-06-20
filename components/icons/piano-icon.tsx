import React from "react";

export function PianoIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Piano Icon"
		>
			{/* White keys */}
			<rect
				x="3"
				y="8"
				width="3"
				height="12"
				fill="white"
				stroke="currentColor"
			/>
			<rect
				x="6"
				y="8"
				width="3"
				height="12"
				fill="white"
				stroke="currentColor"
			/>
			<rect
				x="9"
				y="8"
				width="3"
				height="12"
				fill="white"
				stroke="currentColor"
			/>
			<rect
				x="12"
				y="8"
				width="3"
				height="12"
				fill="white"
				stroke="currentColor"
			/>
			<rect
				x="15"
				y="8"
				width="3"
				height="12"
				fill="white"
				stroke="currentColor"
			/>
			<rect
				x="18"
				y="8"
				width="3"
				height="12"
				fill="white"
				stroke="currentColor"
			/>

			{/* Black keys */}
			<rect x="5" y="8" width="2" height="7" fill="currentColor" />
			<rect x="8" y="8" width="2" height="7" fill="currentColor" />
			<rect x="14" y="8" width="2" height="7" fill="currentColor" />
			<rect x="17" y="8" width="2" height="7" fill="currentColor" />
		</svg>
	);
}
