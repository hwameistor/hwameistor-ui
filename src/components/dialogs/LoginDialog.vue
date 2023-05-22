<template>
  <dao-dialog
    :model-value="true"
    :header="false"
    size="md"
    :close-on-press-escape="false"
    :show-close="false"
    @confirm="login"
  >
    <dao-form type="vertical">
      <dao-form-item :label="$t('components.dialogs.LoginDialog.username')">
        <dao-input
          v-model="accessId"
          block
          :placeholder="$t('components.dialogs.LoginDialog.username')"
        />
      </dao-form-item>

      <dao-form-item
        :label="$t('components.dialogs.LoginDialog.password')"
        :padding-bottom="0"
      >
        <dao-input
          v-model="secretKey"
          block
          :placeholder="$t('components.dialogs.LoginDialog.password')"
        />
      </dao-form-item>
    </dao-form>

    <template #footer="{ onConfirm }">
      <dao-button
        type="primary"
        @click="onConfirm"
      >
        {{ $t('components.dialogs.LoginDialog.login') }}
      </dao-button>
    </template>
  </dao-dialog>
</template>

<script lang="ts" setup>
import {
  ref,
  defineEmits,
} from 'vue';
import { Auth } from '@/services/Auth';
import { noty } from '@/plugins/dao-style';
import { HttpError } from '@/types/error';
import { useI18n } from 'vue-i18n';
import Cookies from 'js-cookie';
import TOKEN_KEY from '@/constant/token';

type Emits = {
  (event: 'resolve', token: string): void,
  (event: 'reject'): void,
}

const emits = defineEmits<Emits>();
const { t } = useI18n();

const AuthApi = new Auth();

const accessId = ref<string>('');
const secretKey = ref<string>('');

const login = async () => {
  if (!accessId.value || !secretKey.value) {
    return;
  }

  try {
    const { data } = await AuthApi.authAuthCreate({
      accessId: accessId.value,
      secretKey: secretKey.value,
    });

    Cookies.set(TOKEN_KEY, data.token ?? '', {
      expires: new Date((data.expireAt ?? 0) * 1e3),
    });
    emits('resolve', data.token ?? '');
  } catch (error) {
    noty.error({
      title: t('components.dialogs.LoginDialog.noty.error'),
      content: ((error as HttpError).error).description,
    });
  }
};
</script>
