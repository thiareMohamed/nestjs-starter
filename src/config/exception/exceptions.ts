import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundException extends HttpException  {
  constructor(message: string, status: HttpStatus = HttpStatus.NOT_FOUND) {
    super(message, status);
    }
}

export class ConflictException extends HttpException  {
    constructor(message: string, status: HttpStatus = HttpStatus.CONFLICT) {
        super(message, status);
    }
}

export class BadRequestException extends HttpException  {
    constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
        super(message, status);
    }
}

export class UnauthorizedException extends HttpException  {
    constructor(message: string, status: HttpStatus = HttpStatus.UNAUTHORIZED) {
        super(message, status);
    }
}

export class ForbiddenException extends HttpException  {
    constructor(message: string, status: HttpStatus = HttpStatus.FORBIDDEN) {
        super(message, status);
    }
}

