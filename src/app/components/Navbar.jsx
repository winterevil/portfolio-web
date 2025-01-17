"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import NavLink from './NavLink'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import MenuOverlay from './MenuOverlay'
import Image from 'next/image'

const navLinks = [
    {
        path: "/#about",
        title: "About"
    },
    {
        path: "/#projects",
        title: "Projects"
    },
    {
        path: "/#contact",
        title: "Contact"
    },
    {
        path: "/github",
        title: "Search"
    }
]

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false)

    return (
        <nav className='fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100'>
            <div className='flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2'>
                <Link href={"/#home"} className="text-2xl md:text-5xl text-white font-semibold">
                    <Image src="/images/logo.png" width={80} height={80} alt="logo"></Image>
                </Link>
                <div className="mobile-menu block md:hidden">
                    {
                        !navbarOpen ? (
                            <button onClick={() => setNavbarOpen(true)} className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'><Bars3Icon className='h-5 w-5'></Bars3Icon></button>
                        ) : (
                            <button onClick={() => setNavbarOpen(false)} className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'><XMarkIcon className='h-5 w-5'></XMarkIcon></button>
                        )
                    }
                </div>
                <div className="menu hidden md:block md:w-auto" id="navbar">
                    <ul className='flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0'>
                        {
                            navLinks.map((link, id) => {
                                return (
                                    <li key={id}>
                                        <NavLink href={link.path} title={link.title} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
        </nav>
    )
}

export default Navbar
