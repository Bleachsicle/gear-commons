import { Target, Wrench, Scale, MessageCircle, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  {
    name: "Builds",
    description: "Share your complete builds, work in progress, and build advice",
    icon: Wrench,
    color: "text-primary",
    posts: 1234,
  },
  {
    name: "Gear Reviews",
    description: "Honest reviews of optics, lights, and accessories",
    icon: Target,
    color: "text-primary",
    posts: 856,
  },
  {
    name: "Legal Transfers",
    description: "Discuss FFL transfers, NFA items, and legal compliance",
    icon: ShieldCheck,
    color: "text-primary",
    posts: 423,
  },
  {
    name: "WTS/WTB",
    description: "Want to sell or buy? List your items here",
    icon: Scale,
    color: "text-primary",
    posts: 2341,
  },
  {
    name: "Off-Topic",
    description: "General discussion, range stories, and community chat",
    icon: MessageCircle,
    color: "text-primary",
    posts: 678,
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Categories</h1>
          <p className="text-muted-foreground">
            Browse discussions by topic
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.name} className="hover-lift cursor-pointer hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <CardTitle>{category.name}</CardTitle>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {category.posts.toLocaleString()} posts
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Categories;
