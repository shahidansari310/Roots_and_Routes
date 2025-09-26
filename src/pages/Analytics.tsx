// src/pages/Analytics.tsx
import { BarChart3, TrendingUp, DollarSign, Users, FileDown, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// Fix 1: Import the export utility
// import { exportToCSV } from '@/lib/export'; 


const analyticsSummary = [
  { metric: "Total Bookings", value: "3,450", trend: "+12%", icon: TrendingUp },
  { metric: "Artisan Revenue", value: "₹2.5 Cr", trend: "+18%", icon: DollarSign },
  { metric: "Local Guides Hired", value: "155", trend: "+5%", icon: Users },
  // Fix 2: Added the Leaf icon for Eco-Tourism Sites
  { metric: "Eco-Tourism Sites", value: "15+", trend: "N/A", icon: Leaf }, 
];

const mockReportData = [
    { month: "Jan", revenue: 500000, bookings: 120, artisans: 45 },
    { month: "Feb", revenue: 650000, bookings: 150, artisans: 50 },
    { month: "Mar", revenue: 800000, bookings: 180, artisans: 60 },
    { month: "Apr", revenue: 720000, bookings: 165, artisans: 55 },
];

export default function Analytics() {
  
  return (
    <div className="pt-24 min-h-screen container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold flex items-center gap-3 text-nature">
          <BarChart3 className="h-8 w-8" />
          Tourism Impact Analytics
        </h1>
        <Button 
          className="bg-cultural hover:bg-cultural/90"
        >
          <FileDown className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>
      <p className="text-lg text-muted-foreground mb-10">
        Real-time metrics on economic, social, and environmental impact of tourism.
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {analyticsSummary.map((item, index) => (
          <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.metric}</CardTitle>
              {/* This now correctly uses the imported Leaf icon for Eco-Tourism Sites */}
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-green-600 pt-1">{item.trend} since last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Chart Area Mockup */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Monthly Revenue and Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-gray-50/50 rounded-lg border border-dashed text-muted-foreground">
            {/* Replace this div with a Chart component (e.g., using Recharts or Chart.js) */}
            Mock Chart Visualization Area
          </div>
        </CardContent>
      </Card>
    </div>
  );
}