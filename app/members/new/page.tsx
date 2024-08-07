import { Button } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import Link from "next/link";
import NewMemberForm from "./NewMemberForm";

const NewMemberPage = () => {
  console.log();
  return (
    <>
      <div className="grid grid-col-1 mx-auto max-w-screen-lg gap-2">
        <h1 style={{ fontWeight: "bold" }}>Create a New Member</h1>
        <NewMemberForm />
      </div>
    </>
  );
};

export default NewMemberPage;
