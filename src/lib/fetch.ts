import Client, { Request, Response } from '@specter/client';
import * as Sentry from 'sentry-expo';

const client = new Client({
  // Specter Endpoint
  base: process.env.API_HOST,
  // fetch options
  fetchOption: {},
});

export const specterPost = async <TRequest, TResponse>(
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

  if (Number(data?.status) >= 400 && Number(data?.status) < 600) {
    data.error = `http status code: ${data.status}`;
  }

  return data;
};

export const post = async <TRequest, TResponse>(
  url: string,
  body: TRequest,
  idToken: string
) => {
  type FetchResponse = {
    status: number;
    body: TResponse | null;
    error: string | null;
  };

  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(body),
  };

  console.log(request);
  console.log(process.env.API_HOST);

  try {
    const response = await fetch(`${process.env.API_HOST}/${url}`, request);
    const data: FetchResponse = {
      status: 0,
      body: null,
      error: null,
    };

    data.status = response.status;

    if (response.ok) {
      data.body = await response.json();
    } else {
      if (response.status >= 400 && response.status < 600) {
        data.error = `http status code: ${data.status}`;
      }
    }

    return data;
  } catch (e) {
    Sentry.captureException(e);
    const errorData: FetchResponse = {
      status: 500,
      body: null,
      error: e.message,
    };

    return errorData;
  }
};
