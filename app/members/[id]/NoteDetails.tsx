import { Note } from "@prisma/client";
import { Card } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const NoteDetails = ({ note }: { note: Note }) => {
  return (
    <Card className="max-w-xl" mt="4">
      <ReactMarkdown>{note?.description}</ReactMarkdown>
    </Card>
  );
};

export default NoteDetails;
