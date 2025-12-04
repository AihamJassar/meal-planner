"use server";

import { CategorySchema } from "@/types/schema";
import prisma from "@/lib/prisma";
import { executeAction } from "@/lib/executeAction";

export const createCategory = async (data: CategorySchema) => {
  await executeAction({
    actionFn: () =>
      prisma.category.create({
        data: {
          name: data.name,
        },
      }),
  });
};

export const updateCategory = async (data: CategorySchema) => {
  if (data.action === "update") {
    await executeAction({
      actionFn: () =>
        prisma.category.update({
          where: { id: data.id },
          data: {
            name: data.name,
          },
        }),
    });
  }
};

export const deleteCategory = async (id: number) => {
  await executeAction({
    actionFn: () => prisma.category.delete({ where: { id } }),
  });
};

export const getCategories = async () => {
  return await prisma.category.findMany();
}

export const getCategory = async (id: number): Promise<CategorySchema> => {
  const res = await prisma.category.findFirst({ where: { id } });

  return {
    ...res,
    action: "update",
    name: res?.name ?? "",
    id,
  };
};
