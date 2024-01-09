"use client";
import Link from "next/link";
import { Box, Button, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Flex align="center" gap="1">
          <h1>Welcome</h1>
          <SessionUser />!
        </Flex>
        <p>
          This App is for adding members and crearting notes unique to each
          member
        </p>
        <div className="flex flex-col gap-2 items-start">
          <Button size="2">
            <Link href="/members">All Members</Link>
          </Button>
          <Button size="2">
            <Link href="/members/new">Add Members</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

const SessionUser = () => {
  const { data, status } = useSession();
  return <Box>{status === "authenticated" && <p>{data.user?.email}</p>}</Box>;
};
