import { note } from "@prisma/client";
import { Box, Card } from "@radix-ui/themes";
import React from "react";

const NoteDetails = ({ note }: { note: note }) => {
  return (
    <Card className="max-w-xl space-y-3 mb-5">
      <Box>Created By: {note.createdBy}</Box>
      <Box>Description: {note.description}</Box>
    </Card>
  );
};

export default NoteDetails;
