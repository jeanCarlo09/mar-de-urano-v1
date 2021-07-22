exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query AllProducts {
      allShopifyProduct {
        nodes {
          handle
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  if (result.data.length === 0) {
    reporter.panic("No data");
  }

  result.data.allShopifyProduct.nodes.forEach((productItem) => {
    actions.createPage({
      path: productItem.handle,
      component: require.resolve("./src/templates/product.js"),
      context: {
        handle: productItem.handle,
      },
    });
  });
};
