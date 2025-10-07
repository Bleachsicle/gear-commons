import { Link } from "react-router-dom";
import { MessageSquare, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VoteButtons from "./VoteButtons";
import { cn } from "@/lib/utils";

interface PostCardProps {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  votes: number;
  commentCount: number;
  views: number;
  timestamp: string;
  image?: string;
  userVote?: "up" | "down" | null;
}

const PostCard = ({
  id,
  title,
  content,
  author,
  category,
  votes,
  commentCount,
  views,
  timestamp,
  image,
  userVote,
}: PostCardProps) => {
  return (
    <div className="group bg-card rounded-lg border border-border hover:border-primary/50 transition-all hover-lift overflow-hidden">
      <div className="flex gap-3 p-4">
        <VoteButtons votes={votes} userVote={userVote} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                  {category}
                </Badge>
                <span>Posted by u/{author}</span>
                <span>•</span>
                <span>{timestamp}</span>
              </div>
              
              <Link to={`/post/${id}`}>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {title}
                </h3>
              </Link>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {content}
              </p>
              
              {image && (
                <div className="mb-3 rounded-md overflow-hidden">
                  <img 
                    src={image} 
                    alt={title}
                    className="w-full max-h-64 object-cover"
                  />
                </div>
              )}
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Link to={`/post/${id}`}>
                  <Button variant="ghost" size="sm" className="gap-2 h-8">
                    <MessageSquare className="h-4 w-4" />
                    {commentCount} Comments
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="gap-2 h-8">
                  <Eye className="h-4 w-4" />
                  {views} Views
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 h-8">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
