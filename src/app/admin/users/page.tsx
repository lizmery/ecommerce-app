import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import prisma from '@/db/db'
import { auth } from '@/auth'
import { PageHeader } from '../../../components/PageHeader'
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
 } from '@/components/ui/dropdown-menu'
 import { MoreVertical } from 'lucide-react'
 import { DeleteDropDownItem, RoleToggleDropdownItem } from './_components/UserActions'

 function getUsers(userId?: string) {
    return prisma.user.findMany({
        where: {
            id: {
                not: userId
            },
            orders: {
                none: {}
            },
        },
        select: {
            id: true,
            email: true,
            name: true,
            isAdmin: true,
        },
        orderBy: { createdAt: 'desc' },
    })
 }

 export default async function UsersPage() {
    const session = await auth()
    const users = await getUsers(session?.user?.id)

    if (users.length === 0) return <p className='h-screen'>No users found.</p>

    return (
        <div className='pt-[12rem] -mt-[5.25rem] max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] h-screen'>
            <PageHeader>Users</PageHeader>
             <Table>
                <TableHeader>
                    <TableRow className='font-light leading-6 md:text-base mb-3 text-n-1/50'>
                        <TableHead className='text-n-1/50'>Name</TableHead>
                        <TableHead className='text-n-1/50'>Email</TableHead>
                        <TableHead className='text-n-1/50'>Role</TableHead>
                        <TableHead className='w-0'>
                            <span className='sr-only'>Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.isAdmin ? 'Admin' : 'User'}</TableCell>
                            <TableCell className='text-center'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreVertical />
                                        <span className='sr-only'>Actions</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <RoleToggleDropdownItem 
                                            id={user.id}
                                            isAdmin={user.isAdmin}
                                        />
                                        <DropdownMenuSeparator />
                                        <DeleteDropDownItem id={user.id} />
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