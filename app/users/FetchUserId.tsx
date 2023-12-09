import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

const FetchUserId = async ({ params }: Props) => {
  const user = await prisma.user
    .findUnique({
      where: { id: parseInt(params.id) },
    })
    .then((data) => {
      if (data) {
        console.log(data.id);
      }
    });

  return;
};

export default FetchUserId;
