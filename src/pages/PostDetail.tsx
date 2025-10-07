import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Share2, Bookmark } from "lucide-react";
import Header from "@/components/Header";
import VoteButtons from "@/components/VoteButtons";
import Comment from "@/components/Comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const PostDetail = () => {
  const { id } = useParams();

  const post = {
    id: "1",
    title: "WTS: Eotech EXPS3-0 in excellent condition",
    content: "Selling my Eotech EXPS3-0. Barely used, maybe 200 rounds through it. Comes with original box and documentation. Looking for $550 shipped. Can provide more photos upon request.\n\nThis optic has been mounted on my AR but has seen minimal use at the range. Glass is crystal clear, no scratches or blemishes. Battery compartment functions perfectly. I'm upgrading to a different optic system for my setup, hence the sale.\n\nPayment via PayPal G&S. Shipping included in price. Will ship within 24 hours of payment.",
    author: "tactical_trader",
    category: "Optics",
    votes: 47,
    timestamp: "3 hours ago",
    userVote: null,
  };

  const comments = [
    {
      author: "OpticsFan",
      content: "Great optic! I have the same one and it's been rock solid. GLWS!",
      votes: 12,
      timestamp: "2 hours ago",
      userVote: null,
    },
    {
      author: "AR_Builder_23",
      content: "Do you have pictures of the glass clarity? And what's the manufacture date?",
      votes: 8,
      timestamp: "2 hours ago",
      replies: 1,
      userVote: null,
    },
    {
      author: "NewShooter",
      content: "Is this a good optic for someone just getting into red dots? Been looking at these vs Holosun.",
      votes: 5,
      timestamp: "1 hour ago",
      replies: 2,
      userVote: null,
    },
  ];

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
            <VoteButtons votes={post.votes} userVote={post.userVote} />
            
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
          />
          <div className="flex justify-end">
            <Button>Comment</Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {comments.length} Comments
            </h3>
          </div>
          
          <div className="bg-card rounded-lg border border-border divide-y divide-border">
            {comments.map((comment, index) => (
              <div key={index} className="p-6">
                <Comment {...comment} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostDetail;
