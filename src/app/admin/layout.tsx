export const dynamic = "force-dynamic" // forces every admin page do be dynamically generated and no caching

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <div className="container my-6">{children}</div>
        </>
    )
}