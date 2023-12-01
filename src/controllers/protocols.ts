export interface HttpsResponse<T> {
  statusCode: number;
  body: T | string;
}
export interface HttpRequest<B> {
  params?: any;
  header?: any;
  body?: B;
}
