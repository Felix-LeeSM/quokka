import { Role } from "@prisma/client";
import { z } from "zod";

export const CreateGroupRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type CreateGroupRequestDTO = z.infer<typeof CreateGroupRequestSchema>;

export const UpdateGroupRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type UpdateGroupRequestDTO = z.infer<typeof UpdateGroupRequestSchema>;

export const AddUserGroupRequestSchema = z.object({
  userId: z.number(),
  groupId: z.number(),
  role: z.nativeEnum(Role).default(Role.VIEWER),
});

export type AddUserGroupRequestDTO = z.infer<typeof AddUserGroupRequestSchema>;
