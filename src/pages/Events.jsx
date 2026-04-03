import { useState, useEffect, useCallback } from 'react'
import api from '../api'
import toast from 'react-hot-toast'
import ScrollReveal from '../components/ScrollReveal'

export default function Events() {
  const [events, setEvents] = useState([])
  const [form, setForm] = useState({ id: '', title: '', date: '', description: '', media: [] })
  const [isEditing, setIsEditing] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [modalData, setModalData] = useState({ items: [], index: -1 })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchEvents = useCallback(async () => {
    try {
      const response = await api.get('/events')
      const data = response.data?.data || response.data
      const normalizedData = (Array.isArray(data) ? data : []).map(event => ({
        ...event,
        media: [
          ...(event.images || []).map(url => ({ url, type: 'image' })),
          ...(event.videos || []).map(url => ({ url, type: 'video' }))
        ]
      }))
      setEvents(normalizedData)
    } catch (err) {
      console.error('Fetch error:', err)
      toast.error('Failed to load events')
    }
  }, [])

  useEffect(() => {
    fetchEvents()
    setIsAuthenticated(!!localStorage.getItem('mumco_token'))
  }, [fetchEvents])

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    const newMedia = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image'
    }))
    setForm(prev => ({ ...prev, media: [...prev.media, ...newMedia] }))
  }

  const removeMedia = (index) => {
    setForm(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('eventDate', form.date)
      formData.append('description', form.description)

      // Handle files vs existing URLs
      form.media.forEach(item => {
        if (item.file) {
          formData.append('files', item.file)
        } else if (item.url) {
          // Send existing URLs to the 'images' or 'videos' arrays in the DTO
          const field = item.type === 'video' ? 'videos' : 'images'
          formData.append(field, item.url)
        }
      })

      if (isEditing) {
        await api.patch(`/events/${form.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Event updated successfully!')
      } else {
        await api.post('/events', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Event created successfully!')
      }
      
      cancelEdit()
      fetchEvents()
    } catch (err) {
      console.error('Submit error:', err)
      toast.error(err.response?.data?.message || 'Failed to save event')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (event) => {
    setForm({
      id: event.id,
      title: event.title,
      date: (event.eventDate || '').split('T')[0],
      description: event.description,
      media: event.media || []
    })
    setIsEditing(true)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return
    try {
      await api.delete(`/events/${id}`)
      toast.success('Event deleted')
      fetchEvents()
    } catch (err) {
      toast.error('Failed to delete event')
    }
  }

  const cancelEdit = () => {
    setForm({ id: '', title: '', date: '', description: '', media: [] })
    setIsEditing(false)
    setShowForm(false)
  }

  const handleShare = (event) => {
    const text = `Check out this MumCo event: ${event.title}\n${event.description}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const openModal = (items, index) => setModalData({ items, index })
  const closeModal = () => setModalData({ items: [], index: -1 })
  const nextMedia = () => setModalData(prev => ({ ...prev, index: (prev.index + 1) % prev.items.length }))
  const prevMedia = () => setModalData(prev => ({ ...prev, index: (prev.index - 1 + prev.items.length) % prev.items.length }))

  const getBentoClass = (index, total) => {
    if (total === 1) return 'md:col-span-4 md:row-span-2'
    if (total === 2) return 'md:col-span-2 md:row-span-2'
    if (index === 0) return 'md:col-span-2 md:row-span-2'
    if (index === 1 && total > 2) return 'md:col-span-2 md:row-span-1'
    return 'md:col-span-1 md:row-span-1'
  }

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-500">
      {/* Header Section */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-ink/5 glass overflow-hidden relative p-8 sm:p-12 lg:p-16 text-center">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(193,140,122,.1), transparent 40%), radial-gradient(circle at 90% 80%, rgba(44,39,36,.05), transparent 40%)' }} />
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-ink/10 px-4 py-1.5 text-[10px] font-bold text-ink/70 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              Our Impact
            </div>
            <h1 className="mt-6 text-3xl md:text-5xl font-extrabold text-ink tracking-tight leading-tight">Events Record</h1>
            {isAuthenticated && (
              <div className="mt-8">
                <button 
                  onClick={() => { if (showForm) cancelEdit(); else setShowForm(true); }} 
                  className="btn btn-primary px-8 py-3.5 shadow-lg hover:shadow-xl active:scale-95 transition-all text-base font-bold"
                >
                  {showForm ? 'Close Editor' : 'Add New Event'}
                </button>
              </div>
            )}
          </div>
        </section>
      </ScrollReveal>

      {/* Form Section (Editor) */}
      {showForm && (
        <ScrollReveal animation="up">
          <section className="max-w-3xl mx-auto card p-6 sm:p-8 relative overflow-hidden bg-white shadow-xl">
            <h2 className="text-2xl font-bold text-ink mb-6">{isEditing ? 'Edit Event' : 'New Event Record'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-ink/40 uppercase tracking-widest ml-1">Title</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-app border border-ink/10 rounded-xl text-ink font-semibold focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all text-sm"
                    placeholder="Event Name"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-ink/40 uppercase tracking-widest ml-1">Date</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 bg-app border border-ink/10 rounded-xl text-ink font-semibold focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all text-sm"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4 p-6 rounded-2xl bg-app/50 border border-ink/5">
                <label className="text-xs font-bold text-ink/40 uppercase tracking-widest ml-1 block">Gallery Content</label>
                <div className="flex flex-wrap gap-3">
                  {form.media.map((m, idx) => (
                    <div key={idx} className="relative group/edit-media w-24 h-24 shrink-0">
                      <div className="w-full h-full rounded-xl overflow-hidden shadow-sm border border-ink/10">
                        {m.type === 'video' ? (
                          <div className="w-full h-full bg-ink/5 flex flex-col gap-1 items-center justify-center text-ink/40">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                             <span className="text-[10px] font-bold tracking-wider">VIDEO</span>
                          </div>
                        ) : (
                          <img src={m.url} className="w-full h-full object-cover" alt="" />
                        )}
                      </div>
                      <button type="button" onClick={() => removeMedia(idx)} className="absolute -top-2 -right-2 w-7 h-7 bg-white flex items-center justify-center rounded-full text-red-500 border border-ink/10 shadow-md hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 z-10">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    </div>
                  ))}
                </div>
                <label className="flex flex-col items-center justify-center w-full px-4 py-8 border-2 border-dashed border-ink/15 rounded-xl cursor-pointer bg-white/40 hover:bg-white transition-all hover:border-brand-primary/50 group mt-4">
                  <div className="w-12 h-12 mb-3 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  </div>
                  <p className="text-sm font-bold text-ink"><span className="text-brand-primary">Click to select</span> an image or video</p>
                  <p className="text-xs text-ink/40 mt-1 font-medium">Any local file</p>
                  <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileSelect} />
                </label>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink/40 uppercase tracking-widest ml-1">Narrative</label>
                <textarea
                  required rows="3"
                  className="w-full px-4 py-3 bg-app border border-ink/10 rounded-xl text-ink text-sm focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all resize-none"
                  placeholder="Brief description..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                ></textarea>
              </div>
              
              <div className="flex items-center gap-6 pt-4 border-t border-ink/5">
                <button type="submit" disabled={isSubmitting} className="btn btn-primary px-8 py-3 text-sm font-bold flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Saving...
                    </>
                  ) : (
                    isEditing ? 'Update' : 'Save Event'
                  )}
                </button>
                <button type="button" onClick={cancelEdit} disabled={isSubmitting} className="text-ink/30 text-xs font-bold hover:text-ink transition-colors disabled:opacity-50">CANCEL</button>
              </div>
            </form>
          </section>
        </ScrollReveal>
      )}

      {/* Events Feed Section */}
      <section className="space-y-24 max-w-6xl mx-auto px-4">
        {events.length === 0 ? (
          <ScrollReveal>
            <div className="py-20 text-center card bg-white flex flex-col items-center justify-center border-dashed border-2 border-ink/10">
              <h3 className="text-xl font-bold text-ink">No events recorded yet</h3>
            </div>
          </ScrollReveal>
        ) : (
          events.map((event) => (
            <ScrollReveal key={event.id} animation="up">
              <div className="animate-in fade-in duration-700">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-l-4 border-brand-primary pl-6">
                  <div className="space-y-2">
                    <span className="py-1 px-3 bg-brand-primary/10 text-brand-primary font-bold text-[10px] rounded-full uppercase tracking-widest">
                      {event.eventDate ? new Date(event.eventDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : 'Date TBD'}
                    </span>
                    <h2 className="text-2xl font-bold text-ink tracking-tight leading-tight">{event.title}</h2>
                    <p className="text-sm text-ink/70 font-light leading-relaxed max-w-3xl break-words break-all sm:break-normal">{event.description}</p>
                  </div>
                  {isAuthenticated && (
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleShare(event)} className="w-10 h-10 rounded-full bg-white border border-ink/5 text-green-600 hover:bg-green-50 flex items-center justify-center transition-all shadow-sm" title="Share Activity"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg></button>
                      <button onClick={() => handleEdit(event)} className="w-10 h-10 rounded-full bg-white border border-ink/5 text-brand-primary hover:bg-brand-primary/5 flex items-center justify-center transition-all shadow-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></button>
                      <button onClick={() => handleDelete(event.id)} className="w-10 h-10 rounded-full bg-white border border-ink/5 text-red-500 hover:bg-red-50 flex items-center justify-center transition-all shadow-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                    </div>
                  )}
                </div>

                {/* Event Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px] w-full">
                  {(event.media || []).map((item, midx) => (
                    <div 
                      key={midx} 
                      className={`group relative rounded-[20px] overflow-hidden bg-app shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer ${getBentoClass(midx, (event.media || []).length)} hover:-translate-y-1`} 
                      onClick={() => openModal(event.media, midx)}
                    >
                       {item.type === 'video' ? (
                         <video src={item.url} className="absolute inset-0 w-full h-full object-cover" controls onClick={e => e.stopPropagation()} />
                       ) : (
                         <img src={item.url} className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" alt="" loading="lazy" />
                       )}
                       <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-300 flex items-center justify-center z-10">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform shadow-lg">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))
        )}
      </section>

      {/* Screen-centered Modal Viewer */}
      {modalData.index > -1 && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-lg p-2 sm:p-8 animate-in fade-in duration-200" role="dialog" aria-modal="true" onClick={closeModal}>
          <button className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white hover:text-black transition-colors z-110" onClick={closeModal} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <button onClick={(e) => { e.stopPropagation(); prevMedia() }} className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-110 w-12 h-12 hidden sm:flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white hover:text-black transition-colors shadow-xl">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button onClick={(e) => { e.stopPropagation(); nextMedia() }} className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-110 w-12 h-12 hidden sm:flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white hover:text-black transition-colors shadow-xl">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <div className="relative w-full max-w-7xl flex items-center justify-center h-full max-h-[90vh] sm:max-h-[85vh] px-2 sm:px-16" onClick={(e) => e.stopPropagation()}>
            {modalData.items[modalData.index].type === 'video' ? (
               <video src={modalData.items[modalData.index].url} className="w-auto max-w-full h-auto max-h-full object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-300 m-auto" controls autoPlay />
            ) : (
               <img src={modalData.items[modalData.index].url} alt="view-large" className="w-auto max-w-full h-auto max-h-full object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-300 m-auto" />
            )}
          </div>
            
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 sm:hidden z-110">
            <button onClick={(e) => { e.stopPropagation(); prevMedia() }} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-colors shadow-xl">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextMedia() }} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-colors shadow-xl">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
