"use client";
import Link from "next/link";
import { Box, Button, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 gap-2 mx-auto max-w-screen-lg">
        <Flex align="center" gap="1">
          <h1 style={{ fontWeight: "bold" }}>Welcome</h1>
          <SessionUser />!
        </Flex>
        <p>
          This App is designed for creating members, adding and editing notes
          unique to each member.
        </p>
        <div className="flex flex-row gap-2 items-start">
          <Link href="/members">
            <Button size="2">Members</Button>
          </Link>
          <Link href="/members/new">
            <Button size="2">Add</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

const SessionUser = () => {
  const { data, status } = useSession();
  return <Box>{status === "authenticated" && <p>{data.user?.email}</p>}</Box>;
};
