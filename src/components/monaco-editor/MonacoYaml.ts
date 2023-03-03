import { Uri } from 'monaco-editor';
import { setDiagnosticsOptions } from 'monaco-yaml';
import defaultSchema from './defaultSchema';

interface MonacoYamlOptions {
  customSchema?: {
    [key: string]: unknown
  }
}

export const modelUri = Uri.parse('monaco-yaml.yaml');

export default function initMonacoYaml(options: MonacoYamlOptions) {
  setDiagnosticsOptions({
    enableSchemaRequest: true,
    hover: true,
    completion: true,
    validate: true,
    format: true,
    schemas: [
      {
        uri: 'monaco-yaml.yaml',
        fileMatch: [String(modelUri)],
        schema: {
          properties: {
            ...defaultSchema,
            ...options?.customSchema,
          },
        },
      },
    ],
  });
}
