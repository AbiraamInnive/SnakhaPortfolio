'use client'

import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Initialize theme on component mount
    useEffect(() => {
        setMounted(true)
        const savedTheme = localStorage.getItem('darkMode')
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        // Only use system preference if no saved preference exists
        const initialMode = savedTheme !== null
            ? savedTheme === 'true'
            : systemPrefersDark

        setDarkMode(initialMode)
    }, [])

    // Apply theme changes
    useEffect(() => {
        if (!mounted) return

        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('darkMode', 'true')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('darkMode', 'false')
        }
    }, [darkMode, mounted])

    if (!mounted) {
        return (
            <div className="w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700 p-1">
                <div className="w-6 h-6 rounded-full bg-white shadow-md"></div>
            </div>
        )
    }

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative w-16 h-8 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {/* Icons positioned absolutely on the track */}
            <div className="absolute cursor-pointer inset-0 flex items-center justify-between px-2">
                <SunIcon className={`h-5 w-5 text-yellow-500 transition-opacity duration-300 ${darkMode ? 'opacity-100' : 'opacity-0'}`} />
                <MoonIcon className={`h-5 w-5 text-blue-400 transition-opacity duration-300 ${darkMode ? 'opacity-0' : 'opacity-100'}`} />
            </div>

            {/* Thumb with full movement range */}
            <div
                className={`cursor-pointer absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${darkMode ? 'translate-x-8' : 'translate-x-0'
                    }`}
            ></div>
        </button>
    )
}