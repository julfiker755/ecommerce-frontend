import NavTitle from '@/components/reuseable/nav-title';
import { ProfileInfo } from '@/components/common/profile-info';
import { ChangePassword } from '@/components/common/change-password';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <NavTitle title="My Profile" subTitle="Manage your account details and password." />
      <ProfileInfo />
      <ChangePassword />
    </div>
  );
}
