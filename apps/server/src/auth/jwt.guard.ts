import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthguardGuard
  extends AuthGuard("jwt-strategy")
  implements CanActivate {}
