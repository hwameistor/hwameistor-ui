/* eslint-disable @typescript-eslint/ban-ts-comment */
import TOKEN_KEY from '@/constant/token';
import Cookies from 'js-cookie';

type FetchRequest = RequestInfo

export interface FetchContext {
  request: FetchRequest
  options: Partial<RequestInit>,
  response?: Response
  error?: Error
}

interface FetchInterceptor {
  onRequest?(ctx: FetchContext): Promise<void>
  onRequestError?(ctx: FetchContext): Promise<void>
  onResponse?(ctx: FetchContext): Promise<void>
  onResponseError?(ctx: FetchContext): Promise<void>
}

const globalInterceptors: FetchInterceptor = {

};

const globalOptions: Partial<RequestInit> = {
  headers: {
  },
};

export function setGlobalInterceptors(interceptors: FetchInterceptor = {}) {
  Object.assign(globalInterceptors, interceptors);
}

export function setFetchAcceptLanguage(lang: string) {
  if (!globalOptions.headers) {
    globalOptions.headers = {};
  }

  if (lang) {
    // @ts-ignore
    globalOptions.headers['Accept-Language'] = lang;
  } else {
    // 为空字符串''时重置配置
    // @ts-ignore
    delete globalOptions.headers['Accept-Language'];
  }
}

export const $fetchRaw = async function $fetchRaw(
  _request: RequestInfo,
  _opts?: RequestInit,
): Promise<Response> {
  const headers = {
    ...(globalOptions.headers ?? {}),
    ...((_opts ?? {}).headers ?? {}),
  };
  const ctx: FetchContext = {
    request: _request,
    options: {
      ...globalOptions,
      ...(_opts ?? {}),
      headers,
    },
    response: undefined,
    error: undefined,
  };

  if (globalInterceptors.onRequest) {
    await globalInterceptors.onRequest(ctx);
  }

  if (!window.originFetch) {
    throw new Error('window.originFetch is undefined');
  }
  ctx.response = await window.originFetch(
    ctx.request,
    ctx.options,
  ).catch(async (error) => {
    ctx.error = error;
    if (globalInterceptors.onRequestError) {
      await globalInterceptors.onRequestError(ctx);
    }

    return error;
  });

  if (globalInterceptors.onResponse) {
    await globalInterceptors.onResponse(ctx);
  }

  if (!ctx?.response?.ok) {
    if (globalInterceptors.onResponseError) {
      await globalInterceptors.onResponseError(ctx);
    }
  }

  if (!ctx.response) {
    throw new Error('ctx.response is undefined');
  }

  return ctx.response;
};

export async function handleResponse(ctx: FetchContext) {
  const { response } = ctx;

  if (!response) {
    return Promise.reject(response);
  }

  if (response.ok) {
    return Promise.resolve(response);
  }

  const code = response.status;

  switch (code) {
    case 401:
      // clear the cookie & refresh
      Cookies.remove(TOKEN_KEY);
      window.location.reload();
      break;
    default:
      break;
  }
  try {
    const clone = response.clone();

    return Promise.reject(await clone.json());
  } catch {
    return Promise.reject(response);
  }
}
