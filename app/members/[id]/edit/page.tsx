import React from "react";
import NoteForm from "../../_components/NoteForm";

interface Props {
  params: { id: string };
}

const EditNotePage = (params: { id: string }) => {
  return (
    <div className="grid grid-col-1 mx-auto max-w-screen-lg gap-2">
      <NoteForm id={params.id} />
    </div>
  );
};

export default EditNotePage;
