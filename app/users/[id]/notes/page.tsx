"use client";
import { Note } from "@prisma/client";
import { Button, TextArea } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const createUserNote = () => {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserNote>({});
  const onSubmit = handleSubmit(async (data) => {
    await axios.post(`/users/${user.id}/notes`, data);
    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      <TextArea
        {...register("description", {
          required: "This is required.",
        })}
        placeholder="Notes..."
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default createUserNote;
