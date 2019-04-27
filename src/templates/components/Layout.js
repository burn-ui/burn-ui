import 'prismjs/themes/prism-okaidia.css';
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import MDXComponents from './mdx';

import Link from './Link';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  ${() => {
    /* Override PrismJS Defaults */ return null;
  }}

  pre {
    background-color: #2f1e2e !important;
    border-radius: 4px;
    font-size: 14px;
  }

  .gatsby-highlight-code-line {
    background-color: #4f424c;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 1em;
  }
`;

const navigationOptions = [
  { label: 'Home', pathname: '/' },
  { label: 'Dropdown', pathname: '/dropdown' },
];

function Layout({ site, frontmatter = {}, children }) {
  const {
    title,
    description: siteDescription,
    keywords: siteKeywords,
  } = site.siteMetadata;

  const {
    keywords: frontmatterKeywords,
    description: frontmatterDescription,
  } = frontmatter;

  const keywords = (frontmatterKeywords || siteKeywords).join(', ');
  const description = frontmatterDescription || siteDescription;

  return (
    <div style={{ minHeight: '100vh', margin: '50px' }}>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
        ]}
      >
        <html lang="pt-br" />
      </Helmet>

      <GlobalStyle />

      <MDXProvider components={MDXComponents}>
        <ul>
          {navigationOptions.map(({ label, pathname }) => (
            <li key={label}>
              <Link to={pathname}>{label}</Link>
            </li>
          ))}
        </ul>
        {children}
      </MDXProvider>
    </div>
  );
};

export const pageQuery = graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author
      keywords
    }
  }
`;

export default Layout;