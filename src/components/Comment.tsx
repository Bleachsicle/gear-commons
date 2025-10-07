import { MessageSquare, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoteButtons from "./VoteButtons";

interface CommentProps {
  author: string;
  content: string;
  votes: number;
  timestamp: string;
  replies?: number;
  userVote?: "up" | "down" | null;
  depth?: number;
}

const Comment = ({ 
  author, 
  content, 
  votes, 
  timestamp, 
  replies = 0,
  userVote,
  depth = 0 
}: CommentProps) => {
  return (
    <div className={`flex gap-3 ${depth > 0 ? 'ml-8 border-l-2 border-border pl-4' : ''}`}>
      <VoteButtons votes={votes} userVote={userVote} />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium">{author}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-foreground mb-3">{content}</p>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
            <MessageSquare className="h-3 w-3" />
            Reply
          </Button>
          {replies > 0 && (
            <span className="text-xs text-muted-foreground">
              {replies} {replies === 1 ? 'reply' : 'replies'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
