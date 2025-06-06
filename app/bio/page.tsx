import Link from "next/link"
import Footer from "@/components/footer"

export default function BioPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-8 inline-block">
            ← back to home
          </Link>
          <h1 className="text-3xl font-bold mb-6">Hi, I'm Parker Rex</h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            I'm an autodidact, health enthusiast, and technologist with a passion for learning, building, and sharing
            knowledge. This is my story — raw, unfiltered, and in my own words.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12 text-gray-300 leading-relaxed">
          {/* Early Life */}
          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-6">Early Life</h2>
            <div className="space-y-4">
              <p>
                I grew up in South Florida, in a really nice part of town surrounded by trust fund kids and wealthy
                folks. It was a good setup until 2008 hit. The financial crisis shook things up for my family, and while
                we weren't in a bad spot, it knocked me out of the "fancy school" crowd. So, I ended up at FSU. School
                was never my thing—I was a terrible student unless something grabbed me. If I got hooked on a subject,
                though, I'd dive in deep and get good fast.
              </p>
              <p>
                Take computers, for example. At 13, I got obsessed and built my first gaming rig—a knockoff Alienware. I
                messed around with basic scripting and server management using FileZilla, all because I was addicted to
                Counter-Strike 1.6. I even learned design tools like GIMP to make blocks for a mod called Hide-and-Seek.
                That's when I started downloading code files, trying to figure out what the hell they did.
              </p>
              <p>
                Then there was pyrotechnics. I found a copy of the Anarchist Cookbook on The Pirate Bay and went nuts. I
                learned how to make smoke bombs, extract KNO₃ from stump remover at Home Depot, and pull sulfur and iron
                oxide using electrolysis with a car battery to make thermite. I made flash powder, built rockets with
                homemade gunpowder (ball mill included), and grew a YouTube channel called "Parker the Pyro" to 13,000
                subscribers by 15. Wild times.
              </p>
            </div>
          </section>

          {/* Avicii's Prodigy */}
          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-6">Avicii's Prodigy</h2>
            <div className="space-y-4">
              <p>
                At 15, I heard Avicii and thought, "I can do that." So, I torrented Ableton off The Pirate Bay and spent
                the next four years obsessed with music production. I produced tracks, DJed at parties, and started
                throwing my own at my parents' house when they were out of town. Made up to $500 a night in high
                school—pretty sweet gig. My parents were always at our second home, so I had a lot of freedom back then.
              </p>
              <p>
                By the end of high school, my grades sucked. I went to FSU for a semester and a half, but every summer,
                I'd work for my cousin at a creative agency called Humanaut. They've won a ton of awards, and I got to
                work under Mike, who later founded Liquid Death. Back then, he was just Mike, and we were tasked with
                naming a water brand. He came up with "Liquid Death"—coolest thing ever. That showed me you could just
                dream up an idea and make it real.
              </p>
            </div>
          </section>

          {/* Delivery Dudes */}
          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-6">Delivery Dudes and the Grind</h2>
            <div className="space-y-4">
              <p>
                Halfway through sophomore year, I said screw it to college. My sister's boyfriend was delivering pizzas,
                so I joined his company, Delivery Dudes. We started small, delivering steaks for fancy restaurants in
                Delray Beach. I was learning way more there than I ever did as a frat bro, so I stuck with it.
              </p>
              <p>
                I got into design, flyering, and guerrilla marketing for Delivery Dudes. At 19, I was making strong
                $2,000 a month—huge for me back then. We kept growing, opening new locations and letting drivers
                franchise their own spots. As we scaled, we needed tech. I learned user experience design (didn't even
                know it had a name at first) and built our driver app. The first version was so bad I had to bribe
                people with gift cards to use it.
              </p>
              <p>
                Long story short, we went from zero tech to supporting $73 million in annual business in a three-sided
                marketplace, all while dodging punches from Uber Eats and DoorDash. I handled everything: UX/UI design,
                graphic design, apparel, car wraps, some front-end dev, hiring engineers (onshore and offshore), sitting
                on the executive team, leading offsites with EOS, and throwing charity and promo events.
              </p>
            </div>
          </section>

          {/* The Sale */}
          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-6">The Sale and What Came Next</h2>
            <div className="space-y-4">
              <p>
                The sale was messy. We pissed off DoorDash after calling them out at a conference—dumb move. They hit
                back, and our revenue dropped from $73 million to $47 million. COVID kept us alive, but after selling, I
                became the product leader at Waitr (the company that bought us). It was chaos. I convinced them to give
                me a $2.3 million budget for engineers, built a team, then bailed.
              </p>
              <p>
                I'd pitched Y Combinator a few times—once flew out to pitch Paul Buchheit (Gmail's founder), but the
                idea was illegal. Then I made a course, Product Management for Beginners, to teach others and make some
                cash. I had a YouTube channel documenting my product manager life—daily videos during COVID from a dope
                office. Launched the course in Italy and pulled in nearly $20,000 in five days.
              </p>
            </div>
          </section>

          {/* Failed Startups */}
          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-6">The Startup Graveyard</h2>
            <div className="space-y-4">
              <p>
                I worked with engineers from around the world on some products, but they flopped. Here's the graveyard:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="list-disc">
                  <strong>Rapture:</strong> On-demand entertainment marketplace. Awful name, but my cousin picked it—he
                  also helped name Liquid Death, so I trusted him.
                </li>
                <li className="list-disc">
                  <strong>Venu:</strong> Payment and booking platform for musicians. Did $30k GMV but couldn't scale.
                </li>
                <li className="list-disc">
                  <strong>MGMT:</strong> Business Software for Talent Management. A complete business management
                  platform.
                </li>
              </ul>
              <p>
                After a year and a half, I was burning savings in Austin, so I moved back and got serious about coding.
                I'd tried at 15, 18, 21, and 25, but at 28, it stuck. Learned TypeScript and Next.js and built some
                stuff—nothing big commercially, just used AI as a tutor to learn.
              </p>
            </div>
          </section>

          {/* Current Work */}
          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-6">My Tech Journey</h2>
            <div className="space-y-4">
              <p>
                After the startup acquisition, I immersed myself in coding and AI development. The same curiosity that
                drove me to build rockets now drives me to build technology. I've created a diverse portfolio of tech
                businesses:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="list-disc">
                  <strong>MAP:</strong> My health and productivity platform that integrates AI with biometric data
                </li>
                <li className="list-disc">
                  <strong>The REX Firm:</strong> My AI-first software development agency serving clients worldwide
                </li>
                <li className="list-disc">
                  <strong>REX Media:</strong> My media company focused on AI news and developer education
                </li>
                <li className="list-disc">
                  <strong>TroubleFreeAI:</strong> My paid community helping people master AI tools and workflows
                </li>
              </ul>
            </div>
          </section>

          {/* Philosophy */}
          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-6">My Philosophy</h2>
            <div className="space-y-4">
              <p>
                I believe technology should empower people, not overwhelm them. My approach combines deep technical
                understanding with practical applications, breaking down complex concepts into accessible pieces,
                continuous experimentation and learning, and building products that genuinely help people achieve their
                goals.
              </p>
            </div>
          </section>

          {/* Three Major Risks */}
          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-6">The Three Major Risks in Startups</h2>
            <div className="space-y-4">
              <p>Through all this, I've learned there are three big risks when starting a company:</p>
              <ul className="space-y-2 ml-6">
                <li className="list-disc">
                  <strong>Market Risk:</strong> Is there demand?
                </li>
                <li className="list-disc">
                  <strong>Technical Risk:</strong> Can you build it?
                </li>
                <li className="list-disc">
                  <strong>Execution Risk:</strong> Can you make it work and scale?
                </li>
              </ul>
              <p>
                Every chapter taught me something about those, and I'm using it now. That's my story—31 years of chaos,
                from gaming rigs and smoke bombs to SaaS and AI.
              </p>
            </div>
          </section>

          {/* Current Focus */}
          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-6">What I'm Focused On Now</h2>
            <div className="space-y-4">
              <p>These days, I'm channeling my energy into:</p>
              <ul className="space-y-2 ml-6">
                <li className="list-disc">
                  Still focused on getting MAP to users, but realizing it's too capital intensive to reach its full
                  potential
                </li>
                <li className="list-disc">
                  Growing the TroubleFreeAI community and helping members master productive AI workflows
                </li>
                <li className="list-disc">
                  Creating educational content that bridges the gap between technical AI capabilities and practical
                  applications
                </li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-6">Let's Connect</h2>
            <div className="space-y-4">
              <p>I'm always open to conversations, collaborations, and new ideas. Reach out through:</p>
              <ul className="space-y-2 ml-6">
                <li className="list-disc">Twitter</li>
                <li className="list-disc">YouTube</li>
                <li className="list-disc">me@parkerrex.com</li>
              </ul>
            </div>
          </section>
        </div>

        <Footer currentPage="bio" />
      </div>
    </div>
  )
}
