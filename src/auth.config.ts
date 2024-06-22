import { NextAuthConfig } from 'next-auth'

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.id = user.id
                token.isAdmin = user.isAdmin
            }
            return token
        },
        async session({ session, token }: { session: any, token: any }) {
            if (token) {
                session.user.id = token.id
                session.user.isAdmin = token.isAdmin
            }
            return session
        },
        async authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isAdmin = auth?.user?.isAdmin

            const isOnAdminPanel = nextUrl?.pathname.startsWith('/admin')
            const isOnAccountPanel = nextUrl?.pathname.startsWith('/account')

            if (!isLoggedIn) return false

            if (isAdmin) {
                if (isOnAdminPanel) return true
                return Response.redirect(new URL('/admin', nextUrl))
            } else {
                if (isOnAccountPanel) return true
                return Response.redirect(new URL('/account', nextUrl))
            }
        },
        async redirect({ url, baseUrl }) {
            return baseUrl + '/account'
        }
    },
} satisfies NextAuthConfig