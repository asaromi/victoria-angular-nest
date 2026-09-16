export class ApiResponseDto<T> {
  success: boolean = true;
  data: T;
  message?: string;
  statusCode?: number;

  constructor(data: T, statusCode: number = 200, message?: string) {
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export class ApiErrorResponseDto {
  message: string;
}

export class ApiPaginationResponseDto<T> extends ApiResponseDto<T> {
  meta: {
    limit: number;
    page: number;
    totalData: number;
  };

  constructor(data: T, totalData: number, limit?: number, page?: number, statusCode?: number, message?: string) {
    super(data, statusCode, message);
    this.meta = { limit: limit || 10, page: page || 1, totalData };
  }
}