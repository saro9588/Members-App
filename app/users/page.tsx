import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const AllUsers = () => {
  return (
    <>
      <div>All Users</div>
      <Button>
        <Link href="/">Back</Link>
      </Button>
    </>
  );
};

export default AllUsers;
