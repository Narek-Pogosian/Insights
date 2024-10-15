"use client";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  signInSchema,
  type SignInSchemaType,
} from "@/lib/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

function SignInForm() {
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    if (isSigningIn) return;
    setIsSigningIn(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res) throw Error;
      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        if (res.status === 401) {
          setError("Invalid credentials");
        } else {
          setError("Something went wrong");
        }
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsSigningIn(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} autoComplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          loading={isSigningIn}
          className="mt-2"
          aria-disabled={isSigningIn}
          disabled
        >
          {isSigningIn ? "Loading..." : "Sign in"}
        </Button>

        <div className="text-center text-sm font-semibold">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Register here
          </Link>
        </div>
      </form>
      <Button
        className="mt-8 w-full"
        variant="outline"
        loading={isSigningIn}
        onClick={() =>
          onSubmit({ email: "demo@demo.com", password: "123demo321" })
        }
      >
        {isSigningIn ? "Loading..." : "Demo Account"}
      </Button>
    </Form>
  );
}

export default SignInForm;
