import Client, { Request, Response } from '@specter/client';

const client = new Client({
  // Specter Endpoint
  base: process.env.API_HOST,
  // fetch options
  fetchOption: {},
});

export const post = async <TRequest, TResponse>(
  url: string,
  body: TRequest,
  idToken: string
): Promise<Response<{ status: string }, TResponse>> => {
  const request = new Request<{}, {}, TRequest>(url, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
    query: {},
    body,
  });

  const data = await client.create<Response<{ status: string }, TResponse>>(
    request
  );

  if (Number(data.header.status) >= 400 && Number(data.header.status) < 600) {
    data.error = `http status code: ${data.header.status}`;
  }

  return data;
};
