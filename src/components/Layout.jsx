import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-app">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-ink/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div>
              <div className="text-base font-semibold text-ink">MomCo</div>
              <div className="mt-1 text-sm text-ink/70">Mums connecting through prayer and assisting together.</div>
            </div>
            <div className="flex flex-wrap gap-3 text-sm font-medium">
              <a className="link hover:text-brand-primary" href="/about">About</a>

              <a className="link hover:text-brand-primary" href="/events">Events</a>
              <a className="link hover:text-brand-primary" href="/contact">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-xs text-ink/40 font-semibold uppercase tracking-widest">
            © {new Date().getFullYear()} MomCo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
