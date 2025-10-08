import { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface VoteButtonsProps {
  postId?: string;
  votes: number;
  userVote?: "up" | "down" | null;
  onVoteChange?: () => void;
  orientation?: "vertical" | "horizontal";
}

const VoteButtons = ({ postId, votes, userVote, onVoteChange, orientation = "vertical" }: VoteButtonsProps) => {
  const [currentVote, setCurrentVote] = useState(userVote);
  const [voteCount, setVoteCount] = useState(votes);
  const { toast } = useToast();

  const containerClass = orientation === "vertical" 
    ? "flex flex-col items-center gap-1" 
    : "flex items-center gap-2";

  const handleVote = async (type: "up" | "down") => {
    if (!postId) return;

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to vote",
        variant: "destructive",
      });
      return;
    }

    // Calculate new vote value
    let newVoteCount = voteCount;
    let newVote: "up" | "down" | null = type;

    if (currentVote === type) {
      // Remove vote
      newVote = null;
      newVoteCount += type === "up" ? -1 : 1;
      
      await supabase
        .from("votes")
        .delete()
        .eq("user_id", user.id)
        .eq("post_id", postId);
    } else if (currentVote) {
      // Change vote
      newVoteCount += type === "up" ? 2 : -2;
      
      await supabase
        .from("votes")
        .update({ vote_type: type })
        .eq("user_id", user.id)
        .eq("post_id", postId);
    } else {
      // Add new vote
      newVoteCount += type === "up" ? 1 : -1;
      
      await supabase
        .from("votes")
        .insert({
          user_id: user.id,
          post_id: postId,
          vote_type: type,
        });
    }

    setCurrentVote(newVote);
    setVoteCount(newVoteCount);
    onVoteChange?.();
  };

  return (
    <div className={containerClass}>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 transition-colors hover:bg-upvote/10",
          currentVote === "up" && "text-upvote bg-upvote/10"
        )}
        onClick={() => handleVote("up")}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
      <span className={cn(
        "font-semibold text-sm min-w-[2rem] text-center",
        currentVote === "up" && "text-upvote",
        currentVote === "down" && "text-downvote"
      )}>
        {voteCount}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 transition-colors hover:bg-downvote/10",
          currentVote === "down" && "text-downvote bg-downvote/10"
        )}
        onClick={() => handleVote("down")}
      >
        <ArrowDown className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default VoteButtons;
