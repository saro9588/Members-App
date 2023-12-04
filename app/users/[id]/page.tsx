"use client";
import { Note } from "@prisma/client";
import { Button, TextArea } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

const createUserNotes = ({
  params: { id, note, authorId },
}: {
  params: { id: number; note: Note; authorId: number };
}) => {
  interface UserNote {
    id: number;
    description: string;
    authorId: number;
  }

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserNote>({});
  const onSubmit = handleSubmit(async (data) => {
    await axios.post(`/users/${note.id}`, data);
    reset();
  });

  console.log();

  return (
    <>
      <form onSubmit={onSubmit}>
        <TextArea
          {...register("description", {
            required: "This is required.",
          })}
          placeholder="Notes..."
        />
        <Button type="submit">Submit</Button>
      </form>
      <Button>
        {" "}
        <Link href={`/users/${id}/notes`}>User Notes</Link>
      </Button>
    </>
  );
};

export default createUserNotes;

// import React from "react";
// import prisma from "@/prisma/client";
// import { notFound } from "next/navigation";
// import Link from "next/link";
// import "easymde/dist/easymde.min.css";
// import { Button } from "@radix-ui/themes";

// interface Props {
//   params: { id: string };
// }

// export default async function Page({ params }: Props) {
//   const note = await prisma.note.findUnique({
//     where: { id: parseInt(params.id) },
//   });
//   if (!note) notFound();

//   return (
//     <>
//       <h1>User detailed notes</h1>
//       <div>
//         <p>{note.authorId}</p>
//         <p>{note.description}</p>
//         <p>{note.id}</p>
//       </div>
//       <Button className="">
//         <Link href="/users">All Users</Link>
//       </Button>
//     </>
//   );
// }
