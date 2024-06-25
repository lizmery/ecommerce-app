import prisma from '@/db/db'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'

export async function GET(
    req: NextRequest,
    {
        params: { downloadVerificationId },
    }: { params: { downloadVerificationId: string } }
) {
    const data = await prisma.downloadVerification.findUnique({
        where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
        select: { product: { select: { fileDownLink: true, name: true, imageUrl: true } } },
    })

    if (data == null) {
        return NextResponse.redirect(new URL('/products/download/expired', req.url))
    }

    // const { size } = await fs.stat(data.product.fileDownLink)
    // console.log('size: ', size)
    // const file = await fs.readFile(data.product.fileDownLink)
    // const extension = data.product.imageUrl.split('.').pop()

    // return new NextResponse(file, {
    //     headers: {
    //         'Content-Disposition': `attachment; filename='${data.product.name}.${extension}'`,
    //         'Content-Length': size.toString(),
    //     },
    // })

    return NextResponse.redirect(new URL(data.product.fileDownLink))

}