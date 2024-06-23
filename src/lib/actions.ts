'use server'

import { signIn, signOut } from '@/auth'
import { AuthError } from 'next-auth'
import { object, string, ZodError } from 'zod'
import prisma from '@/db/db'
import { hashPassword, isValidPassword } from '@/lib/isValidPassword'

export async function authenticate(
   prevState: string | undefined,
   formData: FormData,
) {
   try {
      await signIn('credentials', formData)
   } catch (error) {
      if (error instanceof AuthError) {
         switch (error.type) {
            case 'CredentialsSignin':
               return 'Invalid Email or Password'
            default:
               return 'Invalid Email or Password'
         }
      }
      throw error
   }
}

const signUpSchema = object({
   email: string({ required_error: "Email is required" })
     .min(1, "Email is required")
     .email("Invalid email"),
   password: string({ required_error: "Password is required" })
     .min(1, "Password is required")
     .min(5, "Password must be 5 or more characters long")
     .max(32, "Password must be less than 32 characters"),
   confirmPassword: string({ required_error: "Password is required" })
     .min(1, "Password is required")
     .min(5, "Password must be 5 or more characters long")
     .max(32, "Password must be less than 32 characters"),
   name: string({ required_error: "Name is required" })
     .min(1, 'Name is required'),
})

export async function register(
   prevState: string | undefined,
   formData: FormData,
): Promise<any> {
   const result = signUpSchema.safeParse(Object.fromEntries(formData.entries()))
   if (result.success === false) {
      return result.error.formErrors.fieldErrors
  }

  const { email, password, confirmPassword, name } = result.data
   if (password !== confirmPassword) {
      return { error: 'Passwords do not match' }
  }

   try {
      const user = await prisma.user.findUnique({ where: { email } })
      if (user) return { error: 'User already exists' }
   
      const hashedPassword = await hashPassword(password)
      const passwordMatch = await isValidPassword(confirmPassword, hashedPassword)
      if (!passwordMatch) return { error: 'Passwords must match!' }
   
      await prisma.user.create({
         data: {
            name,
            email,
            password: hashedPassword,
         }
      })

      return { success: true }
   } catch (error) {
      if (error instanceof ZodError) {
         return null
      }

      console.error(error)
      return { error: 'Internal Server Error' }
   }
}

export async function logout () {
   'use server'
   await signOut()
}