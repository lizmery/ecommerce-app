'use client'

import { userOrderExists } from '@/app/actions/orders'
import { Button } from '@/components/ui/button'
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
 } from '@/components/ui/card'
 import { formatCurrency } from '@/lib/formatters'
 import { 
    Elements,
    LinkAuthenticationElement,
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { useSession } from 'next-auth/react'

type CheckoutFormProps = {
    product: {
        id: string
        imagePath: string
        name: string
        priceInCents: number
        description: string
    }
    clientSecret: string,
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
    const appearance = {
        theme: 'night',
        variables: {
            colorPrimary: '#5de1e6',
            colorBackground: '#3f3a52',
            colorText: '#ffffff',
        },
    }

    const options =  {
        clientSecret,
        appearance,
    } 

    return (
        <div className='pt-[12rem] -mt-[5.25rem] pb-5 lg:pb-10 max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] space-y-8'>
            <PageHeader>Checkout</PageHeader>
            <div className='flex gap-4 items-center'>
                <div className='aspect-video flex-shrink-0 w-1/3 relative'>
                    <Image
                        src={product.imagePath}
                        fill
                        alt={product.name}
                        className='object-cover'
                    />
                </div>
                <div>
                    <div className='text-lg'>
                        {formatCurrency(product.priceInCents / 100)}
                    </div>
                    <h1 className='text-2xl font-bold'>{product.name}</h1>
                    <div className='line-clamp-3 text-n-4 pt-3'>
                        {product.description}
                    </div>
                </div>
            </div>

            {clientSecret && (
                // @ts-expect-error Server Component 
                <Elements options={options} stripe={stripePromise}>
                    <Form priceInCents={product.priceInCents} productId={product.id} />
                </Elements>
            )}
        </div>
    )
}

function Form({
    priceInCents,
    productId,
}: {
    priceInCents: number
    productId: string
}) {
    const { data: session } = useSession()
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>()
    const email = session?.user?.email

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        if (stripe == null || elements == null || email == null) return
        
        setIsLoading(true)

        const orderExists = await userOrderExists(email, productId)

        if (orderExists) {
            setErrorMessage(
                'You have already purchased this product. Please try downloading it from the My Orders page'
            )
            setIsLoading(false)
            return
        }

        stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/account/stripe/purchase-success`,
            },
        }).then(({ error }) => {
            if (error.type === 'card_error' || error.type === 'validation_error') {
                setErrorMessage(error.message)
            } else {
                setErrorMessage('An unknown error occurred.')
            }
        }).finally(() => setIsLoading(false))
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className='bg-transparent border-stroke-1 pt-2 pb-10 px-2'>
                <CardHeader>
                    {errorMessage && (
                        <CardDescription className='text-destructive'>
                            {errorMessage}
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent className='space-y-4 text-white'>
                    <PaymentElement />
                    <div className=''>
                        {email && 
                        <LinkAuthenticationElement
                            options={{
                                defaultValues: {
                                    email: email
                                }
                            }}
                        />
                        }
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className='w-full'
                        size='lg'
                        disabled={stripe == null || elements == null || isLoading}
                    >
                        {isLoading ? 'Purchasing...' : `Purchase - ${formatCurrency(priceInCents / 100)}`}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}