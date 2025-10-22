"use client"

import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Heart, ArrowLeft, Leaf, Sparkles } from "lucide-react"
import { useCartStore, type Product } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { ProductCard } from "@/components/product-card"

// Mock product data - in a real app, this would come from a database
const allProducts: Product[] = [
  {
    id: "1",
    name: "Radiance Serum",
    price: 89.99,
    image: "/luxury-face-serum-bottle-rose-gold.jpg",
    category: "skincare",
    description:
      "Illuminate your skin with our vitamin C-enriched radiance serum. This powerful formula combines potent antioxidants with hydrating ingredients to brighten, even skin tone, and reduce the appearance of fine lines. Perfect for all skin types, this lightweight serum absorbs quickly and works beautifully under makeup.",
    ingredients: ["Vitamin C", "Hyaluronic Acid", "Niacinamide", "Ferulic Acid", "Vitamin E"],
  },
  {
    id: "2",
    name: "Velvet Matte Lipstick",
    price: 34.99,
    image: "/luxury-matte-lipstick-rose-pink.jpg",
    category: "makeup",
    description:
      "Experience the perfect balance of comfort and color with our Velvet Matte Lipstick. This long-lasting formula glides on smoothly and sets to a velvety matte finish that won't dry out your lips. Enriched with nourishing ingredients, it keeps your lips soft and hydrated throughout the day.",
    ingredients: ["Natural Waxes", "Vitamin E", "Shea Butter", "Jojoba Oil", "Rosehip Oil"],
  },
  {
    id: "3",
    name: "Hydrating Night Cream",
    price: 79.99,
    image: "/luxury-night-cream-jar-elegant.jpg",
    category: "skincare",
    description:
      "Wake up to visibly smoother, more radiant skin with our Hydrating Night Cream. This rich, luxurious formula works overnight to deeply nourish and repair your skin. Packed with powerful anti-aging ingredients, it helps reduce the appearance of fine lines and wrinkles while you sleep.",
    ingredients: ["Retinol", "Peptides", "Ceramides", "Hyaluronic Acid", "Squalane"],
  },
  {
    id: "4",
    name: "Luminous Foundation",
    price: 54.99,
    image: "/luxury-foundation-bottle-elegant.jpg",
    category: "makeup",
    description:
      "Achieve a flawless, natural-looking complexion with our Luminous Foundation. This buildable formula provides medium to full coverage while maintaining a radiant, skin-like finish. Infused with skincare ingredients, it hydrates and protects your skin throughout the day.",
    ingredients: ["SPF 30", "Hyaluronic Acid", "Vitamin E", "Niacinamide", "Peptides"],
  },
  {
    id: "5",
    name: "Rose Water Toner",
    price: 42.99,
    image: "/rose-water-toner-bottle-elegant.jpg",
    category: "skincare",
    description:
      "Refresh and balance your skin with our Rose Water Toner. This gentle, alcohol-free formula helps remove any remaining impurities while restoring your skin's natural pH balance. The soothing rose water calms irritation and leaves your skin feeling soft and hydrated.",
    ingredients: ["Rose Water", "Witch Hazel", "Aloe Vera", "Glycerin", "Chamomile Extract"],
  },
  {
    id: "6",
    name: "Silk Eye Shadow Palette",
    price: 68.99,
    image: "/eyeshadow-palette-luxury-neutrals.jpg",
    category: "makeup",
    description:
      "Create endless eye looks with our Silk Eye Shadow Palette. Featuring 12 versatile shades ranging from soft neutrals to rich jewel tones, this palette offers both matte and shimmer finishes. The silky-smooth formula blends effortlessly and stays put all day without creasing.",
    ingredients: ["Mica", "Natural Pigments", "Vitamin E", "Jojoba Oil", "Silk Powder"],
  },
  {
    id: "7",
    name: "Gentle Cleansing Balm",
    price: 52.99,
    image: "/cleansing-balm-jar-luxury.jpg",
    category: "skincare",
    description:
      "Melt away makeup and impurities with our Gentle Cleansing Balm. This luxurious balm transforms from a solid to a silky oil upon contact with skin, effectively removing even waterproof makeup without stripping your skin. Leaves skin feeling clean, soft, and nourished.",
    ingredients: ["Coconut Oil", "Chamomile", "Vitamin E", "Sweet Almond Oil", "Shea Butter"],
  },
  {
    id: "8",
    name: "Fleur de Lumière Perfume",
    price: 125.99,
    image: "/luxury-perfume-bottle-elegant.jpg",
    category: "fragrance",
    description:
      "Embrace elegance with Fleur de Lumière, our signature fragrance. This sophisticated scent opens with fresh citrus notes, transitions to a heart of jasmine and rose, and settles into a warm base of sandalwood and vanilla. Long-lasting and beautifully balanced, it's perfect for any occasion.",
    ingredients: ["Jasmine", "Rose", "Sandalwood", "Bergamot", "Vanilla"],
  },
  {
    id: "9",
    name: "Volumizing Mascara",
    price: 29.99,
    image: "/luxury-mascara-black.jpg",
    category: "makeup",
    description:
      "Achieve dramatic, voluminous lashes with our Volumizing Mascara. The specially designed brush coats each lash from root to tip, creating incredible volume and length without clumping or flaking. The nourishing formula conditions lashes while delivering intense black color.",
    ingredients: ["Natural Waxes", "Peptides", "Vitamin B5", "Biotin", "Argan Oil"],
  },
  {
    id: "10",
    name: "Brightening Eye Cream",
    price: 72.99,
    image: "/eye-cream-luxury-jar.jpg",
    category: "skincare",
    description:
      "Revitalize tired eyes with our Brightening Eye Cream. This lightweight yet powerful formula targets dark circles, puffiness, and fine lines around the delicate eye area. Caffeine energizes while peptides and vitamin K work to brighten and smooth for a more youthful appearance.",
    ingredients: ["Caffeine", "Vitamin K", "Peptides", "Hyaluronic Acid", "Niacinamide"],
  },
  {
    id: "11",
    name: "Cream Blush Stick",
    price: 38.99,
    image: "/cream-blush-stick-rose.jpg",
    category: "makeup",
    description:
      "Add a natural, healthy flush to your cheeks with our Cream Blush Stick. This creamy formula glides on smoothly and blends seamlessly for a soft, dewy finish. The buildable color allows you to create anything from a subtle glow to a bold statement.",
    ingredients: ["Jojoba Oil", "Vitamin E", "Natural Pigments", "Shea Butter", "Coconut Oil"],
  },
  {
    id: "12",
    name: "Citrus Body Oil",
    price: 58.99,
    image: "/body-oil-luxury-bottle.jpg",
    category: "fragrance",
    description:
      "Nourish your skin with our luxurious Citrus Body Oil. This lightweight, fast-absorbing oil delivers intense hydration while enveloping you in an uplifting citrus scent. Rich in vitamins and antioxidants, it leaves skin soft, smooth, and glowing.",
    ingredients: ["Sweet Almond Oil", "Bergamot", "Orange", "Vitamin E", "Jojoba Oil"],
  },
]

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = allProducts.find((p) => p.id === id)
  const addItem = useCartStore((state) => state.addItem)
  const { toast } = useToast()

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  // Get related products from the same category
  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/shop">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>
      </Button>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <Badge className="w-fit mb-4 capitalize">{product.category}</Badge>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">{product.name}</h1>
          <p className="text-3xl font-semibold mb-6">${product.price.toFixed(2)}</p>

          <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <Leaf className="h-4 w-4 text-primary" />
              <span>Natural Ingredients</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Cruelty Free</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Heart className="h-4 w-4 text-primary" />
              <span>Dermatologist Tested</span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-4 mb-8">
            <Button onClick={handleAddToCart} size="lg" className="flex-1">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <Separator className="my-8" />

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Key Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <Badge key={index} variant="secondary">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="font-serif text-3xl font-bold mb-8 text-balance">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
