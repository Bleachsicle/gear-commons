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
}> = [
  {
    id: "1",
    title: "WTS: Eotech EXPS3-0 in excellent condition",
    content: "Selling my Eotech EXPS3-0. Barely used, maybe 200 rounds through it. Comes with original box and documentation. Looking for $550 shipped. Can provide more photos upon request.",
    author: "tactical_trader",
    category: "Optics",
    votes: 47,
    commentCount: 12,
    views: 342,
    timestamp: "3 hours ago",
    userVote: null,
  },
  {
    id: "2",
    title: "My first AR-15 build - Feedback welcome!",
    content: "Just finished my first build. Aero Precision upper and lower, BCM barrel, Geissele trigger. Super happy with how it turned out. What do you all think?",
    author: "FirstTimeBuild",
    category: "Builds",
    votes: 128,
    commentCount: 45,
    views: 1203,
    timestamp: "5 hours ago",
    userVote: "up",
  },
  {
    id: "3",
    title: "WTB: Magpul MOE stock in FDE",
    content: "Looking for a Magpul MOE stock in flat dark earth. Hoping to pay around $35-40. Let me know what you have!",
    author: "desert_dweller",
    category: "WTB",
    votes: 23,
    commentCount: 8,
    views: 156,
    timestamp: "8 hours ago",
    userVote: null,
  },
  {
    id: "4",
    title: "Streamlight ProTac Rail Mount 2 Review - Best Budget Light?",
    content: "Been running this light for about 6 months now. 625 lumens, bomb-proof construction, and the price is unbeatable. Here's my full review and comparison to more expensive options.",
    author: "GearReviewer",
    category: "Gear Reviews",
    votes: 89,
    commentCount: 34,
    views: 876,
    timestamp: "12 hours ago",
    userVote: null,
  },
  {
    id: "5",
    title: "New ATF ruling on pistol braces - Discussion thread",
    content: "With the new ruling coming into effect, wanted to start a discussion on how everyone is adapting. What are your thoughts on compliance vs SBR registration?",
    author: "LegalEagle2A",
    category: "Legal Transfers",
    votes: 156,
    commentCount: 92,
    views: 2341,
    timestamp: "1 day ago",
    userVote: null,
  },
];

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
              <h3 className="text-lg font-semibold mb-3">About Community</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The new home for gear talk, builds, and community — all legal, all in one place.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Members</span>
                  <span className="font-semibold">12.4k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Online</span>
                  <span className="font-semibold text-primary">847</span>
                </div>
              </div>
              <Button className="w-full mt-4">Join Community</Button>
            </div>

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
                    Gear Reviews
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button variant="ghost" className="w-full justify-start">
                    Legal Transfers
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button variant="ghost" className="w-full justify-start">
                    WTS/WTB
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
