'use server'

import prisma from '@/db/db'
import OrderHistoryEmail from '@/email/OrderHistory'
import { Resend } from 'resend'
import { z } from 'zod'

const emailSchema = z.string().email()
const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function emailOrderHistory(
    email?: string
) {
    const result = emailSchema.safeParse(email)

    if (result.success === false) {
        return 
    }

    const user = await prisma.user.findUnique({
        where: { email: result.data },
        select: {
            email: true,
            orders: {
                select: {
                    pricePaidInCents: true,
                    id: true,
                    createdAt: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            imageUrl: true,
                            description: true,
                        },
                    },
                },
            },
        },
    })

    if (user == null) {
        return
    }

    const orders = user.orders.map(async order => {
        return {
            ...order,
            downloadVerificationId: (
                await prisma.downloadVerification.create({
                    data: {
                        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
                        productId: order.product.id,
                    },
                })
            ).id,
        }
    })

    const data = await resend.emails.send({
        from: `Support<${process.env.SENDER_EMAIL}>`,
        to: user.email,
        subject: 'Order History',
        react: <OrderHistoryEmail orders={await Promise.all(orders)} />,
    })

    if (data.error) {
        return 
    }

    return { success: true }
}