"use client";
import "easymde/dist/easymde.min.css";
import CreateNoteForm from "./CreateNoteForm";
import { useState } from "react";

interface Props {
  params: { id: number };
}
const MemberNoteForm = ({ params }: Props) => {
  const [memberData, setMemberData] = useState<any>(null);

  const handleDataUpdate = (data: any) => {
    setMemberData(data);
  };

  return (
    <>
      <div className="grid grid-col-1 mx-auto max-w-screen-lg gap-2">
        <p>Member Notes</p>
        <CreateNoteForm id={params.id} handleDataUpdate={handleDataUpdate} />
      </div>
    </>
  );
};
//export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamic = "force-dynamic";
export default MemberNoteForm;
