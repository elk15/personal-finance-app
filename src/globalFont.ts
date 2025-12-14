import { createGlobalStyle } from 'styled-components'
import PublicSans from './assets/fonts/PublicSans-VariableFont_wght.ttf';

const GlobalFont = createGlobalStyle`
  @font-face {
    font-family: 'PublicSans';
    src: url(${PublicSans}) format('truetype');
    font-style: normal;
  }
`;

export default GlobalFont;