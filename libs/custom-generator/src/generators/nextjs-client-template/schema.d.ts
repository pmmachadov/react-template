import { Schema } from '@nrwl/next/src/generators/application/schema';
import type { NormalizedSchema } from '../../utils/file-modifier';

export interface NextjsClientTemplateGeneratorSchema extends Schema {
  name: string;
  tags?: string;
  directory?: string;
  isCnaTemplate?: boolean;
  isDefaultCnaTemplate?: boolean;
  designTokenProject?: string;
  designSystemProject?: string;
}
export type NextjsClientTemplateNormalized = NormalizedSchema<NextjsClientTemplateGeneratorSchema>;
