import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthguardGuard } from "../common/guard/jwt.guard";
import { UserService } from "./user.service";
import type { UserWithGroups } from "../common/types/entity";
import { AuthUser } from "../common/decorator/auth-user";
import { User } from "@prisma/client";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  @UseGuards(JwtAuthguardGuard)
  async myInfo(
    @AuthUser() user: User,
  ): Promise<Omit<UserWithGroups, "hashedPassword">> {
    const { hashedPassword, ...userInfo } =
      await this.userService.findWithGrpupsByUsername(user.username);

    return userInfo;
  }
}
