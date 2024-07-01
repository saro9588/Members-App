"use client";
import React, { useState } from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import { member, note } from "@prisma/client";
import { Session } from "next-auth";
import { FaTrash, FaPencilAlt, FaInfoCircle } from "react-icons/fa";

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
        <h1 style={{ fontWeight: "bold" }}>Members List</h1>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Registered</Table.ColumnHeaderCell>
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
                  {new Date(member.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                  })}
                </Table.Cell>
                <Table.Cell>{member.info}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    {member.notes.length > 0 ? (
                      member.notes.map((note) =>
                        note.authorId === member.id ? (
                          <div key={note.id}>
                            <Link href={`/members/${note.id}`}>
                              <Button>
                                <FaInfoCircle />
                              </Button>
                            </Link>
                          </div>
                        ) : null
                      )
                    ) : (
                      <Link href={`/members/${member.id}/notes`}>
                        <Button>
                          <FaPencilAlt />
                        </Button>
                      </Link>
                    )}
                    <Button onClick={() => handleDelete(member.id)}>
                      <FaTrash />
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
