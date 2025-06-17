import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./common/prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { GroupModule } from './group/group.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, GroupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
