import { Button } from '../ui/button'
import Link from 'next/link'
import { Star, ShieldCheck, MonitorDown } from 'lucide-react'
  
export default function About() {
    return (
        <section id="about" className='relative py-10 lg:py-16 xl:py-20'>
            <div className="hidden absolute top-0 left-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:left-7.5 xl:left-10" />
            <div className="hidden absolute top-0 right-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:right-7.5 xl:right-10" />
            <div className='flex flex-col md:flex-row max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem]'>
                <div className='flex-1 flex-col flex justify-center items-start'>
                    <h2 className='text-[1.75rem] leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight'>
                        Lorem ipsum dolor, <br className="sm:block hidden" />  ut labore dolore magna
                    </h2>
                    <p className='text-n-3 text-[18px] leading-[30.8px] max-w-[470px] mt-5'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    </p>
            
                    <Button className="hidden lg:flex text-[#06050A] mt-10" asChild>
                        <Link href="/signup">
                            Get Started
                        </Link>
                    </Button>
                </div>

                <div className='flex-1 flex justify-center items-center md:ml-10 ml-0 md:mt-0 mt-10 relative flex-col'>
                    <FeatureCard 
                        icon='star'
                        title='Rewards' 
                        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare metus semper rutrum auctor.'
                    />
                    <FeatureCard 
                        icon='shieldCheck'
                        title='100% Secure' 
                        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar viverra viverra.'
                    />
                    <FeatureCard 
                        icon='MonitorDown'
                        title='Fast Downloads' 
                        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar viverra viverra.'
                    />
                </div> 
            </div>
        </section>
    )
}

type FeatureCardProps = {
    icon: string
    title: string
    content: string
}

export function FeatureCard({
    icon,
    title,
    content,
}: FeatureCardProps) {
    return (
        <div className='flex flex-row p-6'>
            <div className='rounded-xl flex justify-center items-center w-[64px] h-[64px] p-0.5 bg-conic-gradient'>
                {icon === 'star' ? 
                    <Star className="flex items-center justify-center w-full h-full bg-n-7 rounded-xl text-n-1 p-3" /> :
                        icon === 'shieldCheck' ? 
                            <ShieldCheck className="flex items-center justify-center w-full h-full bg-n-7 rounded-xl text-n-1 p-3" /> :
                                <MonitorDown className="flex items-center justify-center w-full h-full bg-n-7 rounded-xl text-n-1 p-3" /> 
                }
            </div>
            <div className="flex-1 flex flex-col ml-3">
                <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
                    {title}
                </h4>
                <p className="font-poppins font-normal text-n-4 text-[16px] leading-[24px]">
                    {content}
                </p>
            </div>
        </div>
    )
}