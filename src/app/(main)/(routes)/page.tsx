import initialProfile from "@/lib/initialProfile";
import { RedirectToSignIn } from "@clerk/nextjs";

type Profile = {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

const SetupPage = async () => {
  const profile = (await initialProfile()) as Profile;

  if (!profile) return RedirectToSignIn;

  return <div>Home page</div>;
};

export default SetupPage;
