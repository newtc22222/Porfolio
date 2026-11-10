// Writes the 1200x630 share cards into dist/og/: home.png and one per
// product. Runs after scripts/prerender.mjs, from the same server bundle,
// so the cards always match the product data.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const WIDTH = 1200;
const HEIGHT = 630;

// Mirrors the tokens in the @theme block of src/App.css.
const COLOR = {
  desk: '#d8dee3',
  paper: '#fbfaf5',
  ink: '#2b3138',
  muted: '#5b6670',
  brand: '#4da8da',
  brandStrong: '#1f6f9c',
};

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist', 'og');

const { PRODUCTS, HERO_LINE } = await import(
  pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href
);

const font = (weight) =>
  readFile(
    join(
      root,
      'node_modules/@fontsource/bricolage-grotesque/files',
      `bricolage-grotesque-latin-${weight}-normal.woff`
    )
  );
const fonts = [
  { name: 'Bricolage Grotesque', data: await font(800), weight: 800 },
  { name: 'Bricolage Grotesque', data: await font(500), weight: 500 },
];

const el = (style, children) => ({
  type: 'div',
  props: { style: { display: 'flex', ...style }, children },
});

// A sheet of paper lying slightly askew on the desk.
const card = ({ title, subtitle, titleSize }) =>
  el(
    {
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: COLOR.desk,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Bricolage Grotesque',
    },
    el(
      {
        width: 1040,
        height: 470,
        backgroundColor: COLOR.paper,
        transform: 'rotate(-1.5deg)',
        boxShadow: '0 30px 50px rgba(0, 0, 0, 0.18)',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '56px 64px',
      },
      [
        el({ flexDirection: 'column' }, [
          el(
            {
              fontSize: titleSize,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: COLOR.ink,
            },
            title
          ),
          el(
            {
              marginTop: 24,
              fontSize: 36,
              fontWeight: 500,
              color: COLOR.brandStrong,
            },
            subtitle
          ),
        ]),
        el({ alignItems: 'center', justifyContent: 'space-between' }, [
          el({ width: 120, height: 10, backgroundColor: COLOR.brand }, []),
          el(
            { fontSize: 30, fontWeight: 500, color: COLOR.muted },
            'phivo.dev'
          ),
        ]),
      ]
    )
  );

const cards = [
  {
    file: 'home.png',
    title: HERO_LINE,
    subtitle: PRODUCTS.map((product) => product.name).join(' · '),
    titleSize: 76,
  },
  ...PRODUCTS.map((product) => ({
    file: `${product.slug}.png`,
    title: product.name,
    subtitle: product.tagline,
    titleSize: 104,
  })),
];

await mkdir(out, { recursive: true });
for (const { file, ...content } of cards) {
  const svg = await satori(card(content), {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } })
    .render()
    .asPng();
  await writeFile(join(out, file), png);
}

// Every card the pages point at must exist at the right size.
const failures = [];
for (const { file } of cards) {
  const png = await readFile(join(out, file)).catch(() => null);
  if (!png) {
    failures.push(`dist/og/${file} was not written`);
    continue;
  }
  // PNG: width and height are big-endian integers at bytes 16 and 20.
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  if (width !== WIDTH || height !== HEIGHT) {
    failures.push(
      `dist/og/${file} is ${width}x${height}, not ${WIDTH}x${HEIGHT}`
    );
  }
}
if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`share cards written: ${cards.map((c) => c.file).join(', ')}`);
