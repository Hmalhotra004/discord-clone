import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import getOrCreateConversation from "@/lib/conversation";
import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
}

const MemberIdPage = async ({ params }: MemberIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) return auth().redirectToSignIn();

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) return redirect("/");

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) return redirect(`/servers/${params.serverId}`);

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-ebony flex flex-col h-full">
      <ChatHeader
        name={otherMember.profile.name}
        imageUrl={otherMember.profile.imageUrl}
        serverId={params.serverId}
        type="conversation"
      />
      <ChatMessages
        member={currentMember}
        name={currentMember.profile.name}
        chatId={conversation.id}
        type="conversation"
        apiUrl="/api/direct-messages"
        socketUrl="/api/socket/direct-messages"
        paramKey="conversationId"
        paramValue={conversation.id}
        socketQuery={{
          conversationId: conversation.id,
        }}
      />
      <ChatInput
        apiUrl="/api/socket/direct-messages"
        name={otherMember.profile.name}
        query={{
          conversationId: conversation.id,
        }}
        type="conversation"
      />
    </div>
  );
};

export default MemberIdPage;
