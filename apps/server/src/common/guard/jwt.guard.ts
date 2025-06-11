import { CanActivate, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthguardGuard
  extends AuthGuard("jwt-strategy")
  implements CanActivate {}
