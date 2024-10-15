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
  registerSchema,
  type RegisterSchemaType,
} from "@/lib/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { register } from "@/server/actions/register";
import { useAction } from "next-safe-action/hooks";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

function RegisterForm() {
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { executeAsync } = useAction(register, {
    onSuccess: async ({ data }) => {
      const res = await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/");
        router.refresh();
      } else {
        if (res?.status === 401) {
          setError("Invalid credentials");
        } else {
          setError("Something went wrong");
        }
      }

      setIsSigningIn(false);
    },
    onError: ({ error }) => {
      if (error.validationErrors) {
        setError("Please fill in all fields.");
      } else {
        setError("Something went wrong");
      }
      setIsSigningIn(false);
    },
  });

  async function onSubmit(values: RegisterSchemaType) {
    if (isSigningIn) return;

    setError("");
    setIsSigningIn(true);
    await executeAsync(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input
                  placeholder="First name"
                  {...field}
                  autoComplete="given-name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Last name"
                  {...field}
                  autoComplete="family-name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
          className="mt-2"
          aria-disabled={isSigningIn}
          loading={isSigningIn}
          disabled
        >
          {isSigningIn ? "Loading..." : "Register"}
        </Button>

        <div className="text-center text-sm font-semibold">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign in here
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default RegisterForm;
