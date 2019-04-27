const path = require('path');

const createPages = (createPage, edges) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node;
    const next = i === edges.length - 1 ? null : edges[i + 1].node;

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/docs-content.js`),
      context: {
        id: node.id,
        prev,
        next,
      },
    });
  });
};

exports.createPages = ({ actions, graphql }) =>
  graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            fields {
              title
              slug
            }
            code {
              scope
            }
          }
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) {
      return Promise.reject(errors);
    }

    createPages(actions.createPage, data.allMdx.edges);
  });

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    createNodeField({
      name: 'id',
      node,
      value: node.id,
    });

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    });

    createNodeField({
      name: 'slug',
      node,
      value: node.frontmatter.slug,
    });

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date || '',
    });
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
      },
    },
  });
};