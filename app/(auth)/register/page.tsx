"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, Mail, UserRound } from "lucide-react";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { ErrorInput } from "@/components/reuseable/errors";
import sonner from "@/components/reuseable/sonner";
import { AuthHeader } from "@/components/common/auth-header";
import { PasswordStrength } from "@/components/common/password-strength";
import { Button, Checkbox } from "@/components/ui";
import { sign_Up } from "@/schema";

const inputStyle = "h-12 border-input bg-card text-foreground";
const labelStyle = "text-sm text-foreground mb-1.5";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState("");
  const form = useForm({
    resolver: zodResolver(sign_Up),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });
  const password = useWatch({ control: form.control, name: "password" });

  const handleSubmit = async (values: FieldValues) => {
    if (!agree) {
      setAgreeError("Please accept the terms to continue");
      return;
    }
    setIsLoading(true);
    // TODO: connect register API (values)
    await new Promise((r) => setTimeout(r, 900));
    setIsLoading(false);
    sonner.success("Account created", "We sent a 6 digit code to your email.");
    router.push(`/verify-otp?email=${encodeURIComponent(values.email)}&type=register`);
    form.reset();
  };

  return (
    <>
      <AuthHeader
        title="Create your account"
        subtitle="Join us for faster checkout, order tracking and exclusive member deals."
      />

      <Form from={form} className="space-y-4" onSubmit={handleSubmit}>
        <FromInput
          label="Full name"
          name="name"
          placeholder="Your full name"
          icon={<UserRound className="size-4.5" />}
          className={inputStyle}
          stylelabel={labelStyle}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FromInput
            label="Phone number"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={11}
            placeholder="01XXXXXXXXX"
            icon={<span className="text-sm font-semibold text-foreground">+88</span>}
            className={`${inputStyle} pl-13`}
            stylelabel={labelStyle}
          />
          <FromInput
            label="Email address"
            name="email"
            type="email"
            placeholder="you@example.com"
            icon={<Mail className="size-4.5" />}
            className={inputStyle}
            stylelabel={labelStyle}
          />
        </div>
        <div>
          <FromInput
            label="Password"
            name="password"
            eye
            placeholder="Create a password"
            icon={<Lock className="size-4.5" />}
            className={inputStyle}
            stylelabel={labelStyle}
          />
          <PasswordStrength password={password} />
        </div>
        <FromInput
          label="Confirm password"
          name="password_confirmation"
          eye
          placeholder="Re-enter your password"
          icon={<Lock className="size-4.5" />}
          className={inputStyle}
          stylelabel={labelStyle}
        />

        <div>
          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-foreground/80">
            <Checkbox
              className="mt-0.5"
              checked={agree}
              onCheckedChange={(v) => {
                setAgree(v);
                setAgreeError("");
              }}
            />
            <span>
              I agree to the{" "}
              <Link href="#" className="font-semibold text-primary hover:underline">
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link href="#" className="font-semibold text-primary hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          <ErrorInput error={agreeError} className="mt-1 justify-start text-sm text-sale" />
        </div>

        <Button disabled={isLoading} type="submit" size="lg" className="h-12 w-full text-base">
          {isLoading ? <Loader2 className="animate-spin" /> : null}
          {isLoading ? "Creating account…" : "Create Account"}
        </Button>
      </Form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </>
  );
}
