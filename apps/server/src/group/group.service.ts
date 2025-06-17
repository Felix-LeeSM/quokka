import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { Group, Role, User } from "@prisma/client";
import type {
  AddUserGroupRequestDTO as UpsertUserGroupRequestDTO,
  CreateGroupRequestDTO,
  UpdateGroupRequestDTO,
} from "./schema/request";
import { GroupWithUserGroup } from "../common/types/entity";

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async createGroup(
    user: User,
    createGroupRequestDTO: CreateGroupRequestDTO,
  ): Promise<Group> {
    return this.prismaService.$transaction(async (tx) => {
      const group = await tx.group.create({ data: createGroupRequestDTO });
      const userGroupData = {
        userId: user.id,
        groupId: group.id,
        role: Role.ADMIN,
      };
      await tx.userGroup.create({ data: userGroupData });

      return group;
    });
  }

  async getGroupsOfUser(user: User): Promise<GroupWithUserGroup[]> {
    return this.prismaService.group.findMany({
      include: { userGroups: { where: { userId: user.id } } },
      where: {
        userGroups: {
          some: { userId: user.id },
        },
      },
    });
  }

  async getGroupByRole(
    user: User,
    gourpId: number,
    role: Role,
  ): Promise<GroupWithUserGroup | null> {
    return this.prismaService.group.findFirst({
      include: { userGroups: true },
      where: {
        id: gourpId,
        userGroups: {
          some: {
            userId: user.id,
            role,
          },
        },
      },
    });
  }

  async updateGroup(
    group: Group,
    updateGroupRequestDTO: UpdateGroupRequestDTO,
  ): Promise<Group> {
    return this.prismaService.group.update({
      where: { id: group.id },
      data: updateGroupRequestDTO,
    });
  }

  async upsertUserGroup(
    upsertUserGroupRequestDTO: UpsertUserGroupRequestDTO,
  ): Promise<void> {
    const { role, ...userId_groupId } = upsertUserGroupRequestDTO;
    await this.prismaService.userGroup.upsert({
      where: {
        userId_groupId: userId_groupId,
      },
      create: upsertUserGroupRequestDTO,
      update: { role },
    });
  }
}
