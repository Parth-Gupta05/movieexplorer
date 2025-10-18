'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ThemeToggle from '@/components/ThemeToggle'

export default function Navbar() {
  const path = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

useEffect(() => {
  const checkLoginStatus = () => {
    try {
      const userInfo = localStorage.getItem('user')
      if (userInfo) {
        const parsed = JSON.parse(userInfo)
        if (parsed?.email) {
          setIsLoggedIn(true)
          setUserName(parsed.email)
        } else {
          setIsLoggedIn(false)
          setUserName('')
        }
      } else {
        setIsLoggedIn(false)
        setUserName('')
      }
    } catch {
      setIsLoggedIn(false)
      setUserName('')
    }
  }

  setMounted(true)
  checkLoginStatus()

  // listen to localStorage changes (e.g. login/logout in another tab)
  window.addEventListener('storage', checkLoginStatus)

  // custom event listener for same-tab updates
  window.addEventListener('userChange', checkLoginStatus)

  return () => {
    window.removeEventListener('storage', checkLoginStatus)
    window.removeEventListener('userChange', checkLoginStatus)
  }
}, [])


  if (!mounted) return null

  const isActive = (href: string) => (href === '/' ? path === '/' : path.startsWith(href))

  const handleLogout = () => {
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUserName('')
    setIsMobileMenuOpen(false)
    window.location.href = '/auth/login'
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4 justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            onClick={closeMobileMenu}
            className="font-bold text-lg text-slate-900 dark:text-slate-100 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Movie Explorer
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-1 flex-1">
            <Link
              href="/movies"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/movies')
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Scroll Movies
            </Link>
            <Link
              href="/favorites"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/favorites')
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              My Favorites
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* <ThemeToggle/> */}
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-slate-400 dark:bg-slate-600 flex items-center justify-center text-white font-semibold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-medium text-slate-100 bg-red-500 hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/auth/login"
                className="px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div>
          <ThemeToggle/>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="ml-2 md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200 dark:border-slate-700 pt-4">
            <nav className="flex flex-col gap-2">
              <Link
                href="/movies"
                onClick={closeMobileMenu}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive('/movies')
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Scroll Movies
              </Link>
              <Link
                href="/favorites"
                onClick={closeMobileMenu}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive('/favorites')
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                My Favorites
              </Link>
            </nav>

            {/* Mobile Auth */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              {isLoggedIn ? (
                <div className="flex flex-col gap-3">
                  
              
                  <div className="flex items-center gap-3 px-4 py-3 bg-slate-200 dark:bg-slate-700 rounded-lg">
                    
                    <div className="w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-600 flex items-center justify-center text-white font-semibold text-lg">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {userName}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 text-center rounded-lg font-medium text-white bg-red-500 hover:bg-red-600 transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-center border-2 border-slate-300 dark:border-slate-600 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
