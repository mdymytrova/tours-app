import { HttpStatusCode } from '@angular/common/http';
import { UserModel } from './user.model';

export interface ResponseModel {
  status: string;
}

export interface ResponseDataModel<T> extends ResponseModel {
  results?: number;
  count?: number;
  data: {
    [key: string]: T[];
  };
}

export interface ResponseLoginModel extends ResponseModel {
  data: {
    user: UserModel;
    token: string;
    expiresInSeconds: number;
  };
}

export interface ResponseErrorModel extends ResponseModel {
  message: string;
  status: string;
  error: ResponseErrorObjectModel;
}

interface ResponseErrorObjectModel {
  isOperational: boolean;
  status: string;
  statusCode: HttpStatusCode;
}
