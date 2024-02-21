"use client";
import React from "react";
import EditNoteForm from "./EditNoteForm";
import { Note } from "@prisma/client";

interface Props {
  params: { id: number; note: Note };
}

const EditNote = ({ params }: Props) => {
  return (
    <div>
      <EditNoteForm id={params.id} note={params.note} />
    </div>
  );
};

export default EditNote;
