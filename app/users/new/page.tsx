import { User } from "@prisma/client";
import NewUserForm from "./NewUserForm";

const NewUserPage = ({ user }: { user: User }) => {
  return (
    <>
      {" "}
      <NewUserForm />
    </>
  );
};

export default NewUserPage;
