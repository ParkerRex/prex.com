"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { GuitarIcon } from "@/components/icons/guitar-icon";
import { MoogIcon } from "@/components/icons/moog-icon";
import { PianoIcon } from "@/components/icons/piano-icon";
import { cn } from "@/lib/utils";

interface PianoKey {
	note: string;
	frequency: number;
	route: string;
	label: string;
	isBlack: boolean;
	position?: number; // Position for black keys
}

const pianoKeys: PianoKey[] = [
	{ note: "C", frequency: 261.63, route: "/", label: "Home", isBlack: false },
	{
		note: "C#",
		frequency: 277.18,
		route: "",
		label: "",
		isBlack: true,
		position: 0.5,
	},
	{
		note: "D",
		frequency: 293.66,
		route: "/about",
		label: "About",
		isBlack: false,
	},
	{
		note: "D#",
		frequency: 311.13,
		route: "",
		label: "",
		isBlack: true,
		position: 1.5,
	},
	{ note: "E", frequency: 329.63, route: "/bio", label: "Bio", isBlack: false },
	{
		note: "F",
		frequency: 349.23,
		route: "/blog",
		label: "Blog",
		isBlack: false,
	},
	{
		note: "F#",
		frequency: 369.99,
		route: "",
		label: "",
		isBlack: true,
		position: 3.5,
	},
	{
		note: "G",
		frequency: 392.0,
		route: "/content",
		label: "Content",
		isBlack: false,
	},
	{
		note: "G#",
		frequency: 415.3,
		route: "",
		label: "",
		isBlack: true,
		position: 4.5,
	},
	{
		note: "A",
		frequency: 440.0,
		route: "/research",
		label: "Research",
		isBlack: false,
	},
	{
		note: "A#",
		frequency: 466.16,
		route: "",
		label: "",
		isBlack: true,
		position: 5.5,
	},
];

// Major chord definitions (root, third, fifth)
const chordDefinitions: Record<string, number[]> = {
	C: [261.63, 329.63, 392.0], // C major
	"C#": [277.18, 349.23, 415.3], // C# major
	D: [293.66, 369.99, 440.0], // D major
	"D#": [311.13, 392.0, 466.16], // D# major
	E: [329.63, 415.3, 493.88], // E major
	F: [349.23, 440.0, 523.25], // F major
	"F#": [369.99, 466.16, 554.37], // F# major
	G: [392.0, 493.88, 587.33], // G major
	"G#": [415.3, 523.25, 622.25], // G# major
	A: [440.0, 554.37, 659.25], // A major
	"A#": [466.16, 587.33, 698.46], // A# major
	B: [493.88, 622.25, 739.99], // B major
};

type SynthMode = "piano" | "moog" | "guitar";

interface Voice {
	oscillators: OscillatorNode[];
	gainNode: GainNode;
	filter?: BiquadFilterNode;
	startTime: number;
}

