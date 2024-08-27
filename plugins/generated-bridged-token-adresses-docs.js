import List from './optimism.tokenlist.json';
import {visit} from 'unist-util-visit';

// Superchain Token List
const tokens = List.tokens;

// Lisk Chain IDs
let chainIds =  [1135, 4202];

// Filter all tokens deployed on Lisk chains
var LiskAdresses = tokens.filter(function(token) {
  return chainIds.indexOf(token.chainId) != -1
});
// Add corresponding L1 address to each token
LiskAdresses.forEach(token => {
  var ethAddress;
  // For Lisk Mainnet, add Ethereum Mainnet address
  if (token.chainId === chainIds[0]) {
    ethAddress = tokens.find(function(tkn) {
        return tkn.symbol === token.symbol && tkn.chainId === 1;
    });
  // For Lisk Sepolia, add Ethereum Sepolia address
  } else if (token.chainId === chainIds[1]) {
    ethAddress = tokens.find(function(tkn) {
      return tkn.symbol === token.symbol && tkn.chainId === 11155111;
  });
  } else {
    console.log("Error: chainId not found")
  }
  token.ethAddress = ethAddress.address;
});

export const generatedDocs = () => {
  return async (root) => {
   visit(root, (node) => {
    if (node.type !== 'table') {
      return 
    }
    // For every table in the docs
    node.children.forEach(row => {
      row.children.forEach(cell => {
        // Find a cell with the value 'Bridged Token Name'
        cell.children.forEach(cellChild => {
          if( cellChild.value === 'Bridged Token Name') {
            console.log(cell);
            console.log(row);
            // Add a new row for each token
            LiskAdresses.forEach(token => {
              node.children.push({
                type: 'tableRow',
                children: [
                  {
                    type: 'tableCell',
                    children: [
                      {
                        type: 'text',
                        value: token.name
                      }]
                  },
                  {
                    type: 'tableCell',
                    children: [
                      {
                        type: 'text',
                        value: token.symbol
                      }]
                  },
                  {
                    type: 'tableCell',
                    children: [
                      {
                        type: 'text',
                        value: token.ethAddress
                      }]
                  },
                  {
                    type: 'tableCell',
                    children: [
                      {
                        type: 'text',
                        value: token.address
                      }]
                  }]
                });
            });
          }
        });
      });
    });
  });
}};
