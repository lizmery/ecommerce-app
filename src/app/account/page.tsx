import { PageHeader } from '@/components/PageHeader'
import prisma from '@/db/db'
import { auth } from '@/auth'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import blankProfilePic from '../../assets/blank-profile-img.png'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function AccountPage() {
    const session = await auth()
    const user = await prisma.user.findUnique({ where: { id: session?.user?.id } })

    return (
        <div className='pt-[12rem] -mt-[5.25rem] max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] pb-10 min-h-screen'>
            <div className='lg:pt-4 flex flex-col-reverse lg:flex-row lg:gap-20'>
                <div className='basis-1/6 lg:basis-1/4 flex flex-col gap-10 justify-center items-center p-20 lg:p-5'>
                    <Image 
                        src={blankProfilePic}
                        alt='Blank Profile Avatar'
                        className='rounded-full w-1/2 lg:w-full'
                    />
                    <Button variant='outline' disabled>
                        Upload Profile Icon
                    </Button>
                </div>
                <div className='flex flex-col gap-8  basis-3/4 lg:p-10 p-5'>
                    <PageHeader >My Account</PageHeader>
                    <div className='flex flex-col gap-2'>
                        <h3 className='uppercase text-n-4 text-xs font-semibold'>Name</h3>
                        <h1 className='text-lg'>{user?.name}</h1>
                        <Separator className='bg-n-5 my-[.5]' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h3 className='uppercase text-n-4 text-xs font-semibold'>E-mail</h3>
                        <h1 className='text-lg'>{user?.email}</h1>
                        <Separator className='bg-n-5 my-[.5]' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h3 className='uppercase text-n-4 text-xs font-semibold'>Password</h3>
                        <h1 className='text-lg'>●●●●●●●</h1>
                        <Separator className='bg-n-5 my-[.5]' />
                    </div>
                    <Button asChild className='text-n-8'>
                        <Link href='/account/edit'>Edit Profile</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}