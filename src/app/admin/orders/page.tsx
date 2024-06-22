import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import prisma from '@/db/db'
import { formatCurrency } from '@/lib/formatters'
import { PageHeader } from '../../../components/PageHeader'
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
 } from '@/components/ui/dropdown-menu'
 import { MoreVertical } from 'lucide-react'
import { DeleteDropDownItem } from './_components/OrderActions'

 function getOrders() {
    return prisma.order.findMany({
        select: {
            id: true,
            pricePaidInCents: true,
            product: { select: { name: true } },
            user: { select: { email: true } },
        },
        orderBy: { createdAt: 'desc' },
    })
 }

 export default function OrdersPage() {
    return (
        <div className='pt-[12rem] -mt-[5.25rem] max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] h-screen'>
            <PageHeader>Sales</PageHeader>
            {/* @ts-expect-error Server Component */}
            <OrdersTable />
        </div>
    )
 }

 async function OrdersTable() {
    const orders = await getOrders()

    if (orders.length === 0) return <p>No sales found.</p>

    return (
        <Table>
            <TableHeader>
                <TableRow className='font-light leading-6 md:text-base mb-3 text-n-1/50'>
                    <TableHead className='text-n-1/50'>Products</TableHead>
                    <TableHead className='text-n-1/50'>Customer</TableHead>
                    <TableHead className='text-n-1/50'>Price Paid</TableHead>
                    <TableHead className='w-0'>
                        <span className='sr-only'>Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map(order => (
                    <TableRow key={order.id}>
                        <TableCell>{order.product.name}</TableCell>
                        <TableCell>{order.user.email}</TableCell>
                        <TableCell>
                            {formatCurrency(order.pricePaidInCents / 100)}
                        </TableCell>
                        <TableCell className='text-center'>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className='sr-only'>Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DeleteDropDownItem id={order.id} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
 }