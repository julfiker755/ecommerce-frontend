import NavTitle from '@/components/reuseable/nav-title';
import { ChangePassword } from '@/components/common/landing/change-password';
import { ProfileInfo } from '@/components/common/landing/profile-info';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <NavTitle title="My Profile" subTitle="Manage your account details and password." />
      <ProfileInfo />
      <ChangePassword />
    </div>
  );
}
