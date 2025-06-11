import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";

import { UserService } from "src/user/user.service";
import { JwtPayloadSchema } from "./schema/jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt-strategy") {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: unknown): Promise<User> {
    const parsedPayload = JwtPayloadSchema.parse(payload);

    const user = await this.userService.findById(parsedPayload.sub);

    if (!user || user.username !== parsedPayload.username)
      throw new UnauthorizedException(
        "please log out and then try logging in.",
      );

    return user;
  }
}
