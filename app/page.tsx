import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles, Heart, Leaf } from "lucide-react"
import { ProductCard } from "@/components/product-card"

const featuredProducts = [
  {
    id: "1",
    name: "Radiance Serum",
    price: 89.99,
    image: "/luxury-face-serum-bottle-rose-gold.jpg",
    category: "skincare",
    description: "Illuminate your skin with our vitamin C-enriched radiance serum",
  },
  {
    id: "2",
    name: "Velvet Matte Lipstick",
    price: 34.99,
    image: "/luxury-matte-lipstick-rose-pink.jpg",
    category: "makeup",
    description: "Long-lasting, comfortable matte finish in stunning shades",
  },
  {
    id: "3",
    name: "Hydrating Night Cream",
    price: 79.99,
    image: "/luxury-night-cream-jar-elegant.jpg",
    category: "skincare",
    description: "Deeply nourishing overnight treatment for radiant morning skin",
  },
  {
    id: "4",
    name: "Luminous Foundation",
    price: 54.99,
    image: "/luxury-foundation-bottle-elegant.jpg",
    category: "makeup",
    description: "Flawless, natural coverage with a radiant finish",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden bg-secondary">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('/elegant-cosmetics-beauty-products-soft-lighting.jpg')",
          }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
            Discover Your Natural Radiance
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Premium cosmetics and skincare crafted with natural ingredients for luminous, healthy skin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base">
              <Link href="/shop">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-sm">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">Natural Ingredients</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Carefully selected botanical extracts and natural compounds for gentle, effective care
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">Luxury Quality</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Premium formulations that deliver visible results and an indulgent experience
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">Cruelty Free</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Never tested on animals, always created with compassion and care
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">Featured Products</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty leading-relaxed">
              Discover our most loved products, carefully curated for your beauty routine
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/shop">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">Join Our Beauty Community</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-pretty leading-relaxed opacity-90">
            Subscribe to receive exclusive offers, beauty tips, and early access to new products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground"
            />
            <Button size="lg" variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
