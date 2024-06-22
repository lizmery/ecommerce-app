import { PageHeader } from '../../../../components/PageHeader'
import { ProductForm } from '../_components/ProductForm'

export default function NewProductPage() {
    return (
        <div className='pt-[12rem] -mt-[5.25rem] max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem]'>
            <PageHeader>Add Product</PageHeader>
            <ProductForm />
        </div>
    )
}