export default function PianoNavigation() {
	const pathname = usePathname();
	const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [isAudioReady, setIsAudioReady] = useState(false);
	const [synthMode, setSynthMode] = useState<SynthMode>("piano");
	const activeVoicesRef = useRef<Voice[]>([]);
	const masterGainRef = useRef<GainNode | null>(null);
	const compressorRef = useRef<DynamicsCompressorNode | null>(null);

	useEffect(() => {
		// Check screen size for visibility - only show on large screens (1280px and up)
		const checkScreenSize = () => {
			setIsVisible(window.innerWidth >= 1280); // Show on xl screens and up only
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);

		return () => {
			window.removeEventListener("resize", checkScreenSize);
		};
	}, []);

	// Initialize audio context on first user interaction
	const initAudioContext = useCallback(() => {
		if (!audioContext && typeof window !== "undefined") {
			const ctx = new (
				window.AudioContext ||
				(window as unknown as { webkitAudioContext: typeof AudioContext })
					.webkitAudioContext
			)();
			setAudioContext(ctx);
			setIsAudioReady(true);

			// Create master gain and compressor
			const masterGain = ctx.createGain();
			masterGain.gain.setValueAtTime(0.3, ctx.currentTime); // Lower master volume

			const compressor = ctx.createDynamicsCompressor();
			compressor.threshold.setValueAtTime(-24, ctx.currentTime);
			compressor.knee.setValueAtTime(30, ctx.currentTime);
			compressor.ratio.setValueAtTime(12, ctx.currentTime);
			compressor.attack.setValueAtTime(0.003, ctx.currentTime);
			compressor.release.setValueAtTime(0.25, ctx.currentTime);

			// Connect master chain
			masterGain.connect(compressor);
			compressor.connect(ctx.destination);

			masterGainRef.current = masterGain;
			compressorRef.current = compressor;

			// Resume audio context if it's suspended
			if (ctx.state === "suspended") {
				ctx.resume();
			}
		}
	}, [audioContext]);

	// Clean up old voices
	const cleanupVoices = useCallback((ctx: AudioContext) => {
		const now = ctx.currentTime;
		activeVoicesRef.current = activeVoicesRef.current.filter((voice) => {
			// Remove voices older than 2 seconds
			if (now - voice.startTime > 2) {
				for (const osc of voice.oscillators) {
					try {
						osc.stop();
						osc.disconnect();
					} catch (e) {
						// Already stopped
					}
				}
				voice.gainNode.disconnect();
				if (voice.filter) voice.filter.disconnect();
				return false;
			}
			return true;
		});
	}, []);

	const playPianoNote = useCallback(
		(frequency: number, ctx: AudioContext) => {
			if (!masterGainRef.current) return;

			// Clean up old voices
			cleanupVoices(ctx);

			// Limit polyphony to 4 voices
			if (activeVoicesRef.current.length >= 4) {
				const oldestVoice = activeVoicesRef.current.shift();
				if (oldestVoice) {
					oldestVoice.gainNode.gain.cancelScheduledValues(ctx.currentTime);
					oldestVoice.gainNode.gain.setValueAtTime(
						oldestVoice.gainNode.gain.value,
						ctx.currentTime,
					);
					oldestVoice.gainNode.gain.exponentialRampToValueAtTime(
						0.01,
						ctx.currentTime + 0.05,
					);

					setTimeout(() => {
						for (const osc of oldestVoice.oscillators) {
							try {
								osc.stop();
								osc.disconnect();
							} catch (e) {
								// Already stopped
							}
						}
						oldestVoice.gainNode.disconnect();
					}, 100);
				}
			}

			const now = ctx.currentTime;

			// Create nodes
			const oscillator = ctx.createOscillator();
			const gainNode = ctx.createGain();

			// Configure oscillator for piano-like sound
			oscillator.type = "sine";
			oscillator.frequency.setValueAtTime(frequency, now);

			// Single harmonic for cleaner sound
			const oscillator2 = ctx.createOscillator();
			oscillator2.type = "sine";
			oscillator2.frequency.setValueAtTime(frequency * 2, now);
			oscillator2.detune.value = 8;

			// Configure gain with gentler envelope
			gainNode.gain.setValueAtTime(0, now);
			gainNode.gain.linearRampToValueAtTime(0.25, now + 0.005); // Quick attack
			gainNode.gain.exponentialRampToValueAtTime(0.1, now + 0.05); // Fast decay
			gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5); // Shorter release

			// Connect with lower harmonic volume
			const harmonicGain = ctx.createGain();
			harmonicGain.gain.setValueAtTime(0.3, now);

			oscillator.connect(gainNode);
			oscillator2.connect(harmonicGain);
			harmonicGain.connect(gainNode);
			gainNode.connect(masterGainRef.current);

			// Start oscillators
			oscillator.start(now);
			oscillator2.start(now);

			// Stop oscillators
			oscillator.stop(now + 0.6);
			oscillator2.stop(now + 0.6);

			// Store voice reference
			const voice: Voice = {
				oscillators: [oscillator, oscillator2],
				gainNode,
				startTime: now,
			};
			activeVoicesRef.current.push(voice);

			// Clean up
			oscillator.onended = () => {
				activeVoicesRef.current = activeVoicesRef.current.filter(
					(v) => v !== voice,
				);
			};
		},
		[cleanupVoices],
	);

	const playMoogNote = useCallback(
		(frequency: number, ctx: AudioContext) => {
			if (!masterGainRef.current) return;

			// Clean up old voices
			cleanupVoices(ctx);

			// Limit polyphony to 3 voices for Moog (more monophonic character)
			if (activeVoicesRef.current.length >= 3) {
				const oldestVoice = activeVoicesRef.current.shift();
				if (oldestVoice) {
					oldestVoice.gainNode.gain.cancelScheduledValues(ctx.currentTime);
					oldestVoice.gainNode.gain.setValueAtTime(
						oldestVoice.gainNode.gain.value,
						ctx.currentTime,
					);
					oldestVoice.gainNode.gain.exponentialRampToValueAtTime(
						0.01,
						ctx.currentTime + 0.05,
					);

					setTimeout(() => {
						for (const osc of oldestVoice.oscillators) {
							try {
								osc.stop();
								osc.disconnect();
							} catch (e) {
								// Already stopped
							}
						}
						oldestVoice.gainNode.disconnect();
						if (oldestVoice.filter) oldestVoice.filter.disconnect();
					}, 100);
				}
			}

			const now = ctx.currentTime;

			// Create nodes
			const oscillator = ctx.createOscillator();
			const filter = ctx.createBiquadFilter();
			const gainNode = ctx.createGain();

			// Configure main oscillator for Moog-like sound
			oscillator.type = "sawtooth";
			oscillator.frequency.setValueAtTime(frequency, now);

			// Configure filter (key part of Moog sound)
			filter.type = "lowpass";
			filter.frequency.setValueAtTime(frequency * 2, now);
			filter.Q.setValueAtTime(5, now);

			// Gentler filter envelope
			filter.frequency.linearRampToValueAtTime(frequency * 4, now + 0.01);
			filter.frequency.exponentialRampToValueAtTime(frequency * 2, now + 0.1);
			filter.frequency.exponentialRampToValueAtTime(frequency * 0.5, now + 0.8);

			// Configure gain envelope
			gainNode.gain.setValueAtTime(0, now);
			gainNode.gain.linearRampToValueAtTime(0.2, now + 0.003); // Fast attack
			gainNode.gain.exponentialRampToValueAtTime(0.1, now + 0.1); // Quick decay
			gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1); // Medium release

			// Connect nodes
			oscillator.connect(filter);
			filter.connect(gainNode);
			gainNode.connect(masterGainRef.current);

			// Start oscillator
			oscillator.start(now);

			// Stop oscillator
			oscillator.stop(now + 1.2);

			// Store voice reference
			const voice: Voice = {
				oscillators: [oscillator],
				gainNode,
				filter,
				startTime: now,
			};
			activeVoicesRef.current.push(voice);

			// Clean up
			oscillator.onended = () => {
				activeVoicesRef.current = activeVoicesRef.current.filter(
					(v) => v !== voice,
				);
			};
		},
		[cleanupVoices],
	);

	const playGuitarChord = useCallback(
		(note: string, ctx: AudioContext) => {
			if (!masterGainRef.current) return;

			// Clean up old voices
			cleanupVoices(ctx);

			// Limit polyphony to 2 chords for guitar
			if (activeVoicesRef.current.length >= 2) {
				const oldestVoice = activeVoicesRef.current.shift();
				if (oldestVoice) {
					oldestVoice.gainNode.gain.cancelScheduledValues(ctx.currentTime);
					oldestVoice.gainNode.gain.setValueAtTime(
						oldestVoice.gainNode.gain.value,
						ctx.currentTime,
					);
					oldestVoice.gainNode.gain.exponentialRampToValueAtTime(
						0.01,
						ctx.currentTime + 0.05,
					);

					setTimeout(() => {
						for (const osc of oldestVoice.oscillators) {
							try {
								osc.stop();
								osc.disconnect();
							} catch (e) {
								// Already stopped
							}
						}
						oldestVoice.gainNode.disconnect();
					}, 100);
				}
			}

			const frequencies = chordDefinitions[note];
			if (!frequencies) return;

			const now = ctx.currentTime;
			const oscillators: OscillatorNode[] = [];
			const gainNode = ctx.createGain();

			// Configure chord gain envelope (guitar-like attack)
			gainNode.gain.setValueAtTime(0, now);
			gainNode.gain.linearRampToValueAtTime(0.15, now + 0.01); // Sharp attack
			gainNode.gain.exponentialRampToValueAtTime(0.08, now + 0.3); // Sustain
			gainNode.gain.exponentialRampToValueAtTime(0.01, now + 2.5); // Long release

			// Create oscillator for each note in the chord
			frequencies.forEach((frequency, index) => {
				const oscillator = ctx.createOscillator();
				const noteGain = ctx.createGain();

				// Use triangle wave for guitar-like sound
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(frequency, now);

				// Slight detuning for richer sound
				oscillator.detune.value = (index - 1) * 3;

				// Balance chord notes (root louder)
				noteGain.gain.setValueAtTime(index === 0 ? 0.5 : 0.3, now);

				oscillator.connect(noteGain);
				noteGain.connect(gainNode);
				oscillators.push(oscillator);

				oscillator.start(now);
				oscillator.stop(now + 3);
			});

			gainNode.connect(masterGainRef.current);

			// Store voice reference
			const voice: Voice = {
				oscillators,
				gainNode,
				startTime: now,
			};
			activeVoicesRef.current.push(voice);
			// Clean up
			if (oscillators[0]) {
				oscillators[0].onended = () => {
					activeVoicesRef.current = activeVoicesRef.current.filter(
						(v) => v !== voice,
					);
				};
			}
		},
		[cleanupVoices],
	);

	const playNote = useCallback(
		(frequency: number, note?: string) => {
			if (!audioContext || audioContext.state === "suspended") {
				initAudioContext();
				return;
			}

			try {
				if (synthMode === "piano") {
					playPianoNote(frequency, audioContext);
				} else if (synthMode === "moog") {
					playMoogNote(frequency, audioContext);
				} else if (synthMode === "guitar" && note) {
					playGuitarChord(note, audioContext);
				}
			} catch (e) {
				console.error("Error playing note:", e);
			}
		},
		[
			audioContext,
			initAudioContext,
			synthMode,
			playPianoNote,
			playMoogNote,
			playGuitarChord,
		],
	);

	// Debounced note trigger to prevent rapid firing
	const lastNoteTimeRef = useRef<number>(0);
	const handleMouseEnter = useCallback(
		(frequency: number, note: string) => {
			const now = Date.now();
			// Minimum 50ms between notes (longer for guitar chords)
			const minInterval = synthMode === "guitar" ? 200 : 50;
			if (now - lastNoteTimeRef.current < minInterval) return;
			lastNoteTimeRef.current = now;

			// Initialize audio context on first interaction if needed
			if (!isAudioReady) {
				initAudioContext();
			}
			playNote(frequency, note);
		},
		[isAudioReady, initAudioContext, playNote, synthMode],
	);

	const toggleSynthMode = () => {
		setSynthMode((prev) => {
			if (prev === "piano") return "moog";
			if (prev === "moog") return "guitar";
			return "piano";
		});
	};

	if (!isVisible) return null;

	const whiteKeys = pianoKeys.filter((key) => !key.isBlack);
	const blackKeys = pianoKeys.filter((key) => key.isBlack);

	return (
		<nav className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden xl:block">
			{/* Mode Toggle */}
			<button
				type="button"
				onClick={toggleSynthMode}
				className="absolute -top-12 left-0 flex items-center gap-2 px-3 py-1.5
					bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800
					text-xs font-medium text-gray-700 dark:text-gray-300"
				title={`Switch to ${synthMode === "piano" ? "Moog" : synthMode === "moog" ? "Guitar" : "Piano"} mode`}
			>
				{synthMode === "piano" ? (
					<>
						<PianoIcon className="w-4 h-4" />
						<span>Piano</span>
					</>
				) : synthMode === "moog" ? (
					<>
						<MoogIcon className="w-4 h-4" />
						<span>Moog</span>
					</>
				) : (
					<>
						<GuitarIcon className="w-4 h-4" />
						<span>Guitar</span>
					</>
				)}
			</button>

			<div className="relative">
				{synthMode === "guitar" ? (
					/* Guitar fretboard layout */
					<div className="flex flex-col gap-[2px]">
						{whiteKeys.map((key, index) => {
							const isActive = pathname === key.route;
							return (
								<Link
									key={key.note}
									href={key.route}
									onMouseEnter={() => handleMouseEnter(key.frequency, key.note)}
									onClick={initAudioContext}
									className={cn(
										"relative w-44 h-8 bg-amber-100 dark:bg-amber-200",
										"border-2 border-amber-800 dark:border-amber-900",
										"hover:bg-amber-200 dark:hover:bg-amber-300",
										"flex items-center justify-between px-3",
										"group overflow-hidden",
										isActive &&
											"bg-amber-300 dark:bg-amber-400 border-amber-900 dark:border-black",
									)}
								>
									{/* Fret marker */}
									<div className="w-1 h-6 bg-gray-600 dark:bg-gray-800" />

									{/* Chord indicator */}
									<div
										className={cn(
											"absolute left-2 top-0 bottom-0 w-0.5 bg-amber-800 dark:bg-amber-900",
											"transform -translate-x-full transition-transform",
											"group-hover:translate-x-0",
											isActive && "translate-x-0",
										)}
									/>

									<span
										className={cn(
											"text-xs font-medium text-amber-900 dark:text-amber-950",
											isActive && "font-bold",
										)}
									>
										{key.label}
									</span>

									{/* Chord name */}
									<span className="text-[10px] font-bold text-amber-800 dark:text-amber-900">
										{key.note}maj
									</span>
								</Link>
							);
						})}
					</div>
				) : (
					/* Piano/Moog layout */
					<>
						{/* White keys */}
						<div className="flex flex-col gap-[1px]">
							{whiteKeys.map((key) => {
								const isActive = pathname === key.route;
								return (
									<Link
										key={key.note}
										href={key.route}
										onMouseEnter={() =>
											handleMouseEnter(key.frequency, key.note)
										}
										onClick={initAudioContext} // Initialize on click as fallback
										className={cn(
											"relative w-40 h-10 bg-white dark:bg-gray-100",
											"border border-gray-200 dark:border-gray-700",
											"hover:bg-gray-50 dark:hover:bg-gray-200",
											"flex items-center justify-end pr-3",
											"group overflow-hidden",
											isActive &&
												"bg-gray-200 dark:bg-gray-300 border-black dark:border-white",
											synthMode === "moog" && "bg-gray-50 dark:bg-gray-200", // Slightly different color for Moog mode
										)}
									>
										{/* Active/Hover indicator */}
										<div
											className={cn(
												"absolute left-0 top-0 bottom-0 w-1 bg-black dark:bg-white",
												"transform -translate-x-full transition-transform",
												"group-hover:translate-x-0",
												isActive && "translate-x-0",
											)}
										/>
										<span
											className={cn(
												"text-xs font-medium text-gray-600 dark:text-gray-700",
												isActive && "text-black dark:text-black font-bold",
											)}
										>
											{key.label}
										</span>
									</Link>
								);
							})}
						</div>

						{/* Black keys */}
						<div className="absolute top-0 left-0">
							{blackKeys.map((key) => {
								if (!key.route) return null; // Skip unused black keys
								const isActive = pathname === key.route;
								const topPosition = key.position ? key.position * 40 : 0;

								return (
									<Link
										key={key.note}
										href={key.route}
										onMouseEnter={() =>
											handleMouseEnter(key.frequency, key.note)
										}
										onClick={initAudioContext} // Initialize on click as fallback
										className={cn(
											"absolute w-28 h-7 bg-gray-900 dark:bg-black",
											"hover:bg-gray-800 dark:hover:bg-gray-900",
											"flex items-center justify-end pr-2",
											"group z-10 overflow-hidden",
											isActive && "bg-gray-700 dark:bg-gray-800",
											synthMode === "moog" && "bg-gray-800 dark:bg-gray-950", // Slightly different color for Moog mode
										)}
										style={{ top: `${topPosition}px` }}
									>
										{/* Active/Hover indicator */}
										<div
											className={cn(
												"absolute left-0 top-0 bottom-0 w-0.5 bg-white",
												"transform -translate-x-full transition-transform",
												"group-hover:translate-x-0",
												isActive && "translate-x-0",
											)}
										/>
										<span
											className={cn(
												"text-[10px] font-medium text-white",
												isActive && "opacity-90",
												"opacity-70 group-hover:opacity-100",
											)}
										>
											{key.label}
										</span>
									</Link>
								);
							})}
						</div>
					</>
				)}
			</div>
		</nav>
	);
}
