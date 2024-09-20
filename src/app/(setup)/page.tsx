import InitialModal from "@/components/models/InitialModal";
import { db } from "@/lib/db";
import initialProfile from "@/lib/initialProfile";
import { redirect } from "next/navigation";

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

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
};

export default SetupPage;
