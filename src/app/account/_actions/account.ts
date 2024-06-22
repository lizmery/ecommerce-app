'use server'

import prisma from '@/db/db'
import { object, string } from 'zod'
import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { hashPassword } from '@/lib/isValidPassword'

const editAccountSchema = object({
    name: string({ required_error: "Name is required" })
      .min(1, 'Name is required'),
    email: string({ required_error: "Email is required" })
      .email("Invalid email"),
    newPassword: string()
 })

export async function updateAccount(
    id: string,
    prevState: unknown,
    formData: FormData,
): Promise<any> {
    const result = editAccountSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const { email, newPassword, name } = result.data
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) return notFound() 

    if (user.email !== email) {
        const emailExists = await prisma.user.findUnique({ where: { email } })
        if (emailExists) return { message: 'Email already exists' }
    }

    let hashedPassword = user.password

    if(newPassword !== null) {
        hashedPassword = await hashPassword(newPassword)
    }

    await prisma.user.update({
        where: { id },
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })

    revalidatePath('/account')
    redirect('/account')
}