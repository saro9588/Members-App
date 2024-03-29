import { Note } from "@prisma/client";
import { Box, Card } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const NoteDetails = ({ note }: { note: Note }) => {
  return (
    <Card className="max-w-xl" mt="4">
      <Box>ID: {note.id}</Box>
      <Box>Description: {note.description}</Box>
      <Box>Author ID: {note.authorId}</Box>
    </Card>
  );
};

export default NoteDetails;
