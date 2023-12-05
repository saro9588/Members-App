import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";

const AllUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      notes: true,
    },
  });

  return (
    <>
      <div>
        <h1>User List</h1>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Sign Up Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Info</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.RowHeaderCell>
                  <Link
                    href={`/users/${user.id}`}
                  >{`${user.firstname} ${user.lastname}`}</Link>
                </Table.RowHeaderCell>
                <Table.Cell>{user.createdAT.toDateString()}</Table.Cell>
                <Table.Cell>{user.info}</Table.Cell>
                <Table.Cell>
                  {user.notes.length > 0 ? (
                    user.notes.map((note) => (
                      <div key={note.id}>
                        <Button>
                          <Link href={`/users/${note.authorId}`}>More</Link>
                        </Button>
                      </div>
                    ))
                  ) : (
                    <Button>
                      <Link href={`/users/${user.id}/notes`}>Take Notes</Link>
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

export default AllUsers;
