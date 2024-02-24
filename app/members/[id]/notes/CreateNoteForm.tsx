import { Button, TextArea } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateNoteForm = ({ id }: { id: number }) => {
  const router = useRouter();

  interface MemberNote {
    id: number;
    description: string;
    authorId: number;
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberNote>({});

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const { data: newNote } = await axios.post(`/api/members/${id}/`, data, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      // Redirect to the new note page or reload the current page
      router.push(`/members/${newNote.id}/`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <form className="max-w-xl" onSubmit={onSubmit}>
      <TextArea
        {...register("description", { required: "This is required." })}
        placeholder="Take notes..."
      />
      <Button color="indigo" variant="soft" type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export const revalidate = 0;
export const dynamic = "force-dynamic";
export default CreateNoteForm;

// "use client";
// import { Button, TextArea } from "@radix-ui/themes";
// import React from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const CreateNoteForm = ({ id }: { id: number }) => {
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
//       const { data: newNote } = await axios.post(`/api/members/${id}/`, data, {
//         headers: {
//           "Cache-Control": "no-store",
//         },
//       });
//       router.push(`/members/${newNote.id}/`);
//       console.log(newNote.id);
//       console.log(newNote);
//     } catch (error) {
//       console.error(error);
//     }
//   });
//   return (
//     <form className="max-w-xl" onSubmit={onSubmit}>
//       <TextArea
//         {...register("description", { required: "This is required." })}
//         placeholder="Take notes..."
//       />
//       <Button color="indigo" variant="soft">
//         Submit
//       </Button>
//     </form>
//   );
// };
// export const revalidate = 0;
// export const dynamic = "force-dynamic";
// export default CreateNoteForm;
