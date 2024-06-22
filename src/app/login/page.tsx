'use client'

import { PageHeader } from '../../components/PageHeader'
import Image from 'next/image'
import sphere from '../../assets/sphere.png'
import stars from '../../assets/svg/stars.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '@/lib/actions'
import Link from 'next/link'

// TODO:
//////// FUTURE: add 'forgot password' link & ad logic to handle sending forgot password email

export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined)

    return (
        <section className='h-screen'>
            <div className='flex flex-col md:flex-row lg:divide-x lg:divide-stroke-1 h-full'>
                <div className='flex-1 flex-col flex justify-center items-center w-full content-center px-5 lg:px-10 xl:px-30'>
                    <PageHeader>Login</PageHeader>
                    <form className='space-y-8 pt-8 w-full xl:max-w-[40rem]' action={dispatch}>
                        <div className='space-y-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input 
                                type='email'
                                id='email'
                                name='email'
                                required
                                className='bg-n-5 border-none'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='password'>Password</Label>
                            <Input 
                                type='password'
                                id='password'
                                name='password'
                                required
                                className='bg-n-5 border-none'
                            />
                        </div>

                        <LoginButton />
                        {errorMessage && <div className='text-destructive text-center'>{errorMessage}</div>}
                        
                        <p className='text-center text-n-1/50'>
                            {"Don't have an account?"}
                            <Link href='/signup' className='pl-2'>
                                <b>Sign Up</b>
                            </Link>
                        </p>
                    </form>
                </div>

                <div className='flex-1 hidden lg:flex justify-center items-center px-5 md:mt-0 mt-10 relative flex-col content-center w-full'>
                    <div className='hidden relative justify-center lg:flex'>
                        <Image
                            src={sphere}
                            className='z-1'
                            width={255}
                            height={255}
                            alt='Sphere'
                        />
                        <div className='absolute top-1/2 left-1/2 w-[30rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none'>
                            <Image
                                src={stars}
                                className='w-full'
                                width={900}
                                height={400}
                                alt='Stars'
                            />
                        </div>
                    </div>
                </div> 
            </div> 
        </section>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <Button type='submit' disabled={pending} className='text-n-8 w-full'>
            Login
        </Button>
    )
}