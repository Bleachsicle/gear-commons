import { ShieldCheck, AlertTriangle, FileText, Users } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Rules = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Rules & Legal Info</h1>
          <p className="text-muted-foreground">
            Please read and follow these rules to keep our community safe and legal
          </p>
        </div>

        <Alert className="mb-6 border-primary/50 bg-primary/5">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <AlertDescription className="text-foreground">
            All transactions must comply with federal, state, and local laws. We take legal compliance seriously.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>1. Legal Compliance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• All sales must comply with federal, state, and local firearms laws</p>
              <p>• Transfers involving firearms must go through a licensed FFL dealer</p>
              <p>• Sellers are responsible for verifying buyer eligibility</p>
              <p>• No straw purchases or transfers to prohibited persons</p>
              <p>• Follow all NFA regulations for regulated items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>2. Community Conduct</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• Be respectful and courteous to all members</p>
              <p>• No harassment, threats, or personal attacks</p>
              <p>• Keep discussions civil even when disagreeing</p>
              <p>• No spam, excessive self-promotion, or advertising</p>
              <p>• Report rule violations to moderators</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>3. Prohibited Items & Activities</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• No illegal modifications or prohibited weapons</p>
              <p>• No complete firearms (parts and accessories only)</p>
              <p>• No ammunition sales or high-capacity magazines where prohibited</p>
              <p>• No price gouging or scalping</p>
              <p>• No scamming, fraud, or misleading product descriptions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>4. Transaction Best Practices</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• Use PayPal Goods & Services or similar buyer protection</p>
              <p>• Request timestamped photos for verification</p>
              <p>• Check seller/buyer feedback and history</p>
              <p>• Keep all communications on platform when possible</p>
              <p>• Report suspicious activity immediately</p>
            </CardContent>
          </Card>

          <Alert className="border-destructive/50 bg-destructive/5">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <AlertDescription className="text-foreground">
              <strong>Disclaimer:</strong> GunAccessoryHub is a community platform for discussion and legal transfers.
              We are not responsible for transactions between users. All users must comply with applicable laws.
              Violations may result in account suspension and reporting to authorities.
            </AlertDescription>
          </Alert>
        </div>
      </main>
    </div>
  );
};

export default Rules;
