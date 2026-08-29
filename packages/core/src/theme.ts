export type StrataTheme='light'|'dark';
export function setStrataTheme(theme:StrataTheme, root:HTMLElement|Document=document){const target=root instanceof Document?root.documentElement:root;target.setAttribute('data-theme',theme);}
export function getStrataTheme(root:HTMLElement|Document=document):StrataTheme{const target=root instanceof Document?root.documentElement:root;return target.getAttribute('data-theme')==='dark'?'dark':'light';}
