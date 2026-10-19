"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, Mail } from "lucide-react";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import sonner from "@/components/reuseable/sonner";
import { AuthHeader } from "@/components/common/auth-header";
import { Button, Checkbox } from "@/components/ui";
import { sign_In } from "@/schema";




export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(true);
  const form = useForm({
    resolver: zodResolver(sign_In),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    setIsLoading(true);
    // TODO: connect login API ({ ...values, remember })
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    sonner.success("Login successful", `Welcome back, ${values.email}`);
    form.reset();
    router.push("/");
  };

  const handleGoogleLogin = () => {
    // TODO: connect Google OAuth (redirect to your backend's Google login URL)
    sonner.info("Google login", "Google sign-in will be available soon.");
  };

  return (
    <>
      <AuthHeader
        title="Welcome back 👋"
        subtitle="Login to track your orders, save your wishlist and checkout faster."
      />

      <Form from={form} className="space-y-5" onSubmit={handleSubmit}>
        <FromInput
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          icon={<Mail className="size-4.5" />}
        
        />
        <div>
          <FromInput
            label="Password"
            name="password"
            eye
            placeholder="Enter your password"
            icon={<Lock className="size-4.5" />}
          
          />
          <div className="mt-3 flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-foreground/80">
              <Checkbox checked={remember} onCheckedChange={setRemember} />
              Remember me
            </label>
            <Link href="/forgot-password" className="font-semibold text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button disabled={isLoading} type="submit" size="lg" className="h-12 w-full text-base">
          {isLoading ? <Loader2 className="animate-spin" /> : null}
          {isLoading ? "Logging in…" : "Login"}
        </Button>
      </Form>

      <Divider />

      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-12 w-full bg-white"
        onClick={handleGoogleLogin}
      >
        <GoogleIcon /> Continue with Google
      </Button>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Create account
        </Link>
      </p>
    </>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.5 5.5 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.29 14.28A7.2 7.2 0 0 1 4.91 12c0-.79.14-1.56.38-2.28v-3.1H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.38l4.01-3.1Z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.62l4.01 3.1C6.23 6.88 8.88 4.77 12 4.77Z" />
    </svg>
  );
}

function Divider() {
  return (
    <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
      <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
    </div>
  );
}
