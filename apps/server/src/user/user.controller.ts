import {
  BadRequestException,
  Controller,
  Get,
  Req,
  UseGuards,
} from "@nestjs/common";

import { User } from "@prisma/client";
import { Request } from "express";
import { JwtAuthguardGuard } from "../common/guard/jwt.guard";

@Controller("api/user")
export class UserController {
  @Get("me")
  @UseGuards(JwtAuthguardGuard)
  async myInfo(
    @Req() request: Request,
  ): Promise<Pick<User, "id" | "username">> {
    if (!request.user) {
      throw new BadRequestException("guard penetrated");
    }

    return { id: request.user.id, username: request.user.username };
  }
}
