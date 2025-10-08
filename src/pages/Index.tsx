import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, TrendingUp, Clock, Flame } from "lucide-react";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockPosts: Array<{
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  votes: number;
  commentCount: number;
  views: number;
  timestamp: string;
  userVote: "up" | "down" | null;
}> = [];

const Index = () => {
  const [sortBy, setSortBy] = useState("trending");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Feed */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <Tabs value={sortBy} onValueChange={setSortBy}>
                <TabsList className="bg-card">
                  <TabsTrigger value="trending" className="gap-2">
                    <Flame className="h-4 w-4" />
                    Trending
                  </TabsTrigger>
                  <TabsTrigger value="new" className="gap-2">
                    <Clock className="h-4 w-4" />
                    New
                  </TabsTrigger>
                  <TabsTrigger value="top" className="gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Top
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Create Post</span>
              </Button>
            </div>

            <div className="space-y-4">
              {mockPosts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full md:w-80 space-y-4">
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="text-lg font-semibold mb-3">Popular Categories</h3>
              <div className="space-y-2">
                <Link to="/categories">
                  <Button variant="ghost" className="w-full justify-start">
                    Builds
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button variant="ghost" className="w-full justify-start">
                    WTS/WTB
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button variant="ghost" className="w-full justify-start">
                    Off-Topic
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="text-lg font-semibold mb-3">Community Rules</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Please review our community guidelines before posting.
              </p>
              <Link to="/rules">
                <Button variant="outline" className="w-full">
                  View Rules
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Index;
