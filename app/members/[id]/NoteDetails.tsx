import { Note } from "@prisma/client";
import { Box, Card } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const NoteDetails = ({ note }: { note: Note }) => {
  return (
    <Card className="max-w-xl" mt="4">
      <>{note}</>
      <Box>{note.id}</Box>
      <Box>{note.description}</Box>
    </Card>
  );
};

export default NoteDetails;
