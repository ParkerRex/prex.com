import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
	title: "Parker Rex Biography",
	description:
		"The complete story of Parker Rex - from building gaming rigs and smoke bombs at 15 to scaling a food delivery startup to $73M and becoming an AI-first entrepreneur. Raw, unfiltered journey.",
	openGraph: {
		title: "Parker Rex Biography - The Complete Story",
		description:
			"From gaming rigs and pyrotechnics to scaling a startup to $73M and becoming an AI-first entrepreneur. The unfiltered journey.",
		url: "https://prex.com/bio",
	},
	twitter: {
		title: "Parker Rex Biography - The Complete Story",
		description:
			"From gaming rigs and pyrotechnics to scaling a startup to $73M and becoming an AI-first entrepreneur.",
	},
	alternates: {
		canonical: "https://prex.com/bio",
	},
};

export default function BioPage() {
	return (
		<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
			<div className="container mx-auto px-4 py-16 max-w-2xl">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold mb-4">hi, i'm parker rex</h1>
					<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
						self-taught builder who learns by doing. here's how i got here.
					</p>
				</div>

				{/* Main Content */}
				<div className="space-y-12">
					{/* Early Days */}
					<section className="mb-12">
						<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
							early days
						</h2>
						<div className="bg-gray-100 dark:bg-gray-900 p-4">
							<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
								I built my first gaming rig at 13, a knockoff Alienware that got
								me hooked on Counter-Strike and basic scripting. That obsession
								led to wilder experiments: extracting chemicals from Home Depot
								supplies to make thermite, building rockets with homemade
								gunpowder, and growing a YouTube channel called "Parker the
								Pyro" to 13,000 subscribers by 15. At the same age, I heard
								Avicii and thought "I can do that." So I torrented Ableton and
								spent four years producing music and DJing parties, making up to
								$500 a night in high school.
							</p>
						</div>
					</section>

					{/* The Journey */}
					<section className="mb-12">
						<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
							the journey
						</h2>
						<div className="bg-gray-100 dark:bg-gray-900 p-4">
							<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
								I dropped out of FSU to join Delivery Dudes, where I went from
								flyering to leading product and design as we scaled to $73M in
								annual business. After the acquisition, I tried launching
								several startups (Rapture, Venu, MGMT, all failed) before
								finally learning to code at 28. Now I run multiple tech
								businesses: MAP (my health platform), The REX Firm (AI
								development agency), REX Media (AI education), and VAI (paid
								community). My approach is simple: break down complex tech into
								accessible pieces and build products that actually help people.
								From pyrotechnics to product management to AI, it's been 31
								years of following obsessions wherever they lead.
							</p>
						</div>
					</section>

					{/* Delivery Dudes */}
					<section className="mb-12">
						<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
							delivery dudes and the grind
						</h2>
						<div className="bg-gray-100 dark:bg-gray-900 p-4">
							<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
								Halfway through sophomore year, I left college. My sister's
								boyfriend was delivering pizzas, so I joined his company,
								Delivery Dudes. We started small, delivering steaks for fancy
								restaurants in Delray Beach. I was learning way more there than
								I ever did as a frat bro, so I stuck with it.
							</p>
							<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
								I got into design, flyering, and guerrilla marketing for
								Delivery Dudes. At 19, I was making strong $2,000 a month—huge
								for me back then. We kept growing, opening new locations and
								letting drivers franchise their own spots. As we scaled, we
								needed tech. I learned user experience design (didn't even know
								it had a name at first) and built our driver app. The first
								version was so bad I had to bribe people with gift cards to use
								it.
							</p>
							<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
								Long story short, we went from zero tech to supporting $73
								million in annual business in a three-sided marketplace, all
								while dodging punches from Uber Eats and DoorDash. I handled
								everything: UX/UI design, graphic design, apparel, car wraps,
								some front-end dev, hiring engineers (onshore and offshore),
								sitting on the executive team, leading offsites with EOS.
							</p>
						</div>
					</section>

					<section className="mb-12">
						<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
							the sale and what came next
						</h2>
						<div className="bg-gray-100 dark:bg-gray-900 p-4">
							<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
								The sale was messy. We upset DoorDash after calling them out at
								a conference—dumb move. They hit back, and our revenue dropped
								from $73 million to $47 million. COVID kept us alive, but after
								selling, I became the product leader at Waitr (the company that
								bought us). It was chaos. I convinced them to give me a $2.3
								million budget for engineers, built a team, then bailed.
							</p>
							<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
								I'd pitched Y Combinator a few times—once flew out to pitch Paul
								Buchheit (Gmail's founder), but the idea was illegal. Then I
								made a course, Product Management for Beginners, to teach others
								and make some cash. I had a YouTube channel documenting my
								product manager life—daily videos during COVID from a dope
								office. Launched the course in Italy and pulled in nearly
								$20,000 in five days.
							</p>
						</div>
					</section>

					{/* Failed Startups */}
					<section className="mb-12">
						<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
							the startup graveyard
						</h2>
						<div className="bg-gray-100 dark:bg-gray-900 p-4">
							<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
								I worked with engineers from around the world on some products,
								but they flopped. Here's the graveyard:
							</p>
							<ul className="ml-6 mt-4">
								<li className="list-disc text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-2">
									<strong>Rapture:</strong> On-demand entertainment marketplace.
									Awful name, but my cousin picked it—he also helped name Liquid
									Death, so I trusted him.
								</li>
								<li className="list-disc text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-2">
									<strong>Venu:</strong> Payment and booking platform for
									musicians. Did $30k GMV but couldn't scale.
								</li>
								<li className="list-disc text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-2">
									<strong>MGMT:</strong> Business Software for Talent
									Management. A complete business management platform.
								</li>
							</ul>
							<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-4">
								After a year and a half, I was burning savings in Austin, so I
								moved back and got serious about coding. I'd tried at 15, 18,
								21, and 25, but at 28, it stuck. Learned TypeScript and Next.js
								and built some stuff—nothing big commercially, just used AI as a
								tutor to learn.
							</p>
						</div>
					</section>

					{/* Contact */}
					<section className="mb-12">
						<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
							let's connect
						</h2>
						<div className="bg-gray-100 dark:bg-gray-900 p-4">
							<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
								I'm always open to conversations, collaborations, and new ideas.
								Reach out through:
							</p>
							<ul className="ml-6 mt-4">
								<li className="list-disc text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-2">
									Twitter
								</li>
								<li className="list-disc text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-2">
									YouTube
								</li>
								<li className="list-disc text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-2">
									me@parkerrex.com
								</li>
							</ul>
						</div>
					</section>
				</div>

				<Footer />
			</div>
		</div>
	);
}
