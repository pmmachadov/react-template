import { Schema } from '@nrwl/react/src/generators/library/schema'
import { NormalizedSchema } from '../../utils/file-modifier';

export interface UiMuiReactComponentGeneratorSchema extends Schema {
    withLocalToken?: boolean;
}
export type UiMuiReactComponentNormalized = NormalizedSchema<UiMuiReactComponentGeneratorSchema>