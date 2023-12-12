import { Member } from "@prisma/client";
import NewUserForm from "./NewMemberForm";

const NewUserPage = ({ member }: { member: Member }) => {
  return (
    <>
      {" "}
      <NewUserForm />
    </>
  );
};

export default NewUserPage;
