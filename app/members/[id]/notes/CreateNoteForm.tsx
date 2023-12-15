"use client";
import { Button } from "@radix-ui/themes";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/navigation";
const SimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const CreateNoteForm = ({ id }: { id: number }) => {
  const router = useRouter();

  interface MemberNote {
    id: number;
    description: string;
    authorId: number;
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberNote>({});

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: newNote } = await axios.post(`/api/members/${id}/`, data);
      router.push(`/members/${newNote.id}/`);
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <form className="max-w-xl" onSubmit={onSubmit}>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMdeEditor placeholder="notes..." {...field} />
        )}
      />
      <Button className="" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default CreateNoteForm;
