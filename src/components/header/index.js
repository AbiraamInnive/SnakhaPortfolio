'use client'
import React from 'react'
import ThemeToggle from '@components/themeToggle'

export default function index() {
    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div className='headerContainer p-8 px-30 m-auto flex'>
            <span className='w-1/2 text-4xl'>SNAKHA RANJAN<span className='ml-10 text-lg'> Architect | Interior Designer | 3D Visualiser</span></span>

            <div className='w-1/2 flex space-x-10 items-end justify-end'>
                <span onClick={() => scrollToSection('projects')} className='cursor-pointer'>PROJECTS</span>
                {/* <span>Clients</span> */}
                <span onClick={() => scrollToSection('aboutMe')} className='cursor-pointer'>ABOUT ME</span>
                <ThemeToggle />
            </div>
        </div>
    )
}
