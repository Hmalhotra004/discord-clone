import { ServerSidebar } from "@/components/server/ServerSidebar";
import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
  params: { serverId: string };
}

const ServerIdlayout = async ({ children, params }: Props) => {
  const profile = await currentProfile();

  if (!profile) return RedirectToSignIn;

  const server = await db.server.findFirst({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) return redirect("/");

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdlayout;
