import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!session.user.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res
      .status(400)
      .json({ error: "Bad Request: Missing or invalid ID" });
  }

  switch (req.method) {
    case "DELETE":
      try {
        const userEmail = session.user.email;
        const member = await prisma.member.findUnique({
          where: { id },
          include: { notes: true },
        });

        if (!member) {
          return res.status(404).json({ error: "Member not found" });
        }

        if (member.createdBy !== userEmail) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        await prisma.member.delete({
          where: { id },
        });

        return res.status(200).json({ message: "Member deleted successfully" });
      } catch (error) {
        console.error("Error deleting member:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    default:
      res.setHeader("Allow", ["DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
