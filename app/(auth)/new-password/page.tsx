"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Lock, ShieldCheck } from "lucide-react";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import sonner from "@/components/reuseable/sonner";
import { AuthHeader } from "@/components/common/landing/auth-header";
import { Button } from "@/components/ui";
import { new_Pass } from "@/schema";



function NewPasswordChild() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");
  const [isLoading, setIsLoading] = useState(false);
  const from = useForm({
    resolver: zodResolver(new_Pass),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });
  const password = useWatch({ control: from.control, name: "password" });

  const handleSubmit = async (values: FieldValues) => {
    setIsLoading(true);
    const payload = { email, code, ...values };
    // TODO: send payload to reset password API
    void payload;
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    sonner.success("Password updated successfully", "Login with your new password.");
    router.push("/login");
    from.reset();
  };

  return (
    <>
      <AuthHeader
        icon={ShieldCheck}
        title="Set new password"
        subtitle="Your new password must be different from previously used passwords."
      />

      <Form from={from} className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <FromInput
            name="password"
            label="New password"
            placeholder="Enter new password"
            eye
            icon={<Lock className="size-4.5" />}
          />
        </div>
        <FromInput
          name="password_confirmation"
          label="Confirm password"
          placeholder="Re-enter new password"
          eye
          icon={<Lock className="size-4.5" />}
        />

        <Button disabled={isLoading} type="submit" size="lg" className="h-12 w-full text-base">
          {isLoading ? <Loader2 className="animate-spin" /> : null}
          {isLoading ? "Updating…" : "Update Password"}
        </Button>
      </Form>
    </>
  );
}

export default function NewPassword() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-60 place-items-center">
          <Loader2 className="size-7 animate-spin text-primary" />
        </div>
      }
    >
      <NewPasswordChild />
    </Suspense>
  );
}
