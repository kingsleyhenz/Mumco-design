import { useCallback, useEffect, useState } from 'react'

const sampleImages = [
  'https://images.unsplash.com/photo-1508873699372-7ae0f5540f8b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a2b3c',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2b3c4d',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3c4d5e',
  'https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4d5e6f',
  'https://images.unsplash.com/photo-1488747279002-c8523379faaa?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5e6f7g',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6f7g8h',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7g8h9i',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=8h9i0j',
]

function shuffleArray(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Gallery() {
  const [images, setImages] = useState(sampleImages)
  const [cols, setCols] = useState(3)
  const [modalIndex, setModalIndex] = useState(-1)

  function shuffle() {
    setImages((cur) => shuffleArray(cur))
  }

  function cycleCols() {
    setCols((c) => (c === 3 ? 2 : 3))
  }

  function openModal(i) {
    setModalIndex(i)
  }

  function closeModal() {
    setModalIndex(-1)
  }

  const prev = useCallback(() => {
    setModalIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])
  const next = useCallback(() => {
    setModalIndex((i) => (i + 1) % images.length)
  }, [images.length])

  // keyboard navigation when modal open
  useEffect(() => {
    function onKey(e) {
      if (modalIndex === -1) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalIndex, prev, next])

  return (
    <div>
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-ink/5">
        <div className="flex gap-3">
          <button onClick={shuffle} className="btn btn-primary py-2 px-4 text-sm font-semibold flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
            Shuffle
          </button>
          <button onClick={cycleCols} className="hidden sm:flex btn btn-secondary py-2 px-4 text-sm font-semibold items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
            Columns: {cols}
          </button>
        </div>
        <div className="text-sm font-medium text-ink/50 uppercase tracking-widest hidden sm:block">Tap an image to enlarge</div>
      </div>

      <div className={`columns-1 ${cols === 3 ? 'sm:columns-3' : 'sm:columns-2'} gap-6 w-full`}>
        {images.map((src, i) => (
          <article key={i} className="break-inside-avoid gallery-card group relative cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 mb-6" tabIndex={0} role="button" onClick={() => openModal(i)} onKeyDown={(e) => e.key === 'Enter' && openModal(i)}>
            <img src={src} alt={`gallery-${i}`} className="gallery-img w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
              </div>
            </div>
          </article>
        ))}
      </div>

      {modalIndex > -1 && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-lg p-2 sm:p-8 animate-in fade-in duration-200" role="dialog" aria-modal="true" onClick={closeModal}>
          <button className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white hover:text-black transition-colors z-110" onClick={closeModal} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-110 w-12 h-12 hidden sm:flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white hover:text-black transition-colors shadow-xl">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-110 w-12 h-12 hidden sm:flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white hover:text-black transition-colors shadow-xl">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <div className="relative w-full max-w-7xl flex items-center justify-center h-full max-h-[90vh] sm:max-h-[85vh] px-2 sm:px-16" onClick={(e) => e.stopPropagation()}>
            <img src={images[modalIndex]} alt={`gallery-large-${modalIndex}`} className="w-auto max-w-full h-auto max-h-full object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-300 m-auto" />
          </div>
            
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 sm:hidden z-110">
            <button onClick={(e) => { e.stopPropagation(); prev() }} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-colors shadow-xl">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button onClick={(e) => { e.stopPropagation(); next() }} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-colors shadow-xl">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
