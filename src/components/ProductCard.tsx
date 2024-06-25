import { formatCurrency } from '@/lib/formatters'
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from './ui/card'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import brackets from '@/assets/svg/Brackets'
import { Product } from '@prisma/client'

type ProductCardProps = {
    id: string
    name: string
    priceInCents: number
    description: string
    imagePath: string
    purchaseBtn?: boolean
}

export function ProductCard({
    product,
    purchaseBtn
}: { product: Product; purchaseBtn?: boolean }) {
    return (
        <Card className='flex overflow-hidden flex-col border border-stroke-1 bg-transparent rounded-2xl'>
             <div className='relative w-full h-auto aspect-video'>
                <Image src={product.imageUrl} fill alt={product.name} />
            </div>
            <CardHeader>
                <CardTitle className='text-n-1 text-2xl leading-normal mb-2'>{product.name}</CardTitle>
                <div className='font-grotesk font-light text-xs tracking-tagline uppercase flex mb-4'>
                  {brackets("left")}
                    <CardDescription className='text-n-3 mx-3'>{formatCurrency(product.priceInCents / 100)}</CardDescription>
                  {brackets("right")}
                </div>
            </CardHeader>
            <CardContent className='flex-grow'>
                <p className='line-clamp-4 text-n-2'>{product.description}</p>
            </CardContent>
            <CardFooter>

                <Button asChild size='lg' className='w-full'>
                  {purchaseBtn ? 
                    <Link href={`/account/products/${product.id}/purchase`}>Purchase</Link> :
                    <Link href={`/signup`}>Get Started</Link>
                  }
                
                </Button>
            </CardFooter>
        </Card>
    )
}

export function ProductCardSkeleton() {
    return (
        <Card className='overflow-hidden flex flex-col animate-pulse'>
          <div className='w-full aspect-video bg-gray-300' />
          <CardHeader>
            <CardTitle>
              <div className='w-3/4 h-6 rounded-full bg-gray-300' />
            </CardTitle>
            <CardDescription>
              <div className='w-1/2 h-4 rounded-full bg-gray-300' />
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='w-full h-4 rounded-full bg-gray-300' />
            <div className='w-full h-4 rounded-full bg-gray-300' />
            <div className='w-3/4 h-4 rounded-full bg-gray-300' />
          </CardContent>
          <CardFooter>
            <Button className='w-full' disabled size='lg'></Button>
          </CardFooter>
        </Card>
      )
}