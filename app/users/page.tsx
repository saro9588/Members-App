import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";

const AllUsers = async () => {
  const users = await prisma.user.findMany();

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
                  {
                    <Button>
                      <Link href={`/users/${user.id}`}>More</Link>
                    </Button>
                  }
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
