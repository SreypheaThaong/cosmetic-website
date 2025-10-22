import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Heart, Sparkles, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-secondary">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/about-hero-natural-beauty-ingredients.jpg')",
          }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 text-balance">Our Story</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Crafting beauty products with nature's finest ingredients since 2015
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-6 text-balance">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              At Lumière, we believe that true beauty comes from within and is enhanced by what we put on our skin. Our
              mission is to create premium cosmetics and skincare products that harness the power of natural ingredients
              to help you look and feel your best. Every product is carefully formulated with your skin's health and the
              environment in mind.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-sm text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">Natural</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use only the finest natural and organic ingredients sourced sustainably
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">Cruelty-Free</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Never tested on animals, always created with compassion and care
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">Effective</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Scientifically proven formulations that deliver visible results
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">Premium</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Luxury quality products that provide an indulgent experience
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/about-founder-natural-beauty-lab.jpg"
                alt="Lumière Beauty Lab"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-4xl font-bold mb-6 text-balance">Where It All Began</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Lumière was founded in 2015 by beauty enthusiast and chemist Marie Laurent, who was frustrated by the
                  lack of truly natural, effective skincare products on the market. She set out to create a line that
                  would combine the best of nature with cutting-edge science.
                </p>
                <p>
                  Starting in a small laboratory in Paris, Marie spent years perfecting formulations that would deliver
                  real results without compromising on ingredient quality or ethics. Today, Lumière has grown into a
                  beloved brand trusted by thousands of customers worldwide.
                </p>
                <p>
                  Every product we create is a testament to our commitment to excellence, sustainability, and your
                  skin's health. We're proud to be part of your beauty journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl font-bold mb-6 text-balance">Our Commitment to Sustainability</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty mb-8">
              We believe in beauty that doesn't cost the earth. That's why we use recyclable packaging, partner with
              sustainable suppliers, and donate a portion of our profits to environmental causes. When you choose
              Lumière, you're choosing a more beautiful future for everyone.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
