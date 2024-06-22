import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { object, string, ZodError } from 'zod'
import prisma from '@/db/db'
import { hashPassword } from './lib/isValidPassword'

declare module 'next-auth' {
  interface User {
    isAdmin?: boolean
  }
}

const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required"),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials)

          const hashedPassword = await hashPassword(password)
          
          const user = await prisma.user.findUnique({ 
            where: { 
              email, password: hashedPassword 
            } 
          })
          if(!user) throw new Error('Incorrect Email or Password. Please Try Again.')
    
          return user
        } catch (error) {
          if (error instanceof ZodError) {
            return null
          } else {
            console.log('Invalid credentials')
            throw new Error('Failed to Log In')
          }
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
  },
})