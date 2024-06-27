import { Note } from "@prisma/client";
import { Box, Card } from "@radix-ui/themes";
import React from "react";

const NoteDetails = ({ note }: { note: Note }) => {
  return (
    <Card className="max-w-xl" mt="4">
      <Box>Note ID: {note.id}</Box>
      <Box>Description: {note.description}</Box>
      <Box>Author ID: {note.authorId}</Box>
    </Card>
  );
};

export default NoteDetails;
