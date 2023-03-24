import { createWriteStream, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { icons } from './core/dist/index.mjs';

const SRC_PATH = './src/';
const ICONS_PATH = `${SRC_PATH}components/`;
const ASSETS_PATH = './core/assets/';

const TEMPLATE = readFileSync('./icon.tsx.template', 'utf-8');

const CAPTURE_REGEX =
  /<svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 256 256"( fill="currentColor")?>(.*)<\/svg>/;

const WEIGHTS = ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'];

const generate = (weight) => {
  const weightPath = resolve(ASSETS_PATH, weight);

  const destinationPath = resolve(ICONS_PATH, weight);
  mkdirSync(destinationPath, { recursive: true });

  const module = createWriteStream(resolve(SRC_PATH, `${weight}.ts`));

  icons.forEach(({ name, pascal_name }) => {
    const assetName = name === 'file-search' ? 'file-magnifying-glass' : name;
    const filename = `${assetName}${
      weight === 'regular' ? '' : `-${weight}`
    }.svg`;
    try {
      const svg = readFileSync(resolve(weightPath, filename), 'utf-8');
      const content = CAPTURE_REGEX.exec(svg)[2];
      const component = TEMPLATE.replace('@CONTENT@', content);

      writeFileSync(
        resolve(destinationPath, `${name}.tsx`),
        component,
        'utf-8'
      );
    } catch (_) {
      console.log(name, weight);
    }

    module.write(
      `export { default as ${pascal_name} } from './components/${weight}/${name}';\n`
    );
  });

  module.close();
};

const build = () => WEIGHTS.forEach((weight) => generate(weight));

build();
