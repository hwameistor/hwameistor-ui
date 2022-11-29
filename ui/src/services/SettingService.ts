import * as fm from './fetch';
import type { empty } from './common';

export type GetSettingRequest = empty
export type GetSettingResult = {
  enabledrbd: boolean;
  state: string;
  version: string;
}

export class Setting {
  static GetSetting(req: GetSettingRequest, initReq?: fm.InitReq): Promise<GetSettingResult> {
    return fm.fetchReq<GetSettingRequest, GetSettingResult>(
      '/apis/hwameistor.io/v1alpha1/settings/highavailabilitysetting',
      {
        ...initReq,
        method: 'GET',
      },
    );
  }
}
