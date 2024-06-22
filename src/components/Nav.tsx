'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import { logout } from '@/lib/actions'
import { useSession } from 'next-auth/react'
import { navigation, adminNav, accountNav } from '@/constants/Constants'
import sphere from '../assets/sphere.png'

export function Nav() {
    const { data: session } = useSession()
    const pathname = usePathname()
    const [toggle, setToggle] = useState(false)
    let navItems = []

    if (session?.user) {
        if (session.user.isAdmin) {
            navItems = adminNav
        } else {
            navItems = accountNav
        }
    } else {
        navItems = navigation
    }

    const toggleNav = () => {
        if(toggle) {
            setToggle(false)
        } else {
            setToggle(true)
        }
    }

    return (
        <div
            className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
                toggle ? 'bg-n-8' : 'bg-n-8/90 backdrop-blur-sm'
            }`}
        >
            <div className='flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4'>
                <Link className='block w-[12rem] xl:mr-1' href='/'>
                    <Image src={sphere} width={30} height={30} alt='Logo' />
                </Link>
    
                <nav
                    className={`${
                        toggle ? 'flex' : 'hidden'
                    } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
                >
                    <div className='relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row'>
                        {navItems.map((item) => (
                            item.title === 'Sign Out' ? 
                                (<Button 
                                    className='lg:hidden block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-primary px-6 py-6' 
                                    variant='link' 
                                    onClick={() => {logout(), toggleNav}}
                                >       
                                    Sign Out
                                </Button>) :
                                (<Link
                                    key={item.id}
                                    href={item.url}
                                    onClick={toggleNav}
                                    className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-primary ${
                                        item.onlyMobile ? 'lg:hidden' : ''
                                    } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                                        item.url === pathname
                                        ? 'z-2 lg:text-n-1'
                                        : 'lg:text-n-1/50'
                                    } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                                >
                                    {item.title}
                                </Link>)
                        ))}
                        </div>
    
                    <HamburgerMenu />
                </nav>
    
                {!session?.user ? (
                    <>
                        <Link
                            href='/signup'
                            className='button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block'
                        >
                            Sign Up
                        </Link>
                        <Button 
                            className='hidden lg:flex text-[#06050A]' 
                            asChild
                        >
                            <Link href='/login'>
                                Sign In
                            </Link>
                        </Button> 
                    </>
                ) : (
                    <Button className='hidden lg:flex' variant='outline' onClick={() => logout()}>       
                        Sign Out
                    </Button> 
                )}

                <div className='p-2 border border-primary ml-auto lg:hidden rounded-lg'>
                    {!toggle ? 
                        <Menu
                            className='ml-auto lg:hidden hover:cursor-pointer hover:text-neutral-400 transition-colors'
                            onClick={toggleNav} 
                        /> : 
                        <X  
                            className='ml-auto lg:hidden hover:cursor-pointer hover:text-neutral-400 transition-colors' 
                            onClick={toggleNav}
                        />
                    }
                </div>
            </div>
        </div>      
    )
}

function HamburgerMenu() {
    return (
        <div className='absolute inset-0 pointer-events-none lg:hidden'>
            <div className='absolute top-1/2 left-1/2 w-[51.375rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2'>
                <div className='absolute top-1/2 left-1/2 w-[36.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2'></div>
                <div className='absolute top-1/2 left-1/2 w-[23.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2'></div>
            </div>

            <div className='absolute top-0 left-5 w-0.25 h-full bg-n-6'></div>
            <div className='absolute top-0 right-5 w-0.25 h-full bg-n-6'></div>

            <div className='absolute top-[4.4rem] left-16 w-3 h-3 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full'></div>
            <div className='absolute top-[12.6rem] right-16 w-3 h-3 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full'></div>
            <div className='absolute top-[26.8rem] left-12 w-6 h-6 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full'></div>
        </div>
    )
}