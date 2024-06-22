import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard'
import prisma from '@/db/db'
import { cache } from '@/lib/cache'
import { Suspense } from 'react'
import { PageHeader } from '@/components/PageHeader'

const getProducts = cache(() => {
    return prisma.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { name: 'asc' },
    })
}, ['/products', 'getProducts'])

export default async function ProductsPage() {
    const products = await getProducts()

    return (
        <div className='pt-[12rem] -mt-[5.25rem] max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem]'>
            <PageHeader>Products</PageHeader>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <Suspense
                    fallback={
                        <>
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                        </>
                    }
                >                  
                    {products.map(product => {
                        if(product) {
                            return (
                                <ProductCard key={product.id} product={product} purchaseBtn />
                            )
                        }
                    })}              
                </Suspense>
            </div>
        </div>
    )
}