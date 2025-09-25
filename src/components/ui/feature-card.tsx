import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  gradient?: "nature" | "cultural" | "tribal" | "golden";
  className?: string;
}

const gradientClasses = {
  nature: "bg-gradient-to-br from-nature/10 to-nature/5 border-nature/20 hover:from-nature/15 hover:to-nature/10",
  cultural: "bg-gradient-to-br from-cultural/10 to-cultural/5 border-cultural/20 hover:from-cultural/15 hover:to-cultural/10",
  tribal: "bg-gradient-to-br from-tribal/10 to-tribal/5 border-tribal/20 hover:from-tribal/15 hover:to-tribal/10",
  golden: "bg-gradient-to-br from-golden/10 to-golden/5 border-golden/20 hover:from-golden/15 hover:to-golden/10"
};

const iconColors = {
  nature: "text-nature",
  cultural: "text-cultural", 
  tribal: "text-tribal",
  golden: "text-golden"
};

export function FeatureCard({
  icon,
  title,
  description,
  features,
  ctaText,
  ctaHref,
  gradient = "nature",
  className
}: FeatureCardProps) {
  return (
    <Card className={cn(
      "group cursor-pointer transition-all duration-300 hover:shadow-elegant hover:-translate-y-1",
      gradientClasses[gradient],
      className
    )}>
      <CardHeader className="text-center pb-4">
        <div className={cn(
          "mx-auto mb-4 p-4 rounded-full bg-background/50 backdrop-blur-sm w-fit",
          iconColors[gradient]
        )}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                iconColors[gradient]
              )} />
              <span className="text-sm text-foreground/80">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button
          variant="outline"
          className="w-full group-hover:shadow-cultural transition-all duration-200"
          asChild
        >
          <a href={ctaHref} className="flex items-center justify-center space-x-2">
            <span>{ctaText}</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}