"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRoot,
} from "@radix-ui/themes";
import Link from "next/link";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { array, string } from "zod";
import { useRouter } from "next/router";

const SimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function Page({}) {
  //const [users, setUsers] = useState<UserForm[]>([]);
  interface UserForm {
    id: number;
    authorId: number;
    firstname: string;
    lastname: string;
    info: string;
    createdAT: string;
    notes: UserNote[];
  }

  interface UserNote {
    id: number;
    description: string;
    authorId: number;
  }

  const { data, error } = useSWR("/api/users", fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  // const {
  //   register,
  //   control,
  //   reset,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<UserForm>({});
  // const onSubmit = handleSubmit(async (data) => {
  //   await axios.post("/api/users/notes", data);

  //   reset();
  // });
  // console.log(onSubmit);
  const eachUserNotes = data.map((user: UserForm) => user.notes);
  //const userOneNotes = eachUser.shift();
  console.log(eachUserNotes);
  console.log(data);
  //console.log(users);
  return (
    <>
      <h1>User detailed notes</h1>
      <TableRoot>
        <TableHeader>
          <Table.Row>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Info</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Notes</TableCell>
          </Table.Row>
        </TableHeader>
        <Table.Body>
          {data.map((user: UserForm) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell>{user.firstname}</Table.Cell>
              <Table.Cell>{user.lastname}</Table.Cell>
              <Table.Cell>{user.info}</Table.Cell>
              <Table.Cell>{user.createdAT}</Table.Cell>
              <Table.Cell>
                <ul>
                  {user.notes.map((note: UserNote) => (
                    <li key={note.id}>
                      <p>Author ID: {note.authorId}</p>
                      <p>Note ID: {note.id}</p>
                      <p>Description: {note.description}</p>
                    </li>
                  ))}
                </ul>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </TableRoot>
      <Button className="">
        <Link href="/users">All Users</Link>
      </Button>
    </>
  );
}
