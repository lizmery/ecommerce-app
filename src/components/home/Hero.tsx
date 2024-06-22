'use client'

import { Button } from '../ui/button'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import hero from '../../assets/hero.jpg'
import stars from '../../assets/svg/stars.svg'

export default function Hero() {
    const parallaxRef = useRef(null)

    return (
        <section
            id='hero'
            className='relative pt-[12rem] -mt-[5.25rem]'
        >  
            <div className="hidden absolute top-0 left-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:left-7.5 xl:left-10" />
            <div className="hidden absolute top-0 right-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:right-7.5 xl:right-10" />

                <div className="max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] relative" ref={parallaxRef}>
                    <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
                        <h1 className="font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem] mb-6">
                            Discover the World of Hassle-Free Icons with {` `}
                            <span className="relative">
                                NameHere{" "}
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#F3CD82] via-[#79F6E3] to-[#DF76EC] rounded-full"></span>
                            </span>
                        </h1>
                        <p className="text-[0.875rem] leading-[1.5rem] md:text-[1rem] md:leading-[1.75rem] lg:text-[1.25rem] lg:leading-8 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <Button asChild className='text-[#06050A]'>
                            <Link href="/signup">
                                Get Started
                            </Link>
                        </Button>
                    </div>

                    <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
                        <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
                            <div className="relative bg-n-8 rounded-[1rem]">
                                <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
                                <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                                    <Image
                                        src={hero}
                                        alt='Hero'
                                        className=' brightness-75 w-full  scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]'
                                    />
                                </div>
                            </div>
                            <div className="relative z-1 h-6 mx-2.5 bg-n-11 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-8" />
                            <div className="relative z-1 h-6 mx-6 bg-n-11/70 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-20" />
                        </div>
                        <div className="absolute -top-[54%] left-1/2 w-[100%] sm:w-[150%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
                            <Image
                                src={stars}
                                className="w-full"
                                width={950}
                                height={400}
                                alt="Stars"
                            />
                        </div>
                    </div>

                    <div className='relative z-10 hidden lg:block'>
                        <ul className="flex divide-x divide-stroke-1 ">
                            <li className="flex items-center justify-center flex-1 h-[8.5rem] font-grotesk font-light tracking-tagline uppercase mb-2 text-center text-n-1/50">
                                <span className='text-2xl mr-2 font-bold text-white'>300k</span>
                                <h5 className='text-color-orange'>Downloads</h5>
                            </li>
                            <li className="flex items-center justify-center flex-1 h-[8.5rem] font-grotesk font-light tracking-tagline uppercase mb-2 text-center text-n-1/50">
                                <span className='text-2xl mr-2 font-bold text-white'>230+</span>
                                <h5 className='text-color-green'>Trusted By Company</h5>
                            </li>
                            <li className="flex items-center justify-center flex-1 h-[8.5rem] font-grotesk font-light tracking-tagline uppercase mb-2 text-center text-n-1/50">
                                <span className='text-2xl mr-2 font-bold text-white'>150+</span>
                                <h5 className='text-color-purple'>Options</h5>
                            </li>
                        </ul>
                    </div>
                </div>
              
                <div className="hidden absolute top-[55.25rem] left-10 right-10 h-0.25 bg-stroke-1 pointer-events-none xl:block" />
        </section>
    )
}
