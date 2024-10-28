"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface Props {
  icon?: boolean;
}

function Signout({ icon }: Props) {
  if (icon) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="max-md:hidden"
        onClick={() => signOut()}
      >
        <LogOut className="size-5" />
        <span className="sr-only">Signout</span>
      </Button>
    );
  }

  return (
    <Button variant="ghost" onClick={() => signOut()}>
      <LogOut className="mr-2 size-5" />
      Signout
    </Button>
  );
}

export default Signout;
