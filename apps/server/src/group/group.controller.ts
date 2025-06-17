import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { GroupService } from "./group.service";
import { JwtAuthguardGuard } from "../common/guard/jwt.guard";
import { ZodValidationPipe } from "../common/pipe/zod-validation.pipe";
import {
  AddUserGroupRequestDTO as UpsertUserGroupRequestDTO,
  AddUserGroupRequestSchema as UpsertUserGroupRequestSchema,
  CreateGroupRequestDTO,
  CreateGroupRequestSchema,
  UpdateGroupRequestDTO,
  UpdateGroupRequestSchema,
} from "./schema/request";
import { Group, Role, User } from "@prisma/client";
import { AuthUser } from "../common/decorator/auth-user";
import { GroupWithUserGroup } from "../common/types/entity";

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(JwtAuthguardGuard)
  @Get("me")
  async getUserGroups(@AuthUser() user: User): Promise<GroupWithUserGroup[]> {
    return this.groupService.getGroupsOfUser(user);
  }

  @UseGuards(JwtAuthguardGuard)
  @Post()
  async createGroup(
    @Body(new ZodValidationPipe(CreateGroupRequestSchema))
    createGroupRequestDTO: CreateGroupRequestDTO,
    @AuthUser() user: User,
  ): Promise<Group> {
    return this.groupService.createGroup(user, createGroupRequestDTO);
  }

  @UseGuards(JwtAuthguardGuard)
  @Put(":groupId")
  async updateGroup(
    @Body(new ZodValidationPipe(UpdateGroupRequestSchema))
    updateGroupRequestDTO: UpdateGroupRequestDTO,
    @Param("groupId", ParseIntPipe) groupId: number,
    @AuthUser() user: User,
  ): Promise<Group> {
    const group = await this.groupService.getGroupByRole(
      user,
      groupId,
      Role.ADMIN,
    );

    if (!group) throw new NotFoundException();

    return this.groupService.updateGroup(group, updateGroupRequestDTO);
  }

  @UseGuards(JwtAuthguardGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("user")
  async upsertUserGroup(
    @Body(new ZodValidationPipe(UpsertUserGroupRequestSchema))
    upsertUserGroupRequestDTO: UpsertUserGroupRequestDTO,
    @AuthUser() user: User,
  ): Promise<undefined> {
    const group = await this.groupService.getGroupByRole(
      user,
      upsertUserGroupRequestDTO.groupId,
      Role.ADMIN,
    );

    if (!group) throw new NotFoundException();

    await this.groupService.upsertUserGroup(upsertUserGroupRequestDTO);

    return;
  }
}
