import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { pathname } = useLocation()
  const menuRef = useRef(null)

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('mumco_token'))
  }, [pathname]) // Re-check on navigation

  useEffect(() => {
    function onDoc(e) {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [open])

  const handleLogout = () => {
    localStorage.removeItem('mumco_token')
    localStorage.removeItem('mumco_user')
    window.location.href = '/'
  }

  const links = [
    { to: '/', label: 'Home' },
    { to: '/events', label: 'Events' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  const NavItem = ({ to, label }) => {
    const active = pathname === to || (to === '/' && pathname === '/')
    return (
      <Link
        to={to}
        className={`nav-pill px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${active ? 'bg-brand-primary text-brand-surface shadow-md scale-100' : 'text-brand-primary/80 hover:text-brand-primaryDark hover:bg-brand-primary/5 hover:scale-[1.02]'}`}
        onClick={() => setOpen(false)}
      >
        {label}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-40 glass border-b border-ink/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="logo-badge flex items-center justify-center rounded-2xl w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-primaryDark text-brand-surface shadow-lg transition-transform group-hover:scale-105 shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-100">
                <path d="M12 2C13.7 6.7 20 8 20 13c0 5-6 9-8 9s-8-4-8-9c0-5 6.3-6.3 8-11z" fill="currentColor" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-[17px] sm:text-lg font-bold text-ink tracking-tight">MomCo</div>
              <div className="hidden sm:block text-[13px] font-medium text-ink/60 mt-0.5">Mums connecting • Prayer • Outreach</div>
            </div>
          </Link>

          <nav className="hidden md:flex md:items-center md:space-x-3">
            {links.map((l) => (
              <NavItem key={l.to} to={l.to} label={l.label} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="hidden md:inline-flex px-5 py-2.5 rounded-xl border border-red-500/10 text-red-500 font-bold text-xs hover:bg-red-50 transition-colors uppercase tracking-widest"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="hidden md:inline-flex btn btn-primary text-sm py-2.5 px-6 rounded-xl shadow-lg">
                Login
              </Link>
            )}

            <button
              className="md:hidden p-2 rounded-xl text-ink/85 hover:bg-white/70 border border-ink/10"
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div ref={menuRef} className={`md:hidden ${open ? 'mobile-panel-open' : 'mobile-panel-closed'}`}>
        <div className="px-4 pb-5 pt-3 space-y-2 bg-app/95 backdrop-blur border-t border-ink/10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="block px-4 py-3 rounded-xl text-ink font-medium bg-white/40 hover:bg-white/70 border border-ink/10"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2">
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="block w-full py-3 rounded-xl text-red-500 font-bold border border-red-500/10 bg-red-50/50"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="block w-full text-center btn btn-primary rounded-xl" onClick={() => setOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
