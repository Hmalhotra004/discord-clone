import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const profile = await db.profile.findUnique({
    where: {
      userId: userId,
    },
  });

  return profile;
};

export default currentProfile;
