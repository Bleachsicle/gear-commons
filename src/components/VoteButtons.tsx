import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoteButtonsProps {
  votes: number;
  userVote?: "up" | "down" | null;
  onVote?: (type: "up" | "down") => void;
  orientation?: "vertical" | "horizontal";
}

const VoteButtons = ({ votes, userVote, onVote, orientation = "vertical" }: VoteButtonsProps) => {
  const containerClass = orientation === "vertical" 
    ? "flex flex-col items-center gap-1" 
    : "flex items-center gap-2";

  return (
    <div className={containerClass}>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 transition-colors hover:bg-upvote/10",
          userVote === "up" && "text-upvote bg-upvote/10"
        )}
        onClick={() => onVote?.("up")}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
      <span className={cn(
        "font-semibold text-sm min-w-[2rem] text-center",
        userVote === "up" && "text-upvote",
        userVote === "down" && "text-downvote"
      )}>
        {votes}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 transition-colors hover:bg-downvote/10",
          userVote === "down" && "text-downvote bg-downvote/10"
        )}
        onClick={() => onVote?.("down")}
      >
        <ArrowDown className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default VoteButtons;
