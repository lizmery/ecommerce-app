export default function Footer() {
    return (
        <div className='py-10 border-t border-stroke-1 mx-auto flex sm:justify-between max-sm:flex-col  lg:items-center lg:justify-center lg:align-items-center'>
            <p className="text-sm text-n-4 lg:block text-center px-5 lg:px-0">
                © {new Date().getFullYear()}. All rights reserved.
            </p>
        </div>
    )
}