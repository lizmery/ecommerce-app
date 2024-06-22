import { emailOrderHistory } from '@/actions/orders'
import { Button } from '@/components/ui/button'
import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { formatCurrency } from '@/lib/formatters'
import { PageHeader } from '@/components/PageHeader'
import { auth } from '@/auth'
import prisma from '@/db/db'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

async function getUserOrders(userId?: string) {
    if (userId) {
        return prisma.order.findMany({
            where: { userId },
            select: {
                id: true,
                pricePaidInCents: true,
                product: { select: { name: true } },
                user: { select: { email: true } },
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        })
    }
}

export default async function MyOrdersPage() {
    const session = await auth()
    const orders = await getUserOrders(session?.user?.id)
    const email = session?.user?.email

    if (orders?.length === 0) return <p className='flex justify-center items-center text-center h-screen'>No orders found.</p>

    return (
        <div className='pt-[12rem] -mt-[5.25rem] max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] h-screen'>
            <div className='flex flex-col md:flex-row justify-between'>
                <PageHeader>My Orders</PageHeader>
                <TooltipProvider>
                    {email && 
                        <form action={async () => {
                            "use server"
                            await emailOrderHistory(email)
                        }}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button className='text-n-8' size='lg' type='submit'>
                                        Get Order History
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Email me a copy of my order history</p>
                                </TooltipContent>
                            </Tooltip>
                        </form>
                    }
                </TooltipProvider>
            </div>
            <div>
                <Table className='mt-4'>
                    <TableHeader>
                        <TableRow className='font-light leading-6 md:text-base mb-3 text-n-1/50'>
                            <TableHead className='text-n-1/50'>Date Purchased</TableHead>
                            <TableHead className='text-n-1/50'>Product</TableHead>
                            <TableHead className='text-n-1/50'>Price Paid</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders?.map(order => (
                            <TableRow key={order.id}>
                                <TableCell>{order.createdAt.toDateString()}</TableCell>
                                <TableCell>{order.product.name}</TableCell>
                                <TableCell>
                                    {formatCurrency(order.pricePaidInCents / 100)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div> 
        </div>
    )
}