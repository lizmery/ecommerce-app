import { ReactNode } from "react"

export function PageHeader({ children }: { children: ReactNode }) {
    return (
        <h1 className="font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem] mb-4 md:mb-6">
            {children}
        </h1>
    )
}