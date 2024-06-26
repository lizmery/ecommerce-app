import prisma from '@/db/db'
import { notFound } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    const product = await prisma.product.findUnique({
        where: { id },
        select: { fileDownloadLink: true },
    })

    if (product == null) return notFound()

    return NextResponse.redirect(new URL(product.fileDownloadLink))
}