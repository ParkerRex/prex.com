import React from "react";

export function MoogIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M3 6h18v12H3V6zm2 2v8h14V8H5zm2 2h2v4H7v-4zm4 0h2v4h-2v-4zm4 0h2v4h-2v-4z" />
			<circle cx="6" cy="4" r="1" />
			<circle cx="9" cy="4" r="1" />
			<circle cx="12" cy="4" r="1" />
			<circle cx="15" cy="4" r="1" />
			<circle cx="18" cy="4" r="1" />
		</svg>
	);
}