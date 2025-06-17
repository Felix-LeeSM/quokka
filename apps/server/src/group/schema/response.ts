import { z } from "zod";
import { GroupSchema } from "../../../prisma/generated/zod";

export const GroupsResponseSchma = z.array(GroupSchema);

export type GroupResponseDTO = z.infer<typeof GroupsResponseSchma>;
