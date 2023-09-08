import { noty } from '@/plugins/dao-style';
import { type HttpError } from '@/types/error';

export function nSuccess(content?: string, title?: string) {
  noty.success({
    title,
    content,
  });
}

export function nError(title?: string, e?: HttpError | string | unknown) {
  if (typeof e === 'string') {
    noty.error({
      title,
      content: e ?? undefined,
    });
  } else if (e && typeof e === 'object' && 'error' in e) {
    noty.error({
      title,
      content: ((e as HttpError).error).description,
    });
  } else {
    noty.error({
      title,
    });
  }
}
