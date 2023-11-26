"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
};

export default function Home() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));
  // firstName and lastName will have correct type
  return (
    <>
      <div> Hello World</div>
      <form onSubmit={onSubmit}>
        <label>First Name</label>
        <input {...register("firstName")} />
        <label>Last Name</label>
        <input {...register("lastName")} />
        <button
          type="button"
          onClick={() => {
            setValue("lastName", "luo"); // ✅
            setValue("firstName", true); // ❌: true is not string
            errors.bill; // ❌: property bill does not exist
          }}
        >
          SetValue
        </button>
      </form>
      <Link href="/users">Click Me</Link>
    </>
  );
}
