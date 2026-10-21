"use client";
import { useState } from "react";
import Heading from "@/components/reuseable/heading";
import sonner from "@/components/reuseable/sonner";
import TextEditor, { QuillText } from "@/components/reuseable/text-editor";
import { Button } from "@/components/ui";

// ===== Dummy content (replace with API later) =====
const initialContent = `
<p>By using our website and placing an order, you agree to the following terms and conditions.</p>
<p><strong>1. Orders</strong></p>
<ul>
  <li>All orders are subject to product availability and confirmation.</li>
  <li>We may cancel an order if the product is out of stock or the details are incorrect.</li>
</ul>
<p><strong>2. Pricing &amp; payment</strong></p>
<ul>
  <li>Prices are shown in BDT and may change without prior notice.</li>
  <li>We accept bKash, Nagad, card and Cash on Delivery.</li>
</ul>
<p><strong>3. Delivery</strong></p>
<ul>
  <li>Delivery time depends on your location and is usually 2–5 working days.</li>
  <li>Delivery charge is added at checkout.</li>
</ul>
<p><strong>4. Returns &amp; refunds</strong></p>
<p>Unused products in original packaging can be returned within 7 days of delivery.</p>
`;

export default function TermsConditions({
  preview = false,
}: {
  preview?: boolean;
}) {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = () => {
    console.log({ title: "Terms & Conditions", type: "terms_conditions", content });
    sonner.success("Terms & Conditions", "Terms & conditions updated successfully");
  };

  if (preview) {
    return (
      <div>
        <Heading variant="h5" className="pb-4">
          Terms &amp; Conditions
        </Heading>
        <QuillText text={content} />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-5 space-y-4">
        <TextEditor value={content} onChange={setContent} />

        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="rounded-md">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
