import { logger, Tree } from '@nrwl/devkit';
import { addFiles } from '@kuda-terbang/generator-utils';

import { name } from '../../../../project.json';
import { NextjsClientTemplateNormalized } from '../schema';

export default function (tree: Tree, normalizedOptions: NextjsClientTemplateNormalized) {
  logger.log('START restructure for create react app');

  addFiles(tree, normalizedOptions, name, 'nextjs-client-template', 'cna-files');

  // Delete or update all files related to nx
  tree.delete(normalizedOptions.projectRoot.concat('/project.json'));
  tree.delete(normalizedOptions.projectRoot.concat('/jest.config.ts'));
  // Update eslintrc remove nrwl dependency
  // tree.delete(normalizedOptions.projectRoot.concat('/.eslintrc.json'))

  if (normalizedOptions.isDefaultCnaTemplate) {
    tree.delete(normalizedOptions.projectRoot.concat('/package.json'));
    addFiles(tree, normalizedOptions, name, 'nextjs-client-template', 'default-cna-files');
  }
}
