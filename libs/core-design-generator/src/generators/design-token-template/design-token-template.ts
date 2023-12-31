import { formatFiles, generateFiles, logger, names, offsetFromRoot, Tree } from '@nx/devkit';
import * as path from 'path';
import { libraryGenerator } from '@nx/js';

import { normalizeOptions } from '@kuda-terbang/generator-utils';
import { CustomGeneratorGeneratorSchema } from './schema';

interface NormalizedSchema extends CustomGeneratorGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

async function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    // Define variable used in design-token-template template as it is
    allTokens: [],
    tmpl: '',
    currentVersion: options.version,
  };

  // Copy paste template value
  const designTokenTemplatePath = '/' + options.projectRoot + '/templates';
  const templateFiles = tree.children(designTokenTemplatePath);
  const fileContents = [];

  templateFiles.forEach((templateFile) => {
    const readFilePath = `${designTokenTemplatePath}/${templateFile}`;
    const fileRead = tree.read(readFilePath);
    fileContents.push({
      fileName: templateFile,
      content: fileRead,
    });
    const deleteFilePath = `${options.projectRoot}/templates/${templateFile}`;
    tree.delete(deleteFilePath);
  });
  logger.log('COPY', 'package design-token-template/template');

  generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);

  fileContents.forEach((fileContent) => {
    tree.write(
      options.projectRoot.concat(`/templates/${fileContent.fileName}`),
      fileContent.content
    );
  });
  logger.log('DELETE', 'previous /template');
}

export default async function (tree: Tree, options: CustomGeneratorGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, {
    ...normalizedOptions,
    buildable: true,
  });

  addFiles(tree, normalizedOptions);

  tree.delete(normalizedOptions.projectRoot.concat('/src/lib/'));

  await formatFiles(tree);
}
