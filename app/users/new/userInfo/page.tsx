import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const UserInfo = () => {
  return (
    <>
      <div>UserInfo</div>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
      <Button>
        <Link href="/users">Back</Link>
      </Button>
    </>
  );
};

export default UserInfo;
