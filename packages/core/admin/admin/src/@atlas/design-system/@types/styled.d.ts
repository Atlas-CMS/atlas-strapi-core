import 'styled-components';
import { StrapiTheme } from './src/index';

declare module 'styled-components' {
  export interface DefaultTheme extends StrapiTheme {}
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
