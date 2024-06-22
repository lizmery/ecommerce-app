import prisma from '@/db/db'
import { PageHeader } from '../../../../../components/PageHeader'
import { ProductForm } from '../../_components/ProductForm'

export default async function EditProductPage({
    params: { id },
}: {
    params: { id: string }
}) {
    const product = await prisma.product.findUnique({ where: { id } })

    return (
        <div className='pt-[12rem] -mt-[5.25rem] max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem]'>
            <PageHeader>Edit Product</PageHeader>
            <ProductForm product={product} />
        </div>
    )
}