import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../common/prisma/prisma.service";
import type { UserWithGroups } from "../common/types/entity";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUsername(username: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { username },
    });
  }

  async findWithGrpupsByUsername(username: string): Promise<UserWithGroups> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
      include: {
        userGroups: {
          include: { group: true },
        },
      },
    });

    if (!user)
      throw new BadRequestException("trying to find not existing user");

    return user;
  }

  async findById(id: number): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async createUser({
    username,
    hashedPassword,
  }: {
    username: string;
    hashedPassword: string;
  }): Promise<User> {
    return await this.prismaService.user.create({
      data: { username, hashedPassword },
    });
  }
}
