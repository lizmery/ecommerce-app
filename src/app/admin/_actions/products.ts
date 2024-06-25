'use server'

import prisma from '@/db/db'
import { z } from 'zod'
import fs from 'fs/promises'
import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { put } from '@vercel/blob'
import { del } from '@vercel/blob'

const fileSchema = z.instanceof(File, { message: 'Required' })
const imageSchema = fileSchema.refine(
    file => file.size === 0 || file.type.startsWith('image/')
)

// validation for adding a product
const addSchema =  z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceInCents: z.coerce.number().int().min(1),
    file: fileSchema.refine(file => file.size > 0, 'Required'),
    image: imageSchema.refine(file => file.size > 0, 'Required'),
})

export async function addProduct(prevState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries())) // converts form data to an object for validation
    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    // Resolve paths
    // const productsDir = path.resolve(process.cwd(), 'products')
    // const publicProductsDir = path.resolve(process.cwd(), 'public/products')

    // Log paths to debug
    // console.log('productsDir:', productsDir)
    // console.log('publicProductsDir:', publicProductsDir)

    // file
    const { downloadUrl } = await put(data.file.name, data.file, { access: 'public' })
    const fileDownLink = downloadUrl
    console.log('file download link: ', fileDownLink)

    // Ensure directories exist
    // await fs.mkdir(productsDir, { recursive: true })
    // await fs.mkdir(publicProductsDir, { recursive: true })

    // file
    // await fs.mkdir('products', { recursive: true })
    // const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    // await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))



    // image
    const { pathname: imagePath, url: imageUrl } = await put(data.image.name, data.image, { access: 'public' })

    // await fs.mkdir('public/products', { recursive: true })
    // const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    // await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    await prisma.product.create({
        data: {
            isAvailableForPurchase: false,
            name: data.name,
            description: data.description,
            priceInCents: data.priceInCents,
            imagePath,
            fileDownLink,
            imageUrl,
        },
    })

    // revalidate caching
    revalidatePath('/')
    revalidatePath('/products')
    revalidatePath('/account/products')

    redirect('/admin/products')
}

// validation for updating a product
const editSchema = addSchema.extend({
    file: fileSchema.optional(),
    image: imageSchema.optional(),
})

export async function updateProduct(
    id: string,
    prevState: unknown,
    formData: FormData
) {
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const product = await prisma.product.findUnique({ where: { id } })

    if (product == null) return notFound()

    let fileDownLink = product.fileDownLink
    if (data.file != null && data.file.size > 0) {
        const { downloadUrl } = await put(data.file.name, data.file, { access: 'public' })
        const fileDownLink = downloadUrl
        console.log('file download link: ', fileDownLink)

        // TODO:
        // delete file from vercel blob -> need file Url to do so
    }

    let imagePath = product.imagePath
    let imageUrl = product.imageUrl
    if (data.image != null && data.image.size > 0) {
        const { pathname: imagePath, url: imageUrl } = await put(data.image.name, data.image, { access: 'public' })

        await del(product.imageUrl)

    }

    await prisma.product.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
            priceInCents: data.priceInCents,
            imagePath,
            imageUrl,
            fileDownLink,
        },
    })

    revalidatePath('/')
    revalidatePath('/products')

    redirect('/admin/products')
}

export async function toggleProductAvailability(
    id: string,
    isAvailableForPurchase: boolean
) {
    await prisma.product.update({ where: { id }, data: { isAvailableForPurchase } })

    revalidatePath('/')
    revalidatePath('/products')
}

// export const config = {
//     runtime: 'edge',
//   }

export async function deleteProduct(id: string) {
    const product = await prisma.product.delete({ where: { id } })

    if (product == null) return notFound()

    await del(product.imageUrl)

    // await fs.unlink(product.filePath)
    // await fs.unlink(`public${product.imagePath}`)

    revalidatePath('/')
    revalidatePath('/products')
}