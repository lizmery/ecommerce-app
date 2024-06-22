import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import prisma from '@/db/db'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import brackets from '@/assets/svg/Brackets'
import { auth } from '@/auth'
import Link from 'next/link'

async function getSalesData() {
    const data = await prisma.order.aggregate({
        _sum: { pricePaidInCents: true },
        _count: true,
    })

    return {
        amount: (data._sum.pricePaidInCents || 0) / 100,
        numberOfSales: data._count,
    }
}

async function getCustomerData() {
    const [customerCount, orderData] = await Promise.all([
        prisma.user.count({
            where: {
                orders: {
                    some: {
                        pricePaidInCents: {
                            gt: 0,
                        }
                    }
                }
            }
        }),
        prisma.order.aggregate({
            _sum: { pricePaidInCents: true },
        }),
    ])

    return {
        customerCount,
        avgOrderTotal: customerCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / customerCount / 100,
    }
}

async function getProductData() {
    const [activeCount, inactiveCount] = await Promise.all([
        prisma.product.count({ where: { isAvailableForPurchase: true } }),
        prisma.product.count({ where: { isAvailableForPurchase: false } }),
    ])

    return { activeCount, inactiveCount }
}

async function getUserData() {
    const [userCount, adminCount] = await Promise.all([
        prisma.user.count({
            where: {
                isAdmin: false,
                orders: {
                    none: {}
                },
            }
        }),
        prisma.user.count({
            where: {
                isAdmin: true,
            }
        }),
    ])

    return { userCount,adminCount }
}

export default async function AdminDashboard() {
    const session = await auth()
    const [salesData, customerData, productData, userData] = await Promise.all([
        getSalesData(),
        getCustomerData(),
        getProductData(),
        getUserData(),
    ])

    return (
        <div className='pt-[12rem] -mt-[5.25rem] max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] pb-10'>
            <div className='font-grotesk font-light text-sm tracking-tagline uppercase flex mb-3 justify-center lg:text-justify lg:justify-start'>
                {brackets("left")}
                    <div className='mx-3 text-n-3 mb-3 flex items-center text-center justify-center'>Welcome, {session?.user?.name} !</div>
                {brackets("right")}
            </div>
            <h1 className="font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem] mb-6">
                Admin Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-6">
                <Link href='/admin/orders'>
                    <DashboardCard 
                        title='Sales'
                        subtitle={`${formatNumber(salesData.numberOfSales)} Order(s)`}
                        body={formatCurrency(salesData.amount)}
                        accentColor='color-orange'
                    />
                </Link>
                <Link href='/admin/customers'>
                    <DashboardCard 
                        title='Customers'
                        subtitle={`${formatCurrency(customerData.avgOrderTotal)} Avg Order Total`}
                        body={formatNumber(customerData.customerCount)}
                        accentColor='color-green'
                    />
                </Link>
                <Link href='/admin/products'>
                    <DashboardCard 
                        title='Products'
                        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
                        body={`${formatNumber(productData.activeCount)}`}
                        accentColor='color-purple'
                    />
                </Link>
                <Link href='/admin/users'>
                    <DashboardCard 
                        title='Users'
                        subtitle={`${formatNumber(userData.adminCount)} Admins`}
                        body={`${formatNumber(userData.userCount)}`}
                        accentColor='color-red'
                    />
                </Link>
            </div>
        </div>
    )
}

type DashboardCardProps = {
    title: string
    subtitle: string
    body: string
    accentColor: string
}

function DashboardCard({ title, subtitle, body, accentColor }: DashboardCardProps) {
    return (
        <Card className='bg-n-8 border border-stroke-1 px-1 lg:px-3 py-4 lg:py-6 hover:bg-n-5 hover:cursor-pointer transition-colors'>
            <CardHeader>
                <CardTitle className={`text-${accentColor} text-2xl leading-normal mb-2`}>{title}</CardTitle>
                <CardDescription className='font-light text-[0.875rem] leading-6 md:text-base min-h-[4rem] mb-3 text-n-1/50'>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent className=''>
                <p className='text-n-1 text-[4rem] lg:text-[5rem] leading-none font-bold'>{body}</p>
            </CardContent>
        </Card>
    )
}