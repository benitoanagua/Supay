import fs from 'node:fs';

const tokenFile = new URL('./src/tokens.json', import.meta.url);
const outDir = new URL('./dist/', import.meta.url);
const outFile = new URL('./styles.css', outDir);
const tokens = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));

const kebab = (key) => key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
const vars = [];

for (const [key, value] of Object.entries(tokens.font)) vars.push(`--strata-font-${kebab(key)}: ${value};`);
for (const [key, value] of Object.entries(tokens.scale)) {
  vars.push(`--strata-radius-${key}: ${value.radius}px;`);
  vars.push(`--strata-border-${key}: ${value.border}px;`);
  vars.push(`--strata-elevation-${key}: ${value.elevation ? `0 ${Math.max(1, value.elevation / 2)}px ${Math.max(2, value.elevation * 4)}px rgba(0,0,0,0.14)` : 'none'};`);
}
for (const [key, value] of Object.entries(tokens.monochrome)) vars.push(`--strata-color-${kebab(key)}: ${value};`);
for (const [key, value] of Object.entries(tokens.spectrum)) vars.push(`--strata-color-${key}: ${value};`);
for (const [key, value] of Object.entries(tokens.spacing)) vars.push(`--strata-space-${key}: ${value}px;`);
for (const [key, value] of Object.entries(tokens.motion)) vars.push(`--strata-motion-${key}: ${value}ms;`);
for (const [key, value] of Object.entries(tokens.editorial)) vars.push(`--strata-editorial-${kebab(key)}: ${value}${key === 'measure' ? 'px' : key === 'gutter' || key === 'dividerDouble' ? 'px' : ''};`);
for (const [key, value] of Object.entries(tokens.icon)) vars.push(`--strata-icon-${kebab(key)}: ${value}px;`);

const themeVars = (theme) => Object.entries(tokens.semantic[theme])
  .map(([key, value]) => `--strata-color-${kebab(key)}: ${value};`)
  .join('');

const css = `@import '@fontsource/source-sans-3/300.css';
@import '@fontsource/source-sans-3/400.css';
@import '@fontsource/source-sans-3/500.css';
@import '@fontsource/source-sans-3/700.css';
@import '@fontsource/source-code-pro/400.css';
@import '@fontsource/source-code-pro/700.css';

:root {
  ${vars.join('\n  ')}
  ${themeVars('light')}
  color-scheme: light;
}

[data-theme="light"] {
  ${themeVars('light')}
  color-scheme: light;
}

[data-theme="dark"] {
  ${themeVars('dark')}
  color-scheme: dark;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    ${themeVars('dark')}
    color-scheme: dark;
  }
}
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, css);
