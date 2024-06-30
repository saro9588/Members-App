"use client";
import React, { useState } from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import { member, note } from "@prisma/client";
import { Session } from "next-auth";

interface membersProps {
  members: (member & { notes: note[] })[];
  session: Session | null;
}

const members: React.FC<membersProps> = ({
  members: initialmembers,
  session,
}) => {
  const [members, setMembers] =
    useState<(member & { notes: note[] })[]>(initialmembers);

  const handleDelete = async (memberId: string) => {
    const res = await fetch(`/api/members/${memberId}`, {
      method: "DELETE",
    });
    console.log(memberId);
    console.log(res);
    if (res.ok) {
      setMembers(members.filter((member) => member.id !== memberId));
    } else {
      console.log(memberId);
      console.error("Failed to delete member");
    }
  };

  return (
    <>
      <div>
        <h1>members List</h1>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Sign Up Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Info</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {members.map((member) => (
              <Table.Row key={member.id}>
                <Table.RowHeaderCell>
                  {`${member.firstname} ${member.lastname}`}
                </Table.RowHeaderCell>
                <Table.Cell>
                  {new Date(member.createdAt).toDateString()}
                </Table.Cell>
                <Table.Cell>{member.info}</Table.Cell>
                <Table.Cell>
                  {member.notes.length > 0 ? (
                    member.notes.map((note) =>
                      note.authorId === member.id ? (
                        <div key={note.id}>
                          <Button>
                            <Link href={`/members/${note.id}`}>More</Link>
                          </Button>
                        </div>
                      ) : null
                    )
                  ) : (
                    <Button>
                      <Link href={`/members/${member.id}/notes`}>
                        Take notes
                      </Link>
                    </Button>
                  )}
                  <Button onClick={() => handleDelete(member.id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Button>
          <Link href="/">Dashboard</Link>
        </Button>
      </div>
    </>
  );
};

export default members;
