import About from '@/components/home/About'
import Contact from '@/components/home/Contact'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Hero from '@/components/home/Hero'

export default function HomePage() {
    return (
        <>
            <Hero />
            <About />
            <FeaturedProducts />
            <Contact />
        </>
    )
}