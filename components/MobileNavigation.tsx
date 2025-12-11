"use client";

import {
	BackpackIcon,
	DotsHorizontalIcon,
	DrawingPinFilledIcon,
	HomeIcon,
	MagnifyingGlassIcon,
	PersonIcon,
	ReaderIcon,
	VideoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { cn } from "@/lib/utils";

interface NavItem {
	route: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	shortLabel: string;
}

const primaryNavItems: NavItem[] = [
	{ route: "/", label: "Home", icon: HomeIcon, shortLabel: "Home" },
	{
		route: "/research",
		label: "Research",
		icon: MagnifyingGlassIcon,
		shortLabel: "Research",
	},
];

const moreNavItems: NavItem[] = [
	{ route: "/about", label: "About", icon: PersonIcon, shortLabel: "About" },
];

export default function MobileNavigation() {
	const pathname = usePathname();
	const [isVisible, setIsVisible] = useState(false);
	const [isScrollingUp, setIsScrollingUp] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		// Check screen size for visibility - show on medium and small screens only
		const checkScreenSize = () => {
			setIsVisible(window.innerWidth < 1280); // Show on screens smaller than xl
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);

		return () => {
			window.removeEventListener("resize", checkScreenSize);
		};
	}, []);

	useEffect(() => {
		// Handle scroll behavior - hide when scrolling down, show when scrolling up
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY < lastScrollY || currentScrollY < 100) {
				setIsScrollingUp(true);
			} else if (currentScrollY > lastScrollY && currentScrollY > 100) {
				setIsScrollingUp(false);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [lastScrollY]);

	if (!isVisible) return null;

	return (
		<nav
			className={cn(
				"fixed bottom-0 left-0 right-0 z-50 xl:hidden",
				"bg-white/80 dark:bg-black/80 backdrop-blur-lg",
				"border-t border-gray-200 dark:border-gray-800",
				"transition-transform duration-300 ease-in-out",
				isScrollingUp ? "translate-y-0" : "translate-y-full",
			)}
		>
			{/* Glassmorphism overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent dark:from-black/20 pointer-events-none" />

			<div className="relative px-2 py-2">
				<div className="flex items-center justify-around max-w-md mx-auto">
					{/* Primary Navigation Items */}
					{primaryNavItems.map((item) => {
						const isActive = pathname === item.route;
						const Icon = item.icon;

						return (
							<Link
								key={item.route}
								href={item.route}
								className={cn(
									"flex flex-col items-center justify-center gap-1 p-2 rounded-lg",
									"min-w-0 flex-1 relative overflow-hidden",
									"transition-all duration-200 ease-in-out",
									"hover:bg-gray-100 dark:hover:bg-gray-900",
									isActive && "bg-gray-100 dark:bg-gray-900",
								)}
							>
								{/* Active indicator */}
								{isActive && (
									<div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-black dark:bg-white rounded-full" />
								)}

								{/* Icon with pulse effect for active */}
								<div
									className={cn(
										"relative transition-transform duration-200",
										isActive && "scale-110",
									)}
								>
									<Icon
										className={cn(
											"w-5 h-5 transition-colors duration-200",
											isActive
												? "text-black dark:text-white"
												: "text-gray-600 dark:text-gray-400",
										)}
									/>

									{/* Subtle glow for active */}
									{isActive && (
										<div className="absolute inset-0 bg-current opacity-20 rounded-full blur-sm" />
									)}
								</div>

								{/* Label */}
								<span
									className={cn(
										"text-[10px] font-medium leading-tight text-center",
										"transition-colors duration-200 truncate max-w-full",
										isActive
											? "text-black dark:text-white font-semibold"
											: "text-gray-600 dark:text-gray-400",
									)}
								>
									{item.shortLabel}
								</span>

								{/* Ripple effect on hover */}
								<div className="absolute inset-0 rounded-lg opacity-0 hover:opacity-10 bg-current transition-opacity duration-200" />
							</Link>
						);
					})}

					{/* More Menu */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								type="button"
								className={cn(
									"flex flex-col items-center justify-center gap-1 p-2 rounded-lg",
									"min-w-0 flex-1 relative overflow-hidden",
									"transition-all duration-200 ease-in-out",
									"hover:bg-gray-100 dark:hover:bg-gray-900",
									"focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-800",
									moreNavItems.some((item) => pathname === item.route) &&
										"bg-gray-100 dark:bg-gray-900",
								)}
							>
								{/* Active indicator for "More" items */}
								{moreNavItems.some((item) => pathname === item.route) && (
									<div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-black dark:bg-white rounded-full" />
								)}

								{/* Icon */}
								<div
									className={cn(
										"relative transition-transform duration-200",
										moreNavItems.some((item) => pathname === item.route) &&
											"scale-110",
									)}
								>
									<DotsHorizontalIcon
										className={cn(
											"w-5 h-5 transition-colors duration-200",
											moreNavItems.some((item) => pathname === item.route)
												? "text-black dark:text-white"
												: "text-gray-600 dark:text-gray-400",
										)}
									/>

									{/* Subtle glow for active */}
									{moreNavItems.some((item) => pathname === item.route) && (
										<div className="absolute inset-0 bg-current opacity-20 rounded-full blur-sm" />
									)}
								</div>

								{/* Label */}
								<span
									className={cn(
										"text-[10px] font-medium leading-tight text-center",
										"transition-colors duration-200 truncate max-w-full",
										moreNavItems.some((item) => pathname === item.route)
											? "text-black dark:text-white font-semibold"
											: "text-gray-600 dark:text-gray-400",
									)}
								>
									More
								</span>

								{/* Ripple effect on hover */}
								<div className="absolute inset-0 rounded-lg opacity-0 hover:opacity-10 bg-current transition-opacity duration-200" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="center"
							side="top"
							className="mb-2 bg-white/95 dark:bg-black/95 backdrop-blur-lg border-gray-200 dark:border-gray-800"
						>
							{moreNavItems.map((item) => {
								const Icon = item.icon;
								const isActive = pathname === item.route;

								return (
									<DropdownMenuItem key={item.route} asChild>
										<Link
											href={item.route}
											className={cn(
												"flex items-center gap-3 px-3 py-2 cursor-pointer",
												"hover:bg-gray-100 dark:hover:bg-gray-900",
												"transition-colors duration-200",
												isActive &&
													"bg-gray-100 dark:bg-gray-900 font-semibold",
											)}
										>
											<Icon
												className={cn(
													"w-4 h-4",
													isActive
														? "text-black dark:text-white"
														: "text-gray-600 dark:text-gray-400",
												)}
											/>
											<span
												className={cn(
													"text-sm",
													isActive
														? "text-black dark:text-white font-semibold"
														: "text-gray-700 dark:text-gray-300",
												)}
											>
												{item.label}
											</span>
										</Link>
									</DropdownMenuItem>
								);
							})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* Bottom safe area for phones with home indicators */}
			<div className="h-safe-bottom" />
		</nav>
	);
}
