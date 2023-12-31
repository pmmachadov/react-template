import { addFiles, normalizeOptions } from '@kuda-terbang/generator-utils';
import { convertNxGenerator, formatFiles, Tree } from '@nx/devkit';
import { Linter } from '@nx/linter';
import { libraryGenerator } from '@nx/react';

import { name } from '../../../project.json';
import { UtilAuthGeneratorSchema } from './schema';

export const utilAuthGenerator = async (tree: Tree, options: UtilAuthGeneratorSchema) => {
  const normalizedOptions = normalizeOptions(tree, {
    ...options,
    name: 'util-auth',
  });
  await libraryGenerator(tree, {
    ...normalizedOptions,
    buildable: true,
    publishable: true,
    importPath: `@${normalizedOptions.npmScope}/util-auth`,
    style: 'none',
    skipFormat: false,
    skipTsConfig: false,
    unitTestRunner: 'jest',
    linter: Linter.EsLint,
  });
  addFiles(tree, normalizedOptions, name, 'util-auth', 'files');

  // Remove unused file after library generator is executed
  tree.delete(normalizedOptions.projectRoot.concat('/src/lib/util-auth.spec.ts'));
  tree.delete(normalizedOptions.projectRoot.concat('/src/lib/util-auth.ts'));
  await formatFiles(tree);
};

export const utilAuthSchematic = convertNxGenerator(utilAuthGenerator);
