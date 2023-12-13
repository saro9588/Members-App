"use client";
import Link from "next/link";
import "easymde/dist/easymde.min.css";
import { useForm } from "react-hook-form";
import { Button, TextField, TextArea } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const NewMemberForm = () => {
  const router = useRouter();

  interface MemberForm {
    id: number;
    firstName: string;
    lastName: string;
    info: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberForm>({});
  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: newMember } = await axios.post("/api/members/", data);
      router.push(`/members/${newMember.id}/notes`);
    } catch (error) {
      console.error(error);
    }
  });

  console.log();
  return (
    <>
      <div>Create a New Member</div>
      <form className="max-w-xl space-y-3 mb-5" onSubmit={onSubmit}>
        <TextField.Input
          {...register("firstName", {
            required: "This is required.",
          })}
          placeholder="firstname"
        />
        <p>{errors.firstName?.message}</p>
        <TextField.Input
          {...register("lastName", { required: "This is required." })}
          placeholder="lastname"
        />
        <p>{errors.lastName?.message}</p>

        <TextArea
          {...register("info", {
            required: "This is required.",
          })}
          placeholder="Notes..."
        />
        <p>{errors.info?.message}</p>
        <Button type="submit">Add Member</Button>
      </form>
      <Button className="">
        <Link href="/members">All Members</Link>
      </Button>
    </>
  );
};

export default NewMemberForm;
