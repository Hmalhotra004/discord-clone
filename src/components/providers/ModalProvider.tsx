"use client";

import CreateChannelModal from "@/components/modals/CreateChannelModal";
import CreateServerModal from "@/components/modals/CreateServerModal";
import DeleteChannelModal from "@/components/modals/DeleteChannelModal";
import DeleteServerModal from "@/components/modals/DeleteServerModal";
import EditChannelModal from "@/components/modals/EditChannelModal";
import EditServerModal from "@/components/modals/EditServerModal";
import InviteModal from "@/components/modals/InviteModal";
import LeaveServerModal from "@/components/modals/LeaveServerModal";
import MembersModal from "@/components/modals/MembersModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
    </>
  );
};

export default ModalProvider;
