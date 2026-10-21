"use client";
import NavTitle from "@/components/reuseable/nav-title";
import PrivacyPolicy from "@/components/common/admin/privacy-policy";

export default function PrivacyPolicyPage() {
  return (
    <div>
      <NavTitle title="Privacy Policy" subTitle="Manage your store privacy policy content." />
      <PrivacyPolicy />
    </div>
  );
}
