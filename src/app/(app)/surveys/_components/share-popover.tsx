"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  TwitterShareButton,
  FacebookShareButton,
  FacebookIcon,
  XIcon,
} from "react-share";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Share2 } from "lucide-react";
import { useState } from "react";

function SharePopover({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/survey/${id}`
      : "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share survey</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex gap-2">
        <CopyToClipboard url={url} setOpen={setOpen} />
        <TwitterShareButton url={url} title="Check out this survey!">
          <span className="sr-only">Share on Twitter</span>
          <XIcon className="size-16 rounded" />
        </TwitterShareButton>
        <FacebookShareButton url={url}>
          <span className="sr-only">Share on Facebook</span>
          <FacebookIcon className="size-16 rounded" />
        </FacebookShareButton>
      </PopoverContent>
    </Popover>
  );
}

export default SharePopover;

function CopyToClipboard({
  url,
  setOpen,
}: {
  url: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      toast("Survey link copied to clipboard");
    } catch (error) {
      console.log(error);
      toast("Survey link url could not be copied");
    } finally {
      setOpen(false);
    }
  }

  return (
    <Button className="size-16 border-0" onClick={handleCopy}>
      <span className="sr-only">Copy to clipboard</span>
      <Copy />
    </Button>
  );
}
