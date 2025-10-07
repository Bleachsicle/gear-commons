import { Store, MapPin, Star, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const vendors = [
  {
    name: "Precision Firearms LLC",
    location: "Austin, TX",
    rating: 4.9,
    reviews: 342,
    specialty: "FFL Transfers, Custom Builds",
    verified: true,
  },
  {
    name: "Tactical Outfitters",
    location: "Denver, CO",
    rating: 4.8,
    reviews: 289,
    specialty: "Accessories, Optics",
    verified: true,
  },
  {
    name: "Mountain State Armory",
    location: "Bozeman, MT",
    rating: 4.7,
    reviews: 156,
    specialty: "FFL Transfers, Gunsmithing",
    verified: true,
  },
  {
    name: "Desert Eagle Firearms",
    location: "Phoenix, AZ",
    rating: 4.9,
    reviews: 421,
    specialty: "NFA Items, Transfers",
    verified: true,
  },
  {
    name: "Patriot Gun Works",
    location: "Nashville, TN",
    rating: 4.6,
    reviews: 198,
    specialty: "Custom Builds, Parts",
    verified: false,
  },
  {
    name: "Coastal Defense Supply",
    location: "Jacksonville, FL",
    rating: 4.8,
    reviews: 267,
    specialty: "Accessories, Training",
    verified: true,
  },
];

const VendorDirectory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Vendor Directory</h1>
          <p className="text-muted-foreground">
            Verified FFLs and trusted vendors in the community
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {vendors.map((vendor) => (
            <Card key={vendor.name} className="hover-lift hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Store className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {vendor.name}
                        {vendor.verified && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Verified
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {vendor.location}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-semibold">{vendor.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({vendor.reviews} reviews)
                  </span>
                </div>
                
                <div className="text-sm">
                  <span className="text-muted-foreground">Specialty: </span>
                  <span className="text-foreground">{vendor.specialty}</span>
                </div>
                
                <Button variant="outline" className="w-full gap-2">
                  View Details
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default VendorDirectory;
