import {
  BadRequestException,
  Controller,
  Get,
  Req,
  UseGuards,
} from "@nestjs/common";

import { Prisma } from "@prisma/client";
import { Request } from "express";
import { JwtAuthguardGuard } from "../common/guard/jwt.guard";
import { UserService } from "./user.service";

@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  @UseGuards(JwtAuthguardGuard)
  async myInfo(@Req() request: Request): Promise<
    Omit<
      Prisma.UserGetPayload<{
        include: {
          userGroups: {
            include: { group: true };
          };
        };
      }>,
      "hashedPassword"
    >
  > {
    if (!request.user) throw new BadRequestException("guard penetrated");

    const { hashedPassword, ...user } =
      await this.userService.findWithGrpupsByUsername(request.user.username);

    return user;
  }
}
