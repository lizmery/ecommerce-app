import { PageHeader } from '@/components/PageHeader'
import { AccountForm } from '../_components/AccountForm'
import { auth } from '@/auth'
import prisma from '@/db/db'

export default async function EditAccountPage() {
    const session = await auth()
    const user = await prisma.user.findUnique({ where: { id: session?.user?.id } })

    return (
        <div className='pt-[12rem] -mt-[5.25rem] max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] min-h-screen flex justify-center flex-col items-center'>
            <PageHeader>Edit Profile</PageHeader>
            {user && <AccountForm user={user}/>}
        </div>
    )
}