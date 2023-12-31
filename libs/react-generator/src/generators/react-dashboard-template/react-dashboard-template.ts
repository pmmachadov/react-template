import { formatFiles, Tree } from '@nx/devkit';
import { applicationGenerator } from '@nx/react';
import { addFiles, normalizeOptions } from '@kuda-terbang/generator-utils';

import { name } from '../../../project.json';
import { ReactDashboardTemplateGeneratorSchema } from './schema';
import generateCraTemplate from './libs/generate-cra-template';
import generateFromModules from './libs/generate-from-modules';
import { checkAndGenerateDepLibs } from '../../utils/generate-not-exist';

export default async function (tree: Tree, options: ReactDashboardTemplateGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options, 'app');

  await checkAndGenerateDepLibs(tree);

  await applicationGenerator(tree, {
    ...normalizedOptions,
  });

  addFiles(tree, normalizedOptions, name, 'react-dashboard-template', 'files');

  if (normalizedOptions.isCraTemplate) {
    generateCraTemplate(tree, normalizedOptions);
  } else {
    tree.delete(normalizedOptions.projectRoot.concat('/src/app/nx-welcome.tsx'));
  }

  generateFromModules(tree, normalizedOptions);

  await formatFiles(tree);
}
