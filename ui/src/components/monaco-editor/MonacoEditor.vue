<template>
  <div
    ref="editorRef"
    :style="{
      height,
      width,
    }"
  />
</template>

<script lang="ts" setup>
import {
  toRaw, defineProps, defineEmits, watch, ref, onMounted, onBeforeUnmount,
} from 'vue';
import { editor, MarkerSeverity } from 'monaco-editor';
import 'monaco-editor/esm/vs/editor/contrib/find/browser/findController';
import 'monaco-editor/esm/vs/editor/contrib/folding/browser/folding';
import 'monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution';
import themeData from './ThemeData';
import initMonacoYaml, { modelUri } from './MonacoYaml';

const TomorrowNightTheme: editor.IStandaloneThemeData = themeData as editor.IStandaloneThemeData;

let monacoEditor: editor.IStandaloneCodeEditor;

const props = defineProps({
  modelValue: {
    type: String,
    require: false,
    default: '',
  },
  width: {
    type: [String, Number],
    default: '100%',
  },
  height: {
    type: [String, Number],
    default: '100%',
  },
  schema: {
    type: Object,
    default: () => ({}),
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['change', 'marker-change']);

const editorRef = ref<HTMLElement>();

watch(() => props.modelValue, (value) => {
  if (monacoEditor && monacoEditor.getValue() !== value) {
    monacoEditor.setValue(value);
  }
});

const markerCount = ref(0);

editor.defineTheme('TomorrowNight', TomorrowNightTheme);

onMounted(() => {
  // 自定义校验规则
  initMonacoYaml({
    customSchema: {
      ...toRaw(props.schema),
    },
  });

  monacoEditor = editor.create(editorRef.value as HTMLElement, {
    language: 'yaml',
    theme: 'TomorrowNight',
    automaticLayout: true,
    model: editor.createModel(props.modelValue, 'yaml', modelUri),
  });
  editor.getModels().forEach((model) => model.updateOptions({ tabSize: 2 }));

  if (props.readOnly) {
    monacoEditor.updateOptions({
      readOnly: true,
    });
  }

  monacoEditor.onDidChangeModelContent(() => {
    emits('change', monacoEditor.getValue());
  });

  editor.onDidChangeMarkers(([resource]) => {
    const markers = editor.getModelMarkers({ resource });

    markerCount.value = 0;
    markers.forEach((marker) => {
      if ([MarkerSeverity.Warning, MarkerSeverity.Error].includes(marker.severity)) {
        markerCount.value += 1;
      }
    });
    emits('marker-change', markerCount.value);
  });
});

onBeforeUnmount(() => {
  editor.getModels().forEach((model) => model.dispose());
  monacoEditor.dispose();
});
</script>
