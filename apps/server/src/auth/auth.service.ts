import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { UserService } from "../user/user.service";
import { JwtPaylad } from "./schema/jwt.payload";
import { LogInRequestDTO } from "./schema/request";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(loginRequestDTO: LogInRequestDTO): Promise<User> {
    const { username, password } = loginRequestDTO;
    const user = await this.userService.findByUsername(username);

    if (!user)
      throw new BadRequestException("no user matching given condition");
    if (!bcrypt.compare(password, user.hashedPassword))
      throw new BadRequestException("no user matching given condition");

    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const rounds = 10;
    return bcrypt.hash(password, rounds);
  }

  genearteJWT(user: User): string {
    const payload: JwtPaylad = {
      sub: user.id,
      username: user.username,
    };

    return this.jwtService.sign(payload);
  }
}
