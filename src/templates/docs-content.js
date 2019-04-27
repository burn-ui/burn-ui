import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

import Layout from './components/Layout';

function DocsContent({ data }) {
  const { site, mdx } = data;

  return (
    <Layout site={site} frontmatter={mdx.frontmatter}>
      <MDXRenderer>{mdx.code.body}</MDXRenderer>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
      }
      code {
        body
      }
    }
  }
`;

export default DocsContent;