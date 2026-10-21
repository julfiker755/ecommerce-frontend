"use client";
import { useState } from "react";
import Heading from "@/components/reuseable/heading";
import sonner from "@/components/reuseable/sonner";
import TextEditor, { QuillText } from "@/components/reuseable/text-editor";
import { Button } from "@/components/ui";

// ===== Dummy content (replace with API later) =====
const initialContent = `
<p>Your privacy matters to us. This policy explains what information we collect, how we use it and the choices you have.</p>
<p><strong>1. Information we collect</strong></p>
<ul>
  <li>Name, phone number, email and delivery address when you place an order.</li>
  <li>Order history and payment method (we never store card or bKash PIN details).</li>
</ul>
<p><strong>2. How we use your information</strong></p>
<ul>
  <li>To process, deliver and track your orders.</li>
  <li>To contact you about your order or account.</li>
  <li>To send offers only if you subscribe to our newsletter.</li>
</ul>
<p><strong>3. Contact us</strong></p>
<p>If you have any questions about this policy, please contact our support team.</p>
`;

export default function PrivacyPolicy({
  preview = false,
}: {
  preview?: boolean;
}) {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = () => {
    console.log({ title: "Privacy Policy", type: "privacy_policy", content });
    sonner.success("Privacy Policy", "Privacy policy updated successfully");
  };

  if (preview) {
    return (
      <div>
        <Heading variant="h5" className="pb-4">
          Privacy Policy
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
