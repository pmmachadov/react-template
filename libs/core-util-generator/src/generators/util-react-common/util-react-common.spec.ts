import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import generator from './util-react-common';
import { UtilReactCommonGeneratorSchema } from './schema';

describe('util-react-common generator', () => {
  let appTree: Tree;
  const options: UtilReactCommonGeneratorSchema = {};

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
