import { Global, Module } from '@nestjs/common';
import { SecurityLoggerService } from './logger/security-logger.service';

@Global()
@Module({
  providers: [SecurityLoggerService],
  exports: [SecurityLoggerService],
})
export class CommonModule {}
