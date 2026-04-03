import VersesCarousel from '../components/VersesCarousel'
import MumVid from '../assets/Mumvid.MP4'
import ScrollReveal from '../components/ScrollReveal'

export default function Home() {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero */}
      <ScrollReveal>
        <section className="relative overflow-hidden rounded-[32px] border border-ink/5 glass">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(193,140,122,.15), transparent 40%), radial-gradient(circle at 90% 80%, rgba(44,39,36,.08), transparent 40%)' }} />
          <div className="relative px-6 py-20 sm:px-12 sm:py-24 lg:px-16 lg:py-28 text-center">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/80 border border-ink/10 px-4 py-1.5 text-[10px] sm:text-xs font-bold text-ink/80 tracking-wide uppercase shadow-sm mx-auto mb-8 animate-in slide-in-from-top-4 duration-1000">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              Prayer • Action • Community
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-ink leading-[1.1] sm:leading-tight tracking-[calc(-0.02em)]">
              Connect through prayer.<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary to-brand-primaryDark">Make an impact.</span>
            </h1>
            <p className="mt-8 text-base sm:text-lg md:text-xl text-ink/70 max-w-2xl mx-auto font-light leading-relaxed px-2 sm:px-0">
              A supportive space for mums. Build relationships, pray together, and actively assist our community as a united team.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <a href="/events" className="btn btn-primary px-8 py-4 text-base">Our Events</a>
              <a href="/contact" className="btn btn-secondary px-8 py-4 text-base">Get involved</a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Verses Carousel */}
      <ScrollReveal animation="up">
        <section>
          <div className="card p-8 sm:p-12 lg:p-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-ink tracking-tight sm:text-4xl">Verse highlights</h2>
              <p className="text-base text-ink/65 mt-3 max-w-xl mx-auto">A calm space curated for daily reflection and peace. Drawing strength from timeless wisdom.</p>
              <div className="mt-12">
                <VersesCarousel />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* simple callout */}
      <ScrollReveal animation="up">
        <section>
          <div className="relative overflow-hidden rounded-3xl border border-brand-primary/20 bg-linear-to-br from-brand-primary/10 to-brand-surface p-10 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-sm transition-all duration-500 hover:shadow-md">
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">Looking to make an impact?</h3>
              <p className="text-ink/75 mt-3 text-lg font-light max-w-lg">Join us in our upcoming outreach events and prayer sessions. Discover how you can contribute.</p>
            </div>
            <div className="relative z-10 shrink-0">
              <a href="/events" className="btn btn-primary px-8 py-4 shadow-lg hover:shadow-xl">View Events</a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Moments of Joy - Video Showcase */}
      <ScrollReveal animation="up">
        <section>
          <div className="card p-8 sm:p-10 lg:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10 max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-ink tracking-tight sm:text-4xl">Moments of Joy</h2>
              <p className="text-base text-ink/65 mt-3 max-w-xl mx-auto">A glimpse into our heart—connecting, praying, and building a community together.</p>
            </div>
            <div className="max-w-5xl mx-auto relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-brand-primary/20 via-brand-primaryDark/10 to-brand-primary/20 rounded-[32px] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="relative rounded-[28px] overflow-hidden shadow-2xl border border-white/20 aspect-video bg-ink/5">
                <video src={MumVid} className="w-full h-full object-cover" controls autoPlay muted loop playsInline />
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-[28px]" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
      </div>
  )
}
