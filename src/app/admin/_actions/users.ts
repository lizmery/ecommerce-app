'use server'

import prisma from '@/db/db'
import { notFound } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function deleteUser(id:string) {
    const user = await prisma.user.delete({
        where: { id },
    })

    if (user == null) return notFound()

    return user
}

export async function toggleUserole(
    id: string,
    isAdmin: boolean
) {
    await prisma.user.update({ where: { id }, data: { isAdmin } })

    revalidatePath('/admin/users')
}