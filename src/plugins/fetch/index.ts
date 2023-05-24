/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import TOKEN_KEY from '@/constant/token';
import Cookies from 'js-cookie';
import {
  handleResponse, $fetchRaw, setGlobalInterceptors,
} from './request';

// 有些插件会替换浏览器原生fetch，所以不能通过native code判断只加载一次
let initialized = false;

const replaceFetch = () => {
  if (initialized) {
    return;
  }

  initialized = true;

  // @ts-ignore
  window.originFetch = window.fetch;
  // @ts-ignore
  window.fetch = $fetchRaw;
};

export default replaceFetch;

setGlobalInterceptors({
  async onRequest(ctx) {
    const token = Cookies.get(TOKEN_KEY);

    if (token && ctx.request) {
      if (!ctx.options.headers) {
        ctx.options.headers = {};
      }
      // 如果webpack hot update加上Authorization会CORS拒绝
      if (process.env.NODE_ENV === 'development' && String(ctx.request).endsWith('hot-update.json')) {
        return;
      }
      // @ts-ignore
      ctx.options.headers.Authorization = token;
    }
  },
  async onResponseError(ctx) {
    if (!ctx.response) {
      // @ts-ignore
      Promise.reject(new Error(ctx));

      return;
    }

    await handleResponse(ctx);
  },
});
