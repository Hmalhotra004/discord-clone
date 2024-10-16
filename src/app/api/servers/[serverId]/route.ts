import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
  try {
    const profile = await currentProfile();

    const { name, imageUrl } = await req.json();

    if (!profile) return new NextResponse("Unauthorized User", { status: 401 });

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("[SERVER_ID_PATCH]", err);
    return new NextResponse("Internal Error", { status: 50 });
  }
}
