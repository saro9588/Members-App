import { Button } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import Link from "next/link";
import NewMemberForm from "./NewMemberForm";

const NewMemberPage = () => {
  console.log();
  return (
    <>
      <div>Create a New Member</div>
      <NewMemberForm />
      <Button className="">
        <Link href="/members">All Members</Link>
      </Button>
    </>
  );
};

export default NewMemberPage;
