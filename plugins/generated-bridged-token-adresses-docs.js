import { visit } from 'unist-util-visit';

// Asynchronous function to fetch data from a URL
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

// Main logic for generating documentation
export const generatedDocs = async () => {
  const url = "https://raw.githubusercontent.com/ethereum-optimism/ethereum-optimism.github.io/master/optimism.tokenlist.json";
  const jsonData = await fetchData(url);

  // Token list from the fetched JSON
  const tokens = jsonData.tokens;

  // Lisk chain IDs
  const chainIds = { liskMainnet: 1135, liskSepolia: 4202 };

  // Filter tokens deployed on Lisk chains
  const liskTokens = tokens.filter(token => Object.values(chainIds).includes(token.chainId));

  // Add Ethereum addresses to each Lisk token
  liskTokens.forEach(token => {
    const targetChainId = token.chainId === chainIds.liskMainnet ? 1 : token.chainId === chainIds.liskSepolia ? 11155111 : null;

    if (targetChainId) {
      // Find a matching token on the corresponding Ethereum chain
      const matchingToken = tokens.find(
        tkn =>
          (tkn.symbol === token.symbol || tkn.symbol + ".e" === token.symbol) &&
          tkn.chainId === targetChainId
      );
      token.ethAddress = matchingToken ? matchingToken.address : "Not Found";
    } else {
      console.error(`Unsupported chainId: ${token.chainId}`);
      token.ethAddress = "Not Found";
    }
  });

  // Generate documentation for tokens
  return (root) => {
    visit(root, "table", (node) => {
      node.children.forEach(row => {
        row.children.forEach(cell => {
          cell.children.forEach(cellChild => {
            // Check for specific table cell values
            if (cellChild.value === "Bridged Token Mainnet" || cellChild.value === "Bridged Token Sepolia") {
              const isMainnet = cellChild.value === "Bridged Token Mainnet";
              cellChild.value = "Bridged Token Name";

              // Select relevant tokens based on the chain
              const relevantTokens = liskTokens.filter(token => 
                token.chainId === (isMainnet ? chainIds.liskMainnet : chainIds.liskSepolia)
              );

              // Add rows for each relevant token
              relevantTokens.forEach(token => {
                node.children.push(createTableRow(token, isMainnet));
              });
            }
          });
        });
      });
    });
  };
};

// Function to create a new table row for a token
function createTableRow(token, isMainnet) {
  // Define explorers for Ethereum and Lisk networks
  const ethExplorer = isMainnet ? "etherscan.io" : "sepolia.etherscan.io";
  const liskExplorer = isMainnet ? "blockscout.lisk.com" : "sepolia-blockscout.lisk.com";

  return {
    type: "tableRow",
    children: [
      { type: "tableCell", children: [{ type: "text", value: token.name }] },
      { type: "tableCell", children: [{ type: "text", value: token.symbol }] },
      {
        type: "tableCell",
        children: [
          {
            type: "link",
            url: `https://${ethExplorer}/address/${token.ethAddress}`,
            children: [{ type: "text", value: token.ethAddress }]
          }
        ]
      },
      {
        type: "tableCell",
        children: [
          {
            type: "link",
            url: `https://${liskExplorer}/address/${token.address}`,
            children: [{ type: "text", value: token.address }]
          }
        ]
      }
    ]
  };
}
