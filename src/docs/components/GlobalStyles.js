import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  /* Inline code */
  :not(pre) > code[class="language-text"] {
    border-radius: 0.3em;
    background: rgba(255, 229, 204, 0.8) !important;
    color: rgb(43, 43, 43) !important;
    text-shadow: none;
    padding: 0.15em 0.2em 0.05em;
    white-space: normal;
  }

  .gatsby-highlight {
    margin-bottom: 1.75rem;
    margin-left: -1.3125rem;
    margin-right: -1.3125rem;
    border-radius: 10px;
    background: #011627;
    -webkit-overflow-scrolling: touch;
    overflow: auto;

    @media (max-width: 672px) {
      border-radius: 0;
    }

    /**
    * Based on copypasta from Remy Bach and Sarah Drasner
    */
    code[class*='language-'],
    pre[class*='language-'] {
      color: white;
      background: none;
      font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
      font-feature-settings: normal;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;
      line-height: 1.5;
      margin-bottom: 0;
      tab-size: 2;
    }

    /* Code blocks */
    pre[class*='language-'] {
      overflow: auto;
      padding: 1.3125rem;
    }

    pre[class*='language-']::-moz-selection {
      /* Firefox */
      background: hsl(207, 4%, 16%);
    }

    pre[class*='language-']::selection {
      /* Safari */
      background: hsl(207, 4%, 16%);
    }

    /* Text Selection colour */
    pre[class*='language-']::-moz-selection,
    pre[class*='language-'] ::-moz-selection {
      text-shadow: none;
      background: hsla(0, 0%, 100%, 0.15);
    }

    pre[class*='language-']::selection,
    pre[class*='language-'] ::selection {
      text-shadow: none;
      background: hsla(0, 0%, 100%, 0.15);
    }

    .token.attr-name,
    .token.function {
      color: rgb(133, 246, 137);
    }

    .token.attr-name {
      font-style: italic;
    }

    .token.property {
      color: rgb(128, 203, 196);
    }

    .token.parameter {
      color: rgb(244, 187, 120);
    }

    .token.class-name {
      color: rgb(161, 231, 250);
    }

    .token.comment {
      color: rgb(128, 147, 147);
    }

    .token.string,
    .token.url,
    .token.attr-value,
    .token.attr-value > .token.punctuation {
      color: rgb(242, 249, 154);
    }

    .token.boolean,
    .token.builtin,
    .token.char,
    .token.constant,
    .token.number {
      color: rgb(183, 149, 243);
    }

    .token.tag,
    .token.operator,
    .token.keyword,
    .token.script-punctuation.punctuation,
    .token.script-punctuation.punctuation + .token.punctuation,
    .token.script.language-javascript > .token.punctuation:first-child,
    .token.script.language-javascript > .token.punctuation:last-child,
    .token.attr-name + .token.attr-value > .token.punctuation:first-child {
      color: rgb(239, 129, 195);
    }

    .token.punctuation
    .token.script-punctuation.punctuation,
    .token.script.language-javascript,
    .token.tag > .token.punctuation {
      color: rgb(255, 255, 255);
    }

    pre[data-line] {
      padding: 1em 0 1em 3em;
      position: relative;
    }
  }

  .gatsby-highlight-code-line {
    background-color: rgb(2, 47, 86);
    display: block;
    margin-right: -1.3125rem;
    margin-left: -1.3125rem;
    padding-right: 1em;
    padding-left: 1.25em;
    border-left: .25em solid rgb(161, 231, 250);
  }
`;

export default GlobalStyles;
