"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function DemoSignin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleClick() {
    if (isLoading) return;
    router.prefetch("/");

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: "demo@demo.com",
        password: "123demo321",
        redirect: false,
      });

      if (res?.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      size="lg"
      loading={isLoading}
      className="rounded-full"
      onClick={handleClick}
    >
      Demo
    </Button>
  );
}

export default DemoSignin;
