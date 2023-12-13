import { Member } from "@prisma/client";
import NewMemberForm from "./NewMemberForm";

const NewMemberPage = ({ member }: { member: Member }) => {
  return (
    <>
      {" "}
      <NewMemberForm />
    </>
  );
};

export default NewMemberPage;
