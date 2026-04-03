import { useState, useEffect, useRef } from 'react'

const sampleVerses = [
  { text: 'The LORD is my shepherd; I shall not want.', ref: 'Psalm 23:1' },
  { text: 'I can do all things through Christ who strengthens me.', ref: 'Philippians 4:13' },
  { text: 'Trust in the LORD with all your heart.', ref: 'Proverbs 3:5' },
  { text: 'Be strong and courageous. Do not be afraid.', ref: 'Joshua 1:9' },
]

export default function VersesCarousel({ verses = sampleVerses, interval = 5500 }) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % verses.length), interval)
    return () => clearInterval(timerRef.current)
  }, [verses.length, interval])

  function prev() {
    setIndex((i) => (i - 1 + verses.length) % verses.length)
  }
  function next() {
    setIndex((i) => (i + 1) % verses.length)
  }

  return (
    <div className="relative max-w-4xl mx-auto group">
      <div className="overflow-hidden rounded-[32px] bg-white/40 backdrop-blur-sm border border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative min-h-[340px] md:min-h-[380px] flex items-center">
        {verses.map((v, i) => (
          <div 
            key={i} 
            className={`absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16 text-center transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
              i === index ? 'opacity-100 translate-x-0 scale-100 z-10' : 'opacity-0 translate-x-12 scale-95 z-0'
            }`}
          >
            <div className="absolute top-12 left-12 text-brand-primary/10 opacity-20 pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
            </div>
            
            <div className="relative z-10 w-full">
              <blockquote className="text-2xl md:text-3xl lg:text-4xl text-ink font-serif font-medium leading-snug tracking-tight italic">
                “{v.text}”
              </blockquote>
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="h-0.5 w-12 bg-linear-to-r from-transparent via-brand-primary/40 to-transparent" />
                <cite className="text-sm font-bold text-brand-primary uppercase tracking-[0.2em] not-italic">
                  {v.ref}
                </cite>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Controls */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none z-20">
          <button 
            onClick={prev} 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-ink/40 hover:text-brand-primary transition-all shadow-md pointer-events-auto border border-ink/5 translate-x-[-10%] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 duration-500"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button 
            onClick={next} 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-ink/40 hover:text-brand-primary transition-all shadow-md pointer-events-auto border border-ink/5 translate-x-[10%] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 duration-500"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>

      <div className="mt-8 flex gap-3 justify-center items-center">
        {verses.map((v, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)} 
            className={`h-1.5 rounded-full transition-all duration-700 ${i === index ? 'w-10 bg-brand-primary' : 'w-2 bg-brand-primary/20 hover:bg-brand-primary/40'} cursor-pointer`} 
          />
        ))}
      </div>
    </div>
  )
}
