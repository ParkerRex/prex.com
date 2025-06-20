"use client";

import React from "react";

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends React.Component<
	{ children: React.ReactNode },
	ErrorBoundaryState
> {
	constructor(props: { children: React.ReactNode }) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Error caught by boundary:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen flex items-center justify-center bg-red-50">
					<div className="text-center p-8">
						<h1 className="text-2xl font-bold text-red-600 mb-4">
							Something went wrong
						</h1>
						<pre className="text-left bg-red-100 p-4 rounded text-sm">
							{this.state.error?.message}
						</pre>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}