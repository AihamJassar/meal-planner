import { z } from "zod";

export const categorySchema = z.intersection(
  z.object({ name: z.string().min(1).max(255) }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update"), id: z.number().min(1) }),
  ]),
);

export type CategorySchema = z.infer<typeof categorySchema>;

export const categoryDefaultValues: CategorySchema = {
  action: "create",
  name: "",
};
