import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import brackets from '@/assets/svg/Brackets'
import stars from '../../assets/svg/stars.svg'
import Image from 'next/image'

export default function Contact() {
    return (
        <section id="contact" className="relative py-10 lg:py-16 xl:py-20">
            <div className='hidden absolute top-0 left-7.5 right-7.5 h-0.25 bg-stroke-1 lg:block xl:left-10 xl:right-10' />
            <div className="hidden absolute top-0 left-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:left-7.5 xl:left-10" />
            <div className="hidden absolute top-0 right-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:right-7.5 xl:right-10" />
            <div className="max-w-[77.5rem] mx-auto px-1 md:px-10 lg:px-15 xl:max-w-[87.5rem] flex flex-col lg:flex-row items-center justify-center">
                <div className="max-w-[25rem]">
                    <div className='font-grotesk font-light text-xs tracking-tagline uppercase flex mb-4 justify-center lg:text-justify lg:justify-start'>
                        {brackets("left")}
                            <div className='mx-3 text-n-3 mb-4 flex items-center text-center justify-center'>Get in touch</div>
                        {brackets("right")}
                    </div>
                    <h2 className="text-[1.75rem] leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight mb-4 md:mb-8 text-center">
                        Contact Us
                    </h2>
                    <div className="absolute top-1/2 lg:top-[60%] left-[2.3rem] xl:left-[3rem] w-[20rem] xl:w-[52rem] -translate-y-1/2 pointer-events-none rotate-180">
                        <Image
                        src={stars}
                        className="w-full"
                        width={950}
                        height={400}
                        alt="Stars"
                        />
                    </div>
                </div>
    
                <div className="lg:ml-auto xl:w-[38rem] mt-4 w-3/4 border-stroke-1 border p-0.5 rounded-2xl bg-n-8 z-2">
                    <div className='p-5 md:p-10 lg:p-20 rounded-2xl'>
                        <form className='space-y-8'>
                            <div className='space-y-2'>
                                <Label htmlFor='name'>Name</Label>
                                    <Input 
                                        type='text'
                                        id='name'
                                        name='name'
                                        required
                                        className='bg-n-5 border-0'
                                    />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='priceInCents'>Email</Label>
                                    <Input 
                                        type='email'
                                        id='priceInCents'
                                        name='priceInCents'
                                        required
                                        className='bg-n-5 border-0'
                                    />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='description'>Message</Label>
                                    <Textarea
                                        id='description'
                                        name='description'
                                        required
                                        className='bg-n-5 border-0'
                                    />
                            </div>
                            <Button asChild size='lg' className='w-full text-n-8 pb-2'>
                                <Link href=''>Send</Link>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}