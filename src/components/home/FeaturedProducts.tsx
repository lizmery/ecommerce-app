import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard'
import prisma from '@/db/db'
import { cache } from '@/lib/cache'
import { Product } from '@prisma/client'
import Image from 'next/image'
import { Suspense } from 'react'
import sphere from '../../assets/sphere.png'
import stars from '../../assets/svg/stars.svg'

const getMostPopularProducts = cache(() => {
    return prisma.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { orders: { _count: 'desc' } },
        take: 6,
    })
}, ['/', 'getMostPopularProducts'], { revalidate: 60 * 60 * 24 })

// const getNewestProducts = cache(() => {
//     return prisma.product.findMany({
//         where: { isAvailableForPurchase: true },
//         orderBy: { createdAt: 'desc' },
//         take: 3,
//     })
// }, ['/', 'getNewestProducts'])

export default function FeaturedProducts() {
    return (
        <section id="features" className='relative py-10 lg:py-16 xl:py-20'>
            <div className="relative z-2 max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] lg:pb-8">
                <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
                    <Image
                        src={sphere}
                        className="relative z-1"
                        width={255}
                        height={255}
                        alt="Sphere"
                    />
                    <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <Image
                        src={stars}
                        className="w-full"
                        width={950}
                        height={400}
                        alt="Stars"
                        />
                    </div>
                </div>

                <div className='md:max-w-md lg:max-w-2xl max-w-[50rem] mx-auto mb-12 lg:mb-20 text-center'>
                    <h2 className="text-[1.75rem] leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight">
                        Featured Products
                    </h2>
                </div>
       
                <div className="space-y-12">
                    <ProductGrid 
                        title='Most Popular'
                        productsFetcher={getMostPopularProducts}
                    />    
                </div>
                
            </div>
            <div className="hidden absolute top-0 left-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:left-7.5 xl:left-10" />
            <div className="hidden absolute top-0 right-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:right-7.5 xl:right-10" />
        </section>
    )
}

type ProductGridProps = {
    title: string
    productsFetcher: () => Promise<Product[]>
}

function ProductGrid({
    title,
    productsFetcher,
}: ProductGridProps) {
    return (
        <div className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <Suspense
                    fallback={
                        <>
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                        </>
                    }
                >
                    {/* @ts-expect-error Server Component */}
                    <ProductSuspense productsFetcher={productsFetcher} />
                </Suspense>
            </div>
        </div>
    )
}

async function ProductSuspense({
    productsFetcher,
}: {
    productsFetcher: () => Promise<Product[]>
}) {
    return (await productsFetcher()).map(product => (
        <ProductCard key={product.id} {...product} />
    ))
}