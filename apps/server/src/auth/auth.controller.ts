import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { Request, type Response } from "express";
import { UserService } from "src/user/user.service";
import { ZodValidationPipe } from "../zod-validation/zod-validation.pipe";
import { AuthService } from "./auth.service";
import { JwtAuthguardGuard } from "./jwt.guard";
import {
  LogInRequestDTO,
  LogInRequestSchema,
  SignUpRequestDTO,
  SignUpRequestSchema,
} from "./schema/request";
import {
  type LoginResponseDTO,
  type SignUpResponseDTO,
} from "./schema/response";

@Controller("api/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post("token")
  @UsePipes(new ZodValidationPipe(LogInRequestSchema))
  async logIn(
    @Body() logInRequestDTO: LogInRequestDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDTO> {
    const user = await this.authService.validateUser(logInRequestDTO);

    const token = this.authService.genearteJWT(user);

    res.cookie("Authorizaition", `Bearer ${token}`, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 10,
    });

    return { id: user.id, username: user.username };
  }

  @Post("user")
  @UsePipes(new ZodValidationPipe(SignUpRequestSchema))
  async signUp(
    @Body() signUpRequestDTO: SignUpRequestDTO,
  ): Promise<SignUpResponseDTO> {
    const { username, password } = signUpRequestDTO;

    const user = await this.userService.findByUsername(username);

    if (user) throw new BadRequestException("username taken");

    const hashedPassword = await this.authService.hashPassword(password);

    const createdUser = await this.userService.createUser({
      username: username,
      hashedPassword: hashedPassword,
    });

    return { id: createdUser.id, username: createdUser.username };
  }

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
