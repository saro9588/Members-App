"use client";
import { Button, TextArea } from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateNoteForm = ({ id }: { id: number }) => {
  const router = useRouter();

  interface MemberNote {
    id: number;
    description: string;
    authorId: number;
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberNote>({});

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`/api/members/${id}/`, data, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      // Redirect to the newly created note page
      router.push(`/members/${response.data.id}/`); // Here response.data.id should be the ID of the newly created note
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className="max-w-xl" onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          {...register("description", { required: "This is required." })}
          placeholder="Take notes..."
        />
        <Button color="indigo" variant="soft" className="mt-2">
          Submit
        </Button>
      </form>
    </div>
  );
};
export const revalidate = 0;
export const dynamic = "force-dynamic";
export default CreateNoteForm;
