import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Clock, Flame } from "lucide-react";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { CreatePostDialog } from "@/components/CreatePostDialog";

const Index = () => {
  const [sortBy, setSortBy] = useState("trending");
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    setIsLoading(true);
    
    let query = supabase
      .from("posts")
      .select(`
        *,
        profiles!posts_user_id_fkey(username),
        votes(vote_type),
        comments(count)
      `);

    if (sortBy === "new") {
      query = query.order("created_at", { ascending: false });
    } else if (sortBy === "top") {
      query = query.order("views", { ascending: false });
    }

    const { data, error } = await query;

    if (!error && data) {
      const formattedPosts = data.map((post: any) => {
        const upvotes = post.votes?.filter((v: any) => v.vote_type === "up").length || 0;
        const downvotes = post.votes?.filter((v: any) => v.vote_type === "down").length || 0;
        
        return {
          id: post.id,
          title: post.title,
          content: post.content,
          author: post.profiles?.username || "Unknown",
          category: post.category,
          votes: upvotes - downvotes,
          commentCount: post.comments?.[0]?.count || 0,
          views: post.views,
          timestamp: new Date(post.created_at).toLocaleString(),
          userVote: null,
        };
      });
      setPosts(formattedPosts);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

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
              
              <CreatePostDialog onPostCreated={fetchPosts} />
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading posts...</div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No posts yet. Be the first to create one!</div>
              ) : (
                posts.map((post) => (
                  <PostCard key={post.id} {...post} />
                ))
              )}
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
