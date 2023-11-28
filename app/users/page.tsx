"use client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface UserForm {
  id: number;
  firstName: string;
  lastName: string;
  notes: string;
}

const AllUsers = () => {
  const [users, setUsers] = useState<UserForm[]>([]); // Specify the type for users as UserForm[]

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div>
        <h1>User List</h1>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Age</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Notes</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.RowHeaderCell>{`${user.firstName} ${user.lastName}`}</Table.RowHeaderCell>
                <Table.Cell>{user.lastName}</Table.Cell>
                <Table.Cell>{user.notes}</Table.Cell>
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
