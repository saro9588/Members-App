"use client";
import { useRouter } from "next/navigation";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";

export default function Form() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      const data = await response.json();
      if (data?.error) {
        setErrorMessage(data.error); // Set error message from API response
      }
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mx-auto max-w-md"
      >
        <h1 className="text-xl">Create an Account</h1>
        <Flex direction="column" gap="3" style={{ maxWidth: 400 }}>
          <label>Email</label>
          <TextField.Input
            name="email"
            type="email"
            radius="full"
            placeholder="enter email..."
            required={true}
          />
          <label>Password</label>
          <TextField.Input
            name="password"
            type="password"
            radius="full"
            placeholder="enter password…"
            required={true}
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="flex justify-center">
            <Button
              color="orange"
              radius="full"
              size="2"
              variant="soft"
              type="submit"
              className="hover:cursor-pointer"
            >
              Submit
            </Button>
          </div>
        </Flex>
      </form>
    </>
  );
}
