import prisma from "./prisma";

export const getTask = async () => {
  return await prisma.task.findMany();
};

export const getTaskById = async (id: string) => {
  return await prisma.task.findUnique({
    where: {
      id,
    },
  });
};

export const createTask = async (
  title: string,
  body: string,
  categoryId: string
) => {
  return await prisma.task.create({
    data: {
      title,
      body,
      categoryId,
    },
  });
};

export const deleteTask = async (id: string) => {
  return await prisma.task.delete({
    where: {
      id,
    },
  });
};

export const updateTask = async (
  id: string,
  title: string,
  body: string,
  categoryId: string
) => {
  return await prisma.task.update({
    where: {
      id,
    },
    data: {
      title,
      body,
      categoryId,
    },
  });
};
