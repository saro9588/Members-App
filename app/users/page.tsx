"use client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface UserForm {
  id: number;
  firstname: string;
  lastname: string;
  info: string;
  createdAT: string;
}

const AllUsers = () => {
  const [users, setUsers] = useState<UserForm[]>([]); // Specify the type for users as UserForm[]

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  console.log(users);

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
                <Table.RowHeaderCell>{`${user.firstname} ${user.lastname}`}</Table.RowHeaderCell>
                <Table.Cell>{user.createdAT}</Table.Cell>
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
