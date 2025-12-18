import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface ClientInfo {
  ip: string;
  userAgent: string;
}

export const ClientInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ClientInfo => {
    const request = ctx.switchToHttp().getRequest();

    // Get IP address (supports proxies)
    const ip =
      request.ip ||
      request.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      request.headers['x-real-ip'] ||
      request.connection?.remoteAddress ||
      'unknown';

    // Get User-Agent
    const userAgent = request.headers['user-agent'] || 'unknown';

    return { ip, userAgent };
  },
);
