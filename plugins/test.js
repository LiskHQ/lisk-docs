// visit is a utility to help us walk through the AST
const visit = require('unist-util-visit')

// We create our plugin by exporting the attacher function
module.exports = logNodes


// The attacher function called logNodes
function logNodes(options) {
  return transformer

  // The transformer takes the tree as an input
  // and optionnally returns a modified tree
  function transformer(tree) {
    // Here we just want to log the nodes
    // no need to modify the tree
    visit(tree, (node) => console.log(node.type))
  }
}
