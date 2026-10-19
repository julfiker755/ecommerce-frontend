'use client';
import { useState } from 'react';
import { FieldValues, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Loader2, Lock } from 'lucide-react';
import Form from '@/components/reuseable/from';
import { FromInput } from '@/components/reuseable/from-input';
import sonner from '@/components/reuseable/sonner';
import { Button } from '@/components/ui/button';
import { PasswordStrength } from '../password-strength';
import { change_Pass } from '@/schema';

const inputStyle = 'h-11 border-input bg-card text-foreground';
const labelStyle = 'text-sm text-foreground mb-1.5';

export function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(change_Pass),
    defaultValues: { current_password: '', password: '', password_confirmation: '' },
  });
  const password = useWatch({ control: form.control, name: 'password' });

  const handleSubmit = async (values: FieldValues) => {
    setIsLoading(true);
    // TODO: connect change password API (values)
    void values;
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    form.reset();
    sonner.success('Password changed', 'Use your new password next time you login.');
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary">
          <KeyRound className="size-5" />
        </span>
        <div>
          <h2 className="font-semibold text-foreground">Change password</h2>
          <p className="text-sm text-muted-foreground">Keep your account secure with a strong password.</p>
        </div>
      </div>

      <Form from={form} onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FromInput
            name="current_password"
            label="Current password"
            eye
            placeholder="Enter current password"
            icon={<Lock className="size-4.5" />}
            className={inputStyle}
            stylelabel={labelStyle}
          />
        </div>
        <div>
          <FromInput
            name="password"
            label="New password"
            eye
            placeholder="Enter new password"
            icon={<Lock className="size-4.5" />}
            className={inputStyle}
            stylelabel={labelStyle}
          />
          <PasswordStrength password={password} />
        </div>
        <FromInput
          name="password_confirmation"
          label="Confirm new password"
          eye
          placeholder="Re-enter new password"
          icon={<Lock className="size-4.5" />}
          className={inputStyle}
          stylelabel={labelStyle}
        />
        <div className="sm:col-span-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />} Update password
          </Button>
        </div>
      </Form>
    </div>
  );
}
