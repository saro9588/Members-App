"use client";
import React, { useState } from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import { member, note } from "@prisma/client";
import { Session } from "next-auth";

interface MembersProps {
  members: (member & { notes: note[] })[];
  session: Session | null;
}

const Members: React.FC<MembersProps> = ({
  members: initialMembers,
  session,
}) => {
  const [members, setMembers] =
    useState<(member & { notes: note[] })[]>(initialMembers);

  const handleDelete = async (memberId: string) => {
    const res = await fetch(`/api/members/${memberId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setMembers(members.filter((member) => member.id !== memberId));
    } else {
      console.log(memberId);
      console.error("Failed to delete member");
    }
  };

  return (
    <>
      <div className="mx-auto max-w-screen-lg gap-2">
        <h1>Members List</h1>
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
                  <div className="flex gap-2">
                    {member.notes.length > 0 ? (
                      member.notes.map((note) =>
                        note.authorId === member.id ? (
                          <div key={note.id}>
                            <Button className="w-24">
                              <Link href={`/members/${note.id}`}>More</Link>
                            </Button>
                          </div>
                        ) : null
                      )
                    ) : (
                      <Button className="w-24">
                        <Link href={`/members/${member.id}/notes`}>
                          Take Notes
                        </Link>
                      </Button>
                    )}
                    <Button
                      className="w-24"
                      onClick={() => handleDelete(member.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </>
  );
};

export default Members;
