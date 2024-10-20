import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { channelId: string } }) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);

    if (!profile) return new NextResponse("Unauthorized User", { status: 401 });

    const serverId = searchParams.get("serverId");

    if (!serverId) return new NextResponse("ServerId Missing", { status: 400 });

    if (!params.channelId) return new NextResponse("channelId Missing", { status: 400 });

    if (name === "general") return new NextResponse("Name cannot be general", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelId,
              NOT: {
                name: "general",
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("[CHANNEL_ID_PATCH]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { channelId: string } }) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    if (!profile) return new NextResponse("Unauthorized User", { status: 401 });

    const serverId = searchParams.get("serverId");

    if (!serverId) return new NextResponse("ServerId Missing", { status: 400 });

    if (!params.channelId) return new NextResponse("channelId Missing", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("[CHANNEL_ID_DELETE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
