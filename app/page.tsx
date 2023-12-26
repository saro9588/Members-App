"use client";
import Link from "next/link";
import { Box, Button, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Flex align="center" gap="1">
        <h1>Welcome</h1>
        <SessionUser />!
      </Flex>
      <p>
        This App is for adding members and crearting notes unique to each member
      </p>
      <Button className="">
        <Link href="/members">All Members</Link>
      </Button>
      <Button className="">
        <Link href="/members/new">Add Member</Link>
      </Button>
    </>
  );
}

const SessionUser = () => {
  const { data, status } = useSession();

  return <Box>{status === "authenticated" && <p>{data.user?.email}</p>}</Box>;
};
