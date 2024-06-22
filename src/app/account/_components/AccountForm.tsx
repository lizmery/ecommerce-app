'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState, useFormStatus } from 'react-dom'
import { User } from '@prisma/client'
import { updateAccount } from '../_actions/account'

export function AccountForm({ user } : { user: User }) {
    const [error, action] = useFormState(updateAccount.bind(null, user.id), {})

    return (
        <form action={action} className='border border-stroke-1 lg:my-10 my-5 p-10 w-full lg:w-1/2 rounded-md'>
            <div className='space-y-8'>
                <div className='space-y-2'>
                    <Label htmlFor='name'>
                        Name
                    </Label>
                    <Input 
                        id='name' 
                        type='text' 
                        name='name' 
                        defaultValue={user.name} 
                        className='bg-n-5 border-stroke-1' 
                    />
                    {error?.name && <div className='text-destructive'>{error.name}</div>}
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='email' className='text-right'>
                        Email
                    </Label>
                    <Input 
                        id='email' 
                        type='email' 
                        name='email' 
                        defaultValue={user.email} 
                        className='bg-n-5 border-stroke-1' 
                    />
                    {error?.email && <div className='text-destructive'>{error.email}</div>}
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='newPassword' className='text-right'>
                        New Password
                    </Label>
                    <Input 
                        id='newPassword' 
                        name='newPassword' 
                        type='password' 
                        className='bg-n-5 border-stroke-1' 
                    />
                </div>
                {error?.message && <div className='text-destructive'>{error.message}</div>}
                <SubmitButton />
            </div>
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type='submit' disabled={pending} className='text-n-8 w-full mt-4'>
            {pending ? 'Saving...' : 'Save Changes'}
        </Button>
    )
}