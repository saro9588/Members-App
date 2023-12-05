"use client";
import { Note } from "@prisma/client";
import { Button, TextArea } from "@radix-ui/themes";
import axios from "axios";
import { useForm } from "react-hook-form";

interface Props {
  params: { id: number };
}

const createUserNote = ({ params }: Props) => {
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

  const { id: authorId } = params;
  const onSubmit = handleSubmit(async (data) => {
    await axios.post(`/users/${authorId}/notes`, data);
    reset();
  });
  console.log(authorId);
  return (
    <>
      <p>Hello World</p>
      <form onSubmit={onSubmit}>
        <TextArea
          {...register("description", {
            required: "This is required.",
          })}
          placeholder="Notes..."
        />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default createUserNote;
