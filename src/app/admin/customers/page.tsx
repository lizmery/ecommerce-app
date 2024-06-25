import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import prisma from '@/db/db'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import { PageHeader } from '../../../components/PageHeader'

 function getUsers() {
    return prisma.user.findMany({
        where: {
            isAdmin: false,
            orders: {
                some: {
                    pricePaidInCents: {
                        gt: 0,
                    }
                }
            }
        },
        select: {
            id: true,
            email: true,
            name: true,
            orders: { select: { pricePaidInCents: true } },
        },
        orderBy: { createdAt: 'desc' },
    })
 }

 export default async function CustomersPage() {
    const users = await getUsers()

    if (users.length === 0) return <p className='h-screen'>No customers found.</p>

    return (
        <div className='pt-[12rem] -mt-[5.25rem] max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] h-screen'>
            <PageHeader>Customers</PageHeader>
            <Table>
                <TableHeader>
                    <TableRow className='font-light leading-6 md:text-base mb-3 text-n-1/50'>
                        <TableHead className='text-n-1/50'>Name</TableHead>
                        <TableHead className='text-n-1/50'>Email</TableHead>
                        <TableHead className='text-n-1/50'>Orders</TableHead>
                        <TableHead className='text-n-1/50'>Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{formatNumber(user.orders.length)}</TableCell>
                            <TableCell>
                                {formatCurrency(
                                    user.orders.reduce((sum, o) => o.pricePaidInCents + sum, 0) / 100
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
 }