import { Button } from '@/components/ui/button'
import { PageHeader } from '../../../components/PageHeader'
import Link from 'next/link'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import prisma from '@/db/db'
import { CheckCircle2, MoreVertical, XCircle } from 'lucide-react'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger, 
} from '@/components/ui/dropdown-menu'
import { 
    ActiveToggleDropdownItem,
    DeleteDropdownItem, 
} from './_components/ProductActions'

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            priceInCents: true,
            isAvailableForPurchase: true,
            _count: { select: { orders: true } },
        },
        orderBy: { name: 'asc'},
    })

    if (products.length === 0) return <p>No products found</p>

    return (
        <div className='pt-[12rem] -mt-[5.25rem] max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] py-10 h-screen'>
            <div className='flex justify-between items-center gap-4'>
                <PageHeader>Products</PageHeader>
                <Button asChild className='text-n-8'>
                    <Link href='/admin/products/new'>Add Product</Link>
                </Button>
            </div>
            <Table className='mt-4 pt-6'>
                <TableHeader>
                    <TableRow className='font-light leading-6 md:text-base mb-3 text-n-1/50'>
                        <TableHead className='w-0'>
                            <span className='sr-only'>Available For Purchase</span>
                        </TableHead>
                        <TableHead className='text-n-1/50'>Name</TableHead>
                        <TableHead className='text-n-1/50'>Price</TableHead>
                        <TableHead className='text-n-1/50'>Orders</TableHead>
                        <TableHead className='w-0'>
                            <span className='sr-only'>Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map(product => (
                        <TableRow key={product.id}>
                            <TableCell>
                                {product.isAvailableForPurchase ? (
                                    <>
                                        <span className='sr-only'>Available</span>
                                        <CheckCircle2 className='text-[#7ADB78]'/>
                                    </>
                                ) : (
                                    <>
                                        <span className='sr-only'>Unavailable</span>
                                        <XCircle className='text-color-red' />
                                    </>
                                )}
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
                            <TableCell>{formatNumber(product._count.orders)}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreVertical />
                                        <span className='sr-only'>Actions</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                        </DropdownMenuItem>
                                        <ActiveToggleDropdownItem 
                                            id={product.id}
                                            isAvailableForPurchase={product.isAvailableForPurchase}
                                        />
                                        <DropdownMenuSeparator />
                                        <DeleteDropdownItem 
                                            id={product.id}
                                            disabled={product._count.orders > 0}
                                        />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}