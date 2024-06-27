import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

const Members = async () => {
  const session = await getServerSession(authOptions);
  const members = await prisma.member.findMany({
    include: {
      notes: true,
    },
    where: {
      createdBy: session?.user?.email || "",
    },
  });

  return (
    <>
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
                <Table.RowHeaderCell>
                  {`${member.firstname} ${member.lastname}`}
                </Table.RowHeaderCell>
                <Table.Cell>{member.createdAt.toDateString()}</Table.Cell>
                <Table.Cell>{member.info}</Table.Cell>
                <Table.Cell>
                  {member.notes.length > 0 ? (
                    member.notes.map((note) => (
                      <div key={note.id}>
                        <Button onClick={() => console.log(note.id)}>
                          <Link href={`/members/${note.id}`}>More</Link>
                        </Button>
                      </div>
                    ))
                  ) : (
                    <Button>
                      <Link href={`/members/${member.id}/notes`}>
                        Take Notes
                      </Link>
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>

      <Button>
        <Link href="/">Dashboard</Link>
      </Button>
    </>
  );
};
//export const dynamic = "force-dynamic";

export const dynamic = "force-dynamic";
export default Members;
