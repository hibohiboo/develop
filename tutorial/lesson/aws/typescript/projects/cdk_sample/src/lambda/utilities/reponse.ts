type ResponseBody = Record<string, any> | number | string
export const badRequest = (body: ResponseBody | null = null) =>
({
  statusCode: 400,
  body: JSON.stringify(body),
});
export const ok = (body: ResponseBody) =>
({
  statusCode: 200,
  body: JSON.stringify(body),
});
