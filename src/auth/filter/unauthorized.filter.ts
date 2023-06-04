import { Catch, UnauthorizedException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.message || 'Unauthorized';
  
    // Customize the response as per your requirements
    response.status(401).json({
      statusCode: 401,
      message: message,
    });
  }
}