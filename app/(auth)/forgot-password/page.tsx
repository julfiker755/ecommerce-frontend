"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {KeyRound, Loader2, Mail } from "lucide-react";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import sonner from "@/components/reuseable/sonner";
import { AuthHeader } from "@/components/common/landing/auth-header";
import { Button } from "@/components/ui";
import { forgot_Pass } from "@/schema";

export default function ForgotPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(forgot_Pass),
    defaultValues: {
      email: "",
    },
  });

  const handlePasswordSubmit = async (values: FieldValues) => {
    setIsLoading(true);
    // TODO: connect forgot password API (values.email)
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    sonner.success("OTP sent successfully", "Check your email for the 6 digit code.");
    router.push(`/verify-otp?email=${encodeURIComponent(values.email)}&type=reset`);
    form.reset();
  };

  return (
    <>
      <AuthHeader
        icon={KeyRound}
        title="Forgot password?"
        subtitle="No worries! Enter the email linked to your account and we'll send you a verification code."
      />

      <Form from={form} className="space-y-5" onSubmit={handlePasswordSubmit}>
        <FromInput
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          icon={<Mail className="size-4.5" />}
        />
        <Button disabled={isLoading} type="submit" size="lg" className="h-12 w-full text-base">
          {isLoading ? <Loader2 className="animate-spin" /> : null}
          {isLoading ? "Sending code…" : "Send Verification Code"}
        </Button>
      </Form>
    </>
  );
}
