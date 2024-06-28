import React from "react";
import Members from "../components/Members";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

const MembersPage = async () => {
  let session = null;
  let members: ({
    notes: { id: string; description: string; authorId: string }[];
  } & {
    id: string;
    firstname: string;
    lastname: string;
    info: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
  })[] = [];

  try {
    session = await getServerSession(authOptions);

    if (session?.user?.email) {
      members = await prisma.member.findMany({
        include: {
          notes: true,
        },
        where: {
          createdBy: session.user.email,
        },
      });
    }
  } catch (error) {
    console.error("Error fetching session or members:", error);
  }

  return <Members members={members} session={session} />;
};

export const dynamic = "force-dynamic";
export default MembersPage;
