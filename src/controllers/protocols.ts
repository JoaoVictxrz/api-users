interface HttpsResponse<T> {
  statusCode: number;
  body: T | string;
}
