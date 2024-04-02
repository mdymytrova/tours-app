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
