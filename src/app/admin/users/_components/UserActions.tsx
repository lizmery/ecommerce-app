'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useTransition } from 'react'
import { deleteUser, toggleUserole } from '../../_actions/users'
import { useRouter } from 'next/navigation'

export function DeleteDropDownItem({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return (
        <DropdownMenuItem
            variant='destructive'
            disabled={isPending}
            onClick={() => startTransition(async () => {
                await deleteUser(id)
                router.refresh()
            })}
        >
            Delete
        </DropdownMenuItem>
    )
}

export function RoleToggleDropdownItem({
    id,
    isAdmin,
}: {
    id: string
    isAdmin: boolean
}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    await toggleUserole(id, !isAdmin)
                    router.refresh()
                })
            }}
        >
            {isAdmin ? 'Remove Admin Role' : 'Add Admin Role'}
        </DropdownMenuItem>
    )
}