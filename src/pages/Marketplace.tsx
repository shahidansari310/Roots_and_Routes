// src/pages/Marketplace.tsx
import { ShoppingBag, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const marketplaceItems = [
  { id: 1, name: "Dokra Art Piece", price: "₹2,500", community: "Malhar", rating: 5 },
  { id: 2, name: "Paitkar Painting", price: "₹1,200", community: "Paitkar", rating: 4 },
  { id: 3, name: "Tussar Silk Saree", price: "₹4,800", community: "Santhal", rating: 5 },
  { id: 4, name: "Bamboo Craft Basket", price: "₹450", community: "Oraon", rating: 4 },
];

export default function Marketplace() {
  return (
    <div className="pt-24 min-h-screen container mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3 text-tribal">
          <ShoppingBag className="h-8 w-8" />
          Local Tribal Marketplace
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Support local artisans and communities by purchasing authentic handicrafts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketplaceItems.map(item => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>From the {item.community} Community</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-nature mb-2">{item.price}</p>
              <div className="flex items-center text-sm text-yellow-500">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500" />
                ))}
                <span className="text-muted-foreground ml-2">({item.rating}.0)</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button size="sm">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}