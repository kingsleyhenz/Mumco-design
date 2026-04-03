import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('mumco_token'))
  }, [pathname])

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

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
    const active = pathname === to
    return (
      <Link
        to={to}
        className={`nav-pill px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${active ? 'bg-brand-primary text-white shadow-md' : 'text-ink/70 hover:text-ink hover:bg-brand-primary/5'}`}
      >
        {label}
      </Link>
    )
  }

  return (
    <>
      {/* Backdrop to close menu on tap outside */}
      {open && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <header className="sticky top-0 z-40 glass border-b border-ink/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="logo-badge flex items-center justify-center rounded-2xl w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-primaryDark text-white shadow-lg transition-transform group-hover:scale-105 shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C13.7 6.7 20 8 20 13c0 5-6 9-8 9s-8-4-8-9c0-5 6.3-6.3 8-11z" fill="currentColor" />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="text-[17px] sm:text-lg font-bold text-ink tracking-tight">MomCo</div>
                <div className="hidden sm:block text-[13px] font-medium text-ink/60 mt-0.5">Mums connecting • Prayer • Outreach</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex md:items-center md:space-x-3">
              {links.map((l) => (
                <NavItem key={l.to} to={l.to} label={l.label} />
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* Desktop auth button */}
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

              {/* Mobile hamburger — isolated, no doc listener conflict */}
              <button
                type="button"
                className="md:hidden relative z-50 flex items-center justify-center w-11 h-11 rounded-xl bg-white/60 border border-ink/10 text-ink shadow-sm active:scale-95"
                style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen((s) => !s)
                }}
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className={`md:hidden ${open ? 'mobile-panel-open' : 'mobile-panel-closed'}`}>
          <div className="px-4 pb-5 pt-3 space-y-2 bg-app/98 backdrop-blur border-t border-ink/10">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="block px-4 py-3.5 rounded-xl text-ink font-medium bg-white/50 hover:bg-white border border-ink/8 text-sm"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-3.5 rounded-xl text-red-500 font-bold border border-red-500/10 bg-red-50/50 text-sm"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block w-full text-center btn btn-primary rounded-xl"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
