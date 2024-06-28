import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";
import { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { Member, Note } from "@prisma/client";

interface MembersProps {
  members: (Member & { notes: Note[] })[];
  session: Session | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const members = await prisma.member.findMany({
    include: {
      notes: true,
    },
    where: {
      createdBy: session?.user?.email || "",
    },
  });

  return {
    props: {
      members,
      session,
    },
  };
};

const Members: NextPage<MembersProps> = ({ members }) => {
  return (
    <div>
      <h1>Members List</h1>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Sign Up Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Info</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {members.map((member) => (
            <Table.Row key={member.id}>
              <Table.RowHeaderCell>{`${member.firstname} ${member.lastname}`}</Table.RowHeaderCell>
              <Table.Cell>
                {new Date(member.createdAt).toDateString()}
              </Table.Cell>
              <Table.Cell>{member.info}</Table.Cell>
              <Table.Cell>
                {member.notes.length > 0 ? (
                  member.notes.map((note) => (
                    <div key={note.id}>
                      <Link href={`/members/${note.id}`}>
                        <Button>More</Button>
                      </Link>
                    </div>
                  ))
                ) : (
                  <Link href={`/members/${member.id}/notes`}>
                    <Button>Take Notes</Button>
                  </Link>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Link href="/">
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
};

export default Members;
