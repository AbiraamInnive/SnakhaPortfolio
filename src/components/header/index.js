'use client'

import React, { useState, useRef, useEffect } from 'react'
import ThemeToggle from '@components/themeToggle'

export default function Index() {
    const [menuOpen, setMenuOpen] = useState(false)
    const overlayRef = useRef(null)

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
    }

    // Close overlay if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (overlayRef.current && !overlayRef.current.contains(event.target)) {
                setMenuOpen(false)
            }
        }
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [menuOpen])

    return (
        <header className="w-full px-4 sm:px-6 md:px-12 py-6 headerContainer relative z-50">
            <div className="flex items-center justify-between">
                {/* Left: Hamburger & Title */}
                <div className="flex items-center space-x-4">
                    <button
                        className="md:hidden text-3xl focus:outline-none"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        &#9776;
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                            SNAKHA RANJAN
                        </h1>
                        <span className="text-sm sm:text-base md:text-lg block">
                            Architect | Interior Designer | 3D Visualiser
                        </span>
                    </div>
                </div>

                {/* Right: Full nav for desktop */}
                <div className="hidden md:flex ml-auto mr-10 items-center gap-x-10">
                    <span onClick={() => scrollToSection('projects')} className="cursor-pointer text-lg">
                        PROJECTS
                    </span>
                    <span onClick={() => scrollToSection('aboutMe')} className="cursor-pointer text-lg">
                        ABOUT ME
                    </span>
                </div>

                {/* Always visible ThemeToggle */}
                <div className="absolute top-6 right-4 md:static transform scale-[0.7] sm:scale-[0.8] md:scale-[0.9] origin-top-right">
                    <ThemeToggle />
                </div>
            </div>

            {/* Partial-height transparent overlay menu */}
            {
                menuOpen && (
                    <div className="fixed inset-0 bg-black/30 z-40 flex justify-center items-start pt-24">
                        <div
                            ref={overlayRef}
                            className="relative w-[90%] max-w-sm bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-xl text-black"
                        >
                            {/* ✕ Close Icon */}
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="absolute top-2 right-3 text-2xl text-black font-bold"
                                aria-label="Close menu"
                            >
                                &times;
                            </button>

                            {/* Menu Items */}
                            <nav className="flex flex-col space-y-4 mt-6">
                                <span onClick={() => scrollToSection('projects')} className="cursor-pointer text-lg">
                                    PROJECTS
                                </span>
                                <span onClick={() => scrollToSection('aboutMe')} className="cursor-pointer text-lg">
                                    ABOUT ME
                                </span>
                            </nav>
                        </div>
                    </div>
                )
            }
        </header >
    )
}
