"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import type { Product } from "@/lib/store"

const allProducts: Product[] = [
  {
    id: "1",
    name: "Radiance Serum",
    price: 89.99,
    image: "/luxury-face-serum-bottle-rose-gold.jpg",
    category: "skincare",
    description: "Illuminate your skin with our vitamin C-enriched radiance serum",
    ingredients: ["Vitamin C", "Hyaluronic Acid", "Niacinamide"],
  },
  {
    id: "2",
    name: "Velvet Matte Lipstick",
    price: 34.99,
    image: "/luxury-matte-lipstick-rose-pink.jpg",
    category: "makeup",
    description: "Long-lasting, comfortable matte finish in stunning shades",
    ingredients: ["Natural Waxes", "Vitamin E", "Shea Butter"],
  },
  {
    id: "3",
    name: "Hydrating Night Cream",
    price: 79.99,
    image: "/luxury-night-cream-jar-elegant.jpg",
    category: "skincare",
    description: "Deeply nourishing overnight treatment for radiant morning skin",
    ingredients: ["Retinol", "Peptides", "Ceramides"],
  },
  {
    id: "4",
    name: "Luminous Foundation",
    price: 54.99,
    image: "/luxury-foundation-bottle-elegant.jpg",
    category: "makeup",
    description: "Flawless, natural coverage with a radiant finish",
    ingredients: ["SPF 30", "Hyaluronic Acid", "Vitamin E"],
  },
  {
    id: "5",
    name: "Rose Water Toner",
    price: 42.99,
    image: "/rose-water-toner-bottle-elegant.jpg",
    category: "skincare",
    description: "Refreshing toner that balances and hydrates your skin",
    ingredients: ["Rose Water", "Witch Hazel", "Aloe Vera"],
  },
  {
    id: "6",
    name: "Silk Eye Shadow Palette",
    price: 68.99,
    image: "/eyeshadow-palette-luxury-neutrals.jpg",
    category: "makeup",
    description: "12 versatile shades with silky smooth texture",
    ingredients: ["Mica", "Natural Pigments", "Vitamin E"],
  },
  {
    id: "7",
    name: "Gentle Cleansing Balm",
    price: 52.99,
    image: "/cleansing-balm-jar-luxury.jpg",
    category: "skincare",
    description: "Melts away makeup and impurities without stripping skin",
    ingredients: ["Coconut Oil", "Chamomile", "Vitamin E"],
  },
  {
    id: "8",
    name: "Fleur de Lumière Perfume",
    price: 125.99,
    image: "/luxury-perfume-bottle-elegant.jpg",
    category: "fragrance",
    description: "Elegant floral fragrance with notes of jasmine and rose",
    ingredients: ["Jasmine", "Rose", "Sandalwood"],
  },
  {
    id: "9",
    name: "Volumizing Mascara",
    price: 29.99,
    image: "/luxury-mascara-black.jpg",
    category: "makeup",
    description: "Dramatic volume and length without clumping",
    ingredients: ["Natural Waxes", "Peptides", "Vitamin B5"],
  },
  {
    id: "10",
    name: "Brightening Eye Cream",
    price: 72.99,
    image: "/eye-cream-luxury-jar.jpg",
    category: "skincare",
    description: "Reduces dark circles and fine lines around delicate eye area",
    ingredients: ["Caffeine", "Vitamin K", "Peptides"],
  },
  {
    id: "11",
    name: "Cream Blush Stick",
    price: 38.99,
    image: "/cream-blush-stick-rose.jpg",
    category: "makeup",
    description: "Buildable, blendable cream blush for a natural flush",
    ingredients: ["Jojoba Oil", "Vitamin E", "Natural Pigments"],
  },
  {
    id: "12",
    name: "Citrus Body Oil",
    price: 58.99,
    image: "/body-oil-luxury-bottle.jpg",
    category: "fragrance",
    description: "Nourishing body oil with uplifting citrus scent",
    ingredients: ["Sweet Almond Oil", "Bergamot", "Orange"],
  },
]

const categories = ["all", "skincare", "makeup", "fragrance"]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 150])
  const [sortBy, setSortBy] = useState("featured")

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const categoryMatch = selectedCategory === "all" || product.category === selectedCategory
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
      return categoryMatch && priceMatch
    })

    // Sort products
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [selectedCategory, priceRange, sortBy])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2 text-balance">Shop All Products</h1>
        <p className="text-muted-foreground text-lg text-pretty leading-relaxed">
          Discover our complete collection of premium beauty products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className="w-full justify-start capitalize"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    min={0}
                    max={150}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="font-semibold mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* Reset Filters */}
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  setSelectedCategory("all")
                  setPriceRange([0, 150])
                  setSortBy("featured")
                }}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAndSortedProducts.length}{" "}
              {filteredAndSortedProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No products found matching your filters.</p>
              <Button
                variant="link"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("all")
                  setPriceRange([0, 150])
                }}
              >
                Clear filters
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
