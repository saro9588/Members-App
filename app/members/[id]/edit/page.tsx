"use client";
import { Note } from "@prisma/client";
import React from "react";

const EditNote = ({ note }: { note: Note }) => {
  return <div>{note.description}</div>;
};

export default EditNote;
