import prisma from "./prisma";

export const getCategory = async () => {
  return await prisma.category.findMany();
};

export const getCategoryById = async (id: string) => {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
};
