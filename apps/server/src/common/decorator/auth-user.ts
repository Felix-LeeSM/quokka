import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";

// ExecutionContext로부터 request 객체를 꺼내고, request 객체에서 user 정보를 추출해 반환합니다.
export const AuthUser = createParamDecorator(
  (_data: undefined, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest<Request>();

    if (!user) throw new UnauthorizedException();

    return user;
  },
);
