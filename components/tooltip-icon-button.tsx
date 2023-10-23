import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const TooltipIconButton = ({
  icon,
  tooltipText,
  onClick,
}: {
  icon: React.ReactNode;
  tooltipText: string;
  onClick?: () => void;
}) => {
  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="pointer-events-auto h-6 w-6 shrink-0 hover:bg-neutral-300/80 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-50"
            size="icon"
            onClick={onClick}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="mb-0.5 animate-none select-none px-2 py-1 text-xs shadow-sm duration-0 data-[state=closed]:animate-none data-[state=closed]:duration-0 data-[state=closed]:fade-out-100 data-[state=closed]:zoom-out-100 data-[side=top]:slide-in-from-bottom-0 dark:bg-neutral-950">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
