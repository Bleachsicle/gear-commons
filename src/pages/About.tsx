import { Target, Users, Shield, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">About GunAccessoryHub</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The new home for gear talk, builds, and community — all legal, all in one place.
          </p>
        </div>

        <div className="prose prose-invert max-w-none mb-12">
          <div className="bg-card rounded-lg border border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              GunAccessoryHub was created to provide a legal, organized, and community-focused platform 
              for firearms enthusiasts to discuss gear, share builds, and facilitate legal transfers of 
              parts and accessories. After the closure of r/GunAccessoriesForSale, we recognized the need 
              for a dedicated space that prioritizes both community engagement and legal compliance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Community Focus</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Built by enthusiasts, for enthusiasts. We understand what the community needs because 
                we're part of it.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Legal Compliance</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                All transactions follow federal, state, and local regulations. Safety and legality 
                are our top priorities.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Trusted Network</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Build your reputation through honest transactions and quality contributions to the 
                community.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Growing Platform</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Constantly evolving with new features based on community feedback and needs.
              </CardContent>
            </Card>
          </div>

          <div className="bg-card rounded-lg border border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>A familiar Reddit-style interface for easy navigation and discussion</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Organized categories for builds, reviews, sales, and general discussion</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Verified vendor directory for trusted FFL dealers and businesses</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>User reputation system to build trust within the community</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Clear community guidelines and legal information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Mobile-friendly design for on-the-go access</span>
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-lg border border-border p-8">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Whether you're looking to buy, sell, trade, or just discuss the latest gear, 
              GunAccessoryHub is your new home. We welcome responsible firearms enthusiasts of 
              all experience levels.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Have questions or feedback? We're always listening to our community. Together, 
              we're building a platform that serves the needs of responsible gun owners everywhere.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
