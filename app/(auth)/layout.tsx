import { AuthShell } from "@/components/common/landing/auth-shell";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthShell>{children}</AuthShell>;
}
