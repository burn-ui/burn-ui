import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import GlobalStyles from './GlobalStyles';
// import Nav from './Nav';
import Link from './Link';

// to be used without import inside .md and mdx files
const globalComponents = {
  Link,
};

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
    <>
      <GlobalStyles />
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
        ]}
      >
        <html lang="pt-br" />
      </Helmet>
      <MDXProvider components={globalComponents}>
        {/* <Nav /> */}
        <div style={{ margin: '50px' }}>{children}</div>
      </MDXProvider>
    </>
  );
}

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
