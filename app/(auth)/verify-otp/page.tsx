"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import sonner from "@/components/reuseable/sonner";
import { AuthHeader } from "@/components/common/landing/auth-header";
import { Button } from "@/components/ui";
import { OtpInput } from "@/components/common/landing/otp-input";

const RESEND_SECONDS = 60;

function VerifyOtpChild() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const type = searchParams.get("type") === "register" ? "register" : "reset";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (code.length !== 6) {
      setError("Please enter the 6 digit code");
      return;
    }
    setIsLoading(true);
    // TODO: connect OTP verify API ({ action: type, email, code })
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);

    if (type === "register") {
      sonner.success("Account verified", "You can now login to your account.");
      router.push("/login");
    } else {
      sonner.success("OTP verified successfully", "Now set your new password.");
      router.push(
        `/new-password?email=${encodeURIComponent(email || "")}&code=${encodeURIComponent(code)}`,
      );
    }
    setCode("");
  };

  const handleResend = async () => {
    // TODO: connect resend OTP API (email)
    setSeconds(RESEND_SECONDS);
    setCode("");
    sonner.info("Code resent", `A new code was sent to ${email || "your email"}.`);
  };

  return (
    <>
      <AuthHeader
        icon={MailCheck}
        title="Verify your email"
        subtitle={
          <>
            We sent a 6 digit code to{" "}
            <span className="font-semibold text-foreground">{email || "your email"}</span>. Enter it
            below to continue.
          </>
        }
      />

      <form onSubmit={handleVerify} className="space-y-6">
        <div>
          <OtpInput
            value={code}
            onChange={(v) => {
              setCode(v);
              setError("");
            }}
            error={!!error}
          />
          {error && <p className="mt-2 text-sm text-sale">{error}</p>}
        </div>

        <Button
          disabled={isLoading || code.length !== 6}
          type="submit"
          size="lg"
          className="h-12 w-full text-base"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : null}
          {isLoading ? "Verifying…" : "Verify Code"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Didn&apos;t receive the code?{" "}
        {seconds > 0 ? (
          <span>
            Resend in <span className="font-semibold tabular-nums text-foreground">0:{String(seconds).padStart(2, "0")}</span>
          </span>
        ) : (
          <Button type="button" variant="link" size="xs" className="h-auto px-0 text-sm" onClick={handleResend}>
            Resend code
          </Button>
        )}
      </p>

      <Button
        variant="ghost"
        className="mt-4 w-full text-muted-foreground"
        nativeButton={false}
        render={<Link href={type === "register" ? "/register" : "/forgot-password"} />}
      >
        <ArrowLeft /> Change email
      </Button>
    </>
  );
}

export default function VerifyOtpParent() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-60 place-items-center">
          <Loader2 className="size-7 animate-spin text-primary" />
        </div>
      }
    >
      <VerifyOtpChild />
    </Suspense>
  );
}
