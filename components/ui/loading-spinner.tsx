import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
	className?: string;
	size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
	const sizeClasses = {
		sm: "w-4 h-4 border-2",
		md: "w-8 h-8 border-2", 
		lg: "w-12 h-12 border-4"
	};

	return (
		<div
			className={cn(
				"border-black dark:border-white border-t-transparent dark:border-t-transparent animate-spin",
				sizeClasses[size],
				className
			)}
			style={{ animation: "spin 1s linear infinite" }}
		/>
	);
}

export function LoadingDots({ className }: { className?: string }) {
	return (
		<div className={cn("flex space-x-1", className)}>
			<div className="w-2 h-2 bg-black dark:bg-white opacity-100" />
			<div className="w-2 h-2 bg-black dark:bg-white opacity-50" />
			<div className="w-2 h-2 bg-black dark:bg-white opacity-25" />
		</div>
	);
}

export function LoadingBar({ className }: { className?: string }) {
	return (
		<div className={cn("w-full h-1 bg-gray-200 dark:bg-gray-800", className)}>
			<div className="h-full w-1/3 bg-black dark:bg-white" />
		</div>
	);
}