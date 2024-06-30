import { note } from "@prisma/client";
import { Box, Card } from "@radix-ui/themes";
import React from "react";

const NoteDetails = ({ note }: { note: note }) => {
  return (
    <div className="max-w-xl px-2">
      <div>Created By: {note.createdBy}</div>
      <div>Description: {note.description}</div>
    </div>
  );
};

export default NoteDetails;
