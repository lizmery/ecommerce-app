import { Button } from '@/components/ui/button'
import prisma from '@/db/db'
import { formatCurrency } from '@/lib/formatters'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: { payment_intent: string}
}) {
    const paymentIntent = await stripe.paymentIntents.retrieve(
        searchParams.payment_intent
    )
    if (paymentIntent.metadata.productId == null) return notFound()

    const product = await prisma.product.findUnique({
        where: { id: paymentIntent.metadata.productId },
    })
    if (product == null) return notFound()

    const isSuccess = paymentIntent.status === 'succeeded'

    return (
        <div className='pt-[12rem] -mt-[5.25rem] max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] min-h-screen'>
            <h1 className='text-6xl font-bold pb-20'>
                {isSuccess ? 'Success!' : 'Error!'}
            </h1>
            <div className='flex flex-col lg:flex-row gap-10 items-center'>
                <div className='aspect-video flex-shrink-0 lg:w-1/3 w-full relative'>
                    <Image
                        src={product.imagePath}
                        fill
                        alt={product.name}
                        className='object-cover'
                    />
                </div>
                <div className='flex flex-col gap-4 p-4'>
                    <div className='text-lg'>
                        {formatCurrency(product.priceInCents / 100)}
                    </div>
                    <h1 className='text-2xl font-bold'>{product.name}</h1>
                    <div className='line-clamp-3 text-n-4'>
                        {product.description}
                    </div>
                    <Button className='mt-4 text-n-8' size='lg' asChild>
                        {isSuccess ? (
                            <a href={`/account/products/download/${await createDownloadVerification(product.id)}`}>
                                Download
                            </a>
                        ) : (
                            <Link href={`/account/products/${product.id}/purchase`}>Try Again</Link>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

async function createDownloadVerification(productId: string) {
    return (
        await prisma.downloadVerification.create({
            data: {
                productId,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // sets expiration date to 24 hours later
            },
        })
    ).id
}