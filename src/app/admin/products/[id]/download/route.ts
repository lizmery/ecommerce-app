import prisma from '@/db/db'
import { notFound } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'

export async function GET(
    req: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    const product = await prisma.product.findUnique({
        where: { id },
        select: { fileDownLink: true, name: true, imageUrl: true },
    })

    if (product == null) return notFound()

    const { size } = await fs.stat(product.fileDownLink)
    const file = await fs.readFile(product.fileDownLink)
    const extension = product.imageUrl.split('.').pop()

    return new NextResponse(file, {
        headers: {
            'Content-Disposition': `attachment; filename="${product.name}.${extension}"`, // default name that shows up when downloading file
            'Content-Length': size.toString(),
        },
    })
}