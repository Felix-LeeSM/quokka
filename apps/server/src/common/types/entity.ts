import type { Prisma } from "@prisma/client";

export type UserWithGroups = Prisma.UserGetPayload<{
  include: {
    userGroups: {
      include: { group: true };
    };
  };
}>;

export type GroupWithUserGroup = Prisma.GroupGetPayload<{
  include: {
    userGroups: true;
  };
}>;
