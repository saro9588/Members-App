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

  const { id } = params;
  const onSubmit = handleSubmit(async (data) => {
    await axios.post(`/api/users/${id}/`, data);
    reset();
  });
  console.log(id);
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
