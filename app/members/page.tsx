"use client";
import React, { useEffect, useState } from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import { getServerSession, Session } from "next-auth";
import authOptions from "../auth/authOptions";
import { Member, Note } from "@prisma/client";

const Members = () => {
  const [members, setMembers] = useState<(Member & { notes: Note[] })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getServerSession(authOptions);
        if (session?.user?.email) {
          const members = await prisma.member.findMany({
            include: {
              notes: true,
            },
            where: {
              createdBy: session.user.email,
            },
          });
          setMembers(members);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* <p>Members List</p> */}
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
                <Table.Cell>
                  {new Date(member.createdAt).toDateString()}
                </Table.Cell>
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

export default Members;
