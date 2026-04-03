import ScrollReveal from '../components/ScrollReveal'

export default function About() {
  return (
    <div className="space-y-12 pb-12">
      <ScrollReveal>
        <section className="rounded-[32px] border border-ink/5 glass overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(193,140,122,.15), transparent 40%), radial-gradient(circle at 90% 80%, rgba(44,39,36,.08), transparent 40%)' }} />
          <div className="relative px-8 py-20 sm:px-12 sm:py-24 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-12">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white/80 border border-ink/10 px-4 py-1.5 text-xs font-bold text-ink/80 tracking-wide uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                Our story
              </div>
              <h1 className="mt-6 text-5xl md:text-7xl font-extrabold text-ink leading-[1.1] tracking-tight">About MomCo</h1>
              <p className="mt-8 text-xl md:text-2xl text-ink/70 max-w-3xl font-light leading-relaxed">
                We're a group of mums who connect and assist each other through prayer, while actively contributing to help our local community.
              </p>

              <div className="mt-12 flex flex-wrap gap-4">
                <a href="/events" className="btn btn-primary px-10 py-4 shadow-lg">Our Events</a>
                <a href="/contact" className="btn btn-secondary px-10 py-4 shadow-md">Get involved</a>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal animation="up" className="h-full">
            <div className="card-subtle p-8 sm:p-10 group hover:-translate-y-2 transition-transform duration-300 h-full">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm border border-ink/5 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-ink tracking-tight">Prayer</h3>
              <p className="mt-3 text-base text-ink/70 leading-relaxed">Uplifting each other through consistent prayer, standing together through motherhood's challenges.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="up" className="h-full">
            <div className="card-subtle p-8 sm:p-10 group hover:-translate-y-2 transition-transform duration-300 h-full">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm border border-ink/5 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-ink tracking-tight">Community</h3>
              <p className="mt-3 text-base text-ink/70 leading-relaxed">Building deep, lasting friendships with other mums who understand the journey.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="up" className="h-full">
            <div className="card-subtle p-8 sm:p-10 group hover:-translate-y-2 transition-transform duration-300 h-full">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm border border-ink/5 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-ink tracking-tight">Outreach</h3>
              <p className="mt-3 text-base text-ink/70 leading-relaxed">Organizing drives and pooling resources to support families in need.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

