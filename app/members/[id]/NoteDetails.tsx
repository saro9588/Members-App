import { note } from "@prisma/client";
import { Box, Card } from "@radix-ui/themes";
import React from "react";

const NoteDetails = ({ note }: { note: note }) => {
  return (
    <Card className="max-w-xl" mt="4">
      <Box>Created By: {note.createdBy}</Box>
      <Box>Description: {note.description}</Box>
      <Box>Note ID: {note.id}</Box>
      <Box>Author ID: {note.authorId}</Box>
    </Card>
  );
};

export default NoteDetails;
