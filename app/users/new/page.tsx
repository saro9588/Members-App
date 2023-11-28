'use client';
import Link from "next/link";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const SimpleMdeEditor = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);

const NewUser = () => {
  const router = useRouter();
  interface UserForm {
    firstName: string;
    lastName: string;
    notes: string;
  }
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>();
  const onSubmit = handleSubmit(async (data) => {
    await axios.post("/api/users", data);
    reset()
  });
  // firstName and lastName will have correct type
  return (
    <>
      <div>NewUser</div>
      <form className="max-w-xl space-y-3 mb-5" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            {...register("firstName", {
              required: true,
            })}
            placeholder="firstname"
          />
          <TextField.Input
            {...register("lastName", { required: true })}
            placeholder="lastname"
          />
        </TextField.Root>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <SimpleMdeEditor placeholder="notes..." {...field} />
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
      <Button className="">
        <Link href="/users">All Users</Link>
      </Button>
    </>
  );
};

export default NewUser;
