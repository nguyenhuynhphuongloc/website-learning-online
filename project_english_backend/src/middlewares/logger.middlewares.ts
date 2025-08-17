import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip, body, query } = req;
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;

      console.log(`[${new Date().toISOString()}]`);
      console.log(`${method} ${originalUrl} - ${statusCode} - ${duration}ms`);
      console.log(`IP: ${ip}`);

      if (query && Object.keys(query).length > 0) {
        console.log(`Query:`, query);
      }

      if (body && Object.keys(body).length > 0) {
        console.log(`Body:`, body);
      }

      console.log('---');
    });

    next();
  }
}
