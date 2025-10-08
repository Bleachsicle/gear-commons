import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Share2, Bookmark } from "lucide-react";
import Header from "@/components/Header";
import VoteButtons from "@/components/VoteButtons";
import Comment from "@/components/Comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchPost = async () => {
    if (!id) return;

    const { data: postData, error: postError } = await supabase
      .from("posts")
      .select(`
        *,
        profiles!posts_user_id_fkey(username),
        votes(vote_type, user_id)
      `)
      .eq("id", id)
      .single();

    if (!postError && postData) {
      const { data: { user } } = await supabase.auth.getUser();
      const upvotes = postData.votes?.filter((v: any) => v.vote_type === "up").length || 0;
      const downvotes = postData.votes?.filter((v: any) => v.vote_type === "down").length || 0;
      const userVote = postData.votes?.find((v: any) => v.user_id === user?.id)?.vote_type || null;

      setPost({
        ...postData,
        author: postData.profiles?.username || "Unknown",
        votes: upvotes - downvotes,
        userVote,
        timestamp: new Date(postData.created_at).toLocaleString(),
      });

      // Update view count
      await supabase
        .from("posts")
        .update({ views: postData.views + 1 })
        .eq("id", id);
    }

    const { data: commentsData, error: commentsError } = await supabase
      .from("comments")
      .select(`
        *,
        profiles!comments_user_id_fkey(username),
        votes(vote_type, user_id)
      `)
      .eq("post_id", id)
      .order("created_at", { ascending: false });

    if (!commentsError && commentsData) {
      const { data: { user } } = await supabase.auth.getUser();
      
      const formattedComments = commentsData.map((comment: any) => {
        const upvotes = comment.votes?.filter((v: any) => v.vote_type === "up").length || 0;
        const downvotes = comment.votes?.filter((v: any) => v.vote_type === "down").length || 0;
        const userVote = comment.votes?.find((v: any) => v.user_id === user?.id)?.vote_type || null;

        return {
          id: comment.id,
          author: comment.profiles?.username || "Unknown",
          content: comment.content,
          votes: upvotes - downvotes,
          userVote,
          timestamp: new Date(comment.created_at).toLocaleString(),
        };
      });

      setComments(formattedComments);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to comment",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from("comments").insert({
      post_id: id,
      user_id: user.id,
      content: newComment,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Comment added successfully!",
      });
      setNewComment("");
      fetchPost();
    }

    setIsSubmitting(false);
  };

  if (isLoading || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container max-w-4xl mx-auto px-4 py-6">
          <div className="text-center py-8 text-muted-foreground">Loading post...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4 py-6">
        <Link to="/">
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Feed
          </Button>
        </Link>

        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="flex gap-4">
            <VoteButtons postId={post.id} votes={post.votes} userVote={post.userVote} onVoteChange={fetchPost} />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                  {post.category}
                </Badge>
                <span>Posted by u/{post.author}</span>
                <span>•</span>
                <span>{post.timestamp}</span>
              </div>
              
              <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
              
              <div className="prose prose-invert max-w-none mb-6">
                <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
              </div>
              
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Bookmark className="h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Add a comment</h3>
          <Textarea 
            placeholder="What are your thoughts?" 
            className="mb-3 min-h-[100px] bg-background"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleAddComment} disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Comment"}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {comments.length} Comments
            </h3>
          </div>
          
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border divide-y divide-border">
              {comments.map((comment) => (
                <div key={comment.id} className="p-6">
                  <Comment {...comment} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PostDetail;
