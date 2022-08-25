export interface HttpResponse {
  body: any;
  statusCode: number;
}

export const created = (): HttpResponse => {
  return {
    body: null,
    statusCode: 201
  };
};
