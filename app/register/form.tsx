"use client";
import { useRouter } from "next/navigation";
import { Button, Card, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";
import Spinner from "../components/Spinner";

export default function Form() {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setSubmitting(true);
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
        setSubmitting(false);
        setErrorMessage(data.error); // Set error message from API response
      }
    }
  };
  return (
    <Card className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mx-auto max-w-md"
      >
        <h1 className="text-xl text-center mb-4 bg-blue-50 p-5 rounded-lg">
          Create an Account
        </h1>
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
              disabled={isSubmitting}
              color="orange"
              radius="full"
              size="2"
              variant="soft"
              type="submit"
              className="hover:cursor-pointer"
            >
              Submit {isSubmitting && <Spinner />}
            </Button>
          </div>
        </Flex>
      </form>
    </Card>
  );
}
