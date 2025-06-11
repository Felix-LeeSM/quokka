import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUsername(username: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { username },
    });
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
