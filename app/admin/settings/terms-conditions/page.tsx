"use client";
import NavTitle from "@/components/reuseable/nav-title";
import TermsConditions from "@/components/common/admin/terms-conditions";

export default function TermsConditionsPage() {
  return (
    <div>
      <NavTitle title="Terms & Conditions" subTitle="Manage your store terms and conditions content." />
      <TermsConditions />
    </div>
  );
}
