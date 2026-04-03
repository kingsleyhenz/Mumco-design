import { useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'

export default function Contact() {
  const [copied, setCopied] = useState('')

  async function copy(text, label) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(label)
      setTimeout(() => setCopied(''), 1800)
    } catch {
      setCopied('error')
      setTimeout(() => setCopied(''), 1800)
    }
  }

  const phone = '+1 (555) 123-4567'
  const whatsapp = '+15551234567'
  const email = 'info@momco.org'

  return (
    <div className="py-12 max-w-4xl mx-auto">
      <ScrollReveal>
        <section className="rounded-[40px] border border-ink/5 glass p-10 sm:p-16 overflow-hidden relative text-center">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(193,140,122,.1), transparent 40%), radial-gradient(circle at 90% 80%, rgba(44,39,36,.05), transparent 40%)' }} />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/80 border border-ink/10 px-5 py-2 text-xs font-bold text-ink/80 tracking-wide uppercase shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              We're here for you
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-ink leading-[1.1] tracking-tight mb-6">Get in touch</h1>
            <p className="text-xl text-ink/70 max-w-2xl leading-relaxed font-light mb-12">
              Have questions, prayer requests, or want to join our next outreach? 
              Reach out via any of these channels. We'd love to connect!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
              {/* Phone */}
              <ScrollReveal animation="up" className="h-full">
                <div className="card p-8 flex flex-col items-center group h-full">
                  <div className="w-14 h-14 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <h3 className="font-bold text-ink mb-2">Phone</h3>
                  <p className="text-sm text-muted mb-6">{phone}</p>
                  <div className="flex gap-2 w-full mt-auto">
                    <button onClick={() => copy(phone, 'Phone')} className="flex-1 btn btn-secondary py-2 px-3 text-xs rounded-xl">Copy</button>
                    <a href={`tel:${phone.replace(/[^+0-9]/g, '')}`} className="flex-1 btn btn-primary py-2 px-3 text-xs rounded-xl">Call</a>
                  </div>
                </div>
              </ScrollReveal>

              {/* WhatsApp */}
              <ScrollReveal animation="up" className="h-full">
                <div className="card p-8 flex flex-col items-center group h-full">
                  <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  </div>
                  <h3 className="font-bold text-ink mb-2">WhatsApp</h3>
                  <p className="text-sm text-muted mb-6">{`+${whatsapp.replace(/[^0-9]/g, '')}`}</p>
                  <div className="flex gap-2 w-full mt-auto">
                    <button onClick={() => copy(whatsapp, 'WhatsApp')} className="flex-1 btn btn-secondary py-2 px-3 text-xs rounded-xl">Copy</button>
                    <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="flex-1 btn btn-primary py-2 px-3 text-xs rounded-xl bg-green-600! shadow-green-600/20!">Message</a>
                  </div>
                </div>
              </ScrollReveal>

              {/* Email */}
              <ScrollReveal animation="up" className="h-full">
                <div className="card p-8 flex flex-col items-center group h-full">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <h3 className="font-bold text-ink mb-2">Email</h3>
                  <p className="text-sm text-muted mb-6">{email}</p>
                  <div className="flex gap-2 w-full mt-auto">
                    <button onClick={() => copy(email, 'Email')} className="flex-1 btn btn-secondary py-2 px-3 text-xs rounded-xl">Copy</button>
                    <a href={`mailto:${email}`} className="flex-1 btn btn-primary py-2 px-3 text-xs rounded-xl bg-blue-600! shadow-blue-600/20!">Email</a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {copied && (
              <div className="mt-12 py-2.5 px-6 bg-brand-primary/10 text-brand-primary text-sm font-bold rounded-full animate-in fade-in slide-in-from-bottom-2" role="status">
                 {copied === 'error' ? 'Copy failed' : `${copied} copied successfully`}
              </div>
            )}
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
