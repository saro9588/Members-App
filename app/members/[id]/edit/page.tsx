import React from "react";

const EditNotePage = () => {
  return (
    <div className="grid grid-col-1 mx-auto max-w-screen-lg gap-2">
      <p>Page coming soon...</p>
    </div>
  );
};

export default EditNotePage;

// import React from "react";
// import EditNoteForm from "./EditNoteForm";
// import { Note } from "@prisma/client";

// interface Props {
//   params: { id: number; note: Note };
// }

// const EditNote = ({ params }: Props) => {
//   return (
//     <div>
//       <EditNoteForm id={params.id} note={params.note} />
//     </div>
//   );
// };

// export default EditNote;

// "use client";
// import { Button, TextArea } from "@radix-ui/themes";
// import React from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { Note } from "@prisma/client";

// const EditNoteForm = ({ id, note }: { id: number; note: Note }) => {
//   const router = useRouter();

//   interface MemberNote {
//     id: number;
//     description: string;
//     authorId: number;
//   }

//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<MemberNote>({});

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       if (note)
//         await axios.patch(`/api/members/${id}/`, data, {
//           headers: {
//             "Cache-Control": "no-store",
//           },
//         });
//     } catch (error) {
//       console.error(error);
//     }
//   });
//   return (
//     <div>
//       <form className="max-w-xl" onSubmit={onSubmit}>
//         <TextArea
//           {...register("description", { required: "This is required." })}
//           placeholder="Take notes..."
//           defaultValue={note?.description}
//         />
//         <Button color="indigo" variant="soft" className="mt-2">
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// };
// export const revalidate = 0;
// export const dynamic = "force-dynamic";
// export default EditNoteForm;
