"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (!response?.ok) {
      router.push("/");
      router.refresh();
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mx-auto max-w-md"
      >
        <h1 className="text-xl">Register an Account</h1>
        <label>Email</label>
        <input name="email" className="border border-black" type="email" />
        <label>Password</label>
        <input
          name="password"
          className="border border-black"
          type="password"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
