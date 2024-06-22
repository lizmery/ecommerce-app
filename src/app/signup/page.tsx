'use client'

import { PageHeader } from '../../components/PageHeader'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from 'react-dom'
import { register } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
    const [state, formAction] = useFormState(register, undefined)
    const router = useRouter()

    useEffect(() => {
        state?.success && router.push('/login')
    }, [state?.success, router])

    return (
        <>
            <section className='min-h-screen lg:flex lg:pt-10'>
                <div className='min-h-screen flex-col flex justify-center items-center w-full content-center px-5 lg:px-10 xl:px-30  align-items-center lg:pt-4'>
                    <div className='pt-20 md:pt-0'>
                        <PageHeader>Sign Up</PageHeader> 
                    </div>            
                    <form className='space-y-8 pt-0 w-full xl:max-w-[40rem]' action={formAction}>
                        <div className='space-y-2'>
                            <Label htmlFor='name'>Name</Label>
                            <Input 
                                type='text'
                                id='name'
                                name='name'
                                required
                                className='bg-n-5 border-none'
                            />
                        </div>
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
                        <div className='space-y-2'>
                            <Label htmlFor='confirmPassword'>Confirm Password</Label>
                            <Input 
                                type='password'
                                id='confirmPassword'
                                name='confirmPassword'
                                required
                                className='bg-n-5 border-none'
                            />
                        </div>
                        <Button type='submit' className='text-n-8 w-full'>
                            Sign Up
                        </Button>
                        {state?.success && <div className='text-color-green text-center'>Success!</div>}
                        {state?.error && <div className='text-destructive text-center'>{state?.error}</div>}

                        <p className='text-center text-n-1/50 pb-10'>
                            Have an account?
                            <Link href='/login' className='pl-2'>
                                <b>Login</b>
                            </Link>
                        </p>
                    </form>
                </div> 
            </section>
        </>
    )
}