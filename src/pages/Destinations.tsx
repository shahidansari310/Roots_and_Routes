// src/pages/Destinations.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, FileDown } from 'lucide-react';

// Sample data for the page and export
const destinationData = [
  { id: 1, name: "Hundru Falls", type: "Nature", district: "Ranchi", rating: "4.7★" },
  { id: 2, name: "Betla National Park", type: "Wildlife", district: "Latehar", rating: "4.5★" },
  { id: 3, name: "Baidyanath Temple", type: "Spiritual", district: "Deoghar", rating: "4.8★" },
  { id: 4, name: "Netarhat Hills", type: "Scenic", district: "Latehar", rating: "4.6★" },
];

export default function Destinations() {
  const [data] = useState(destinationData);


  return (
    <div className="pt-24 min-h-screen container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <MapPin className="h-8 w-8 text-nature" />
          Jharkhand Destinations
        </h1>
        <Button 
          className="bg-cultural hover:bg-cultural/90"
        >
          <FileDown className="w-4 h-4 mr-2" />
          Export to Sheets
        </Button>
      </div>
      <p className="text-lg text-muted-foreground mb-10">
        A curated list of sustainable and culturally significant places to visit.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Top Rated Sites</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Destination Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((dest) => (
                <TableRow key={dest.id}>
                  <TableCell className="font-medium">{dest.name}</TableCell>
                  <TableCell>{dest.type}</TableCell>
                  <TableCell>{dest.district}</TableCell>
                  <TableCell>{dest.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}