// app/members/page.js
import React from "react";
import Members from "../components/Members";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

const MembersPage = async () => {
  const session = await getServerSession(authOptions);
  const members = await prisma.member.findMany({
    include: {
      notes: true,
    },
    where: {
      createdBy: session?.user?.email || "",
    },
  });

  return <Members members={members} session={session} />;
};

export const dynamic = "force-dynamic";
export default MembersPage;
