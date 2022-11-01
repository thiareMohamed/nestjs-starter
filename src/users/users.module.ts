import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database/database.module';
import { userProviders } from './users.provider';

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule],
  providers: [UsersService, ...userProviders]
})
export class UsersModule {}
