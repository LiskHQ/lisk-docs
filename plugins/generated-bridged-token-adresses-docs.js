import {visit} from 'unist-util-visit';
import {XMLHttpRequest} from 'xmlhttprequest';

function Get(url){
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET",url,false);
  Httpreq.send(null);
  return Httpreq.responseText;          
}

var json_obj = JSON.parse(Get("https://raw.githubusercontent.com/ethereum-optimism/ethereum-optimism.github.io/master/optimism.tokenlist.json"));

// Superchain Token List
const tokens = json_obj.tokens;

// Lisk Chain IDs
let chainIds =  [1135, 4202];

// Filter all tokens deployed on Lisk chains
var LiskAdresses = tokens.filter(function(token) {
  return chainIds.indexOf(token.chainId) != -1
});
// Add corresponding L1 address to each token
LiskAdresses.forEach(token => {
  var ethAddress;
  var result;
  // For Lisk Mainnet, add Ethereum Mainnet address
  if (token.chainId === chainIds[0]) {
    result = tokens.find(function(tkn) {
        return ((tkn.symbol === token.symbol) || (tkn.symbol + ".e" === token.symbol)) && tkn.chainId === 1;
    });
    ethAddress = result? result : {address: "Not Found"};
  // For Lisk Sepolia, add Ethereum Sepolia address
  } else if (token.chainId === chainIds[1]) {
    result = tokens.find(function(tkn) {
      return ((tkn.symbol === token.symbol) || (tkn.symbol + ".e" === token.symbol)) && tkn.chainId === 11155111;
    });
    ethAddress = result? result : {address: "Not Found"};
  } else {
    console.log("Error: chainId not found");
    ethAddress = {address: "Not Found"};
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
        cell.children.forEach(cellChild => {
          // Find a cell with the value 'Bridged Token Mainnet'
          if( cellChild.value === 'Bridged Tokens Mainnet') {
            cellChild.value = 'Bridged Token Name';
            // Add a new row for each Mainnet token
            LiskAdresses.forEach(token => {
              if (token.chainId === chainIds[0]) {
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
                          type: 'link',
                          url: "https://etherscan.io/address/" + token.ethAddress,
                          children: [{type: 'text', value: token.ethAddress }]
                        }
                      ]
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'link',
                          url: "https://blockscout.lisk.com/address/" + token.address,
                          children: [{type: 'text', value: token.address }]
                        }
                      ]
                    }]
                  });
                }
            });
          // Find a cell with the value 'Bridged Token Sepolia'
          } else if (cellChild.value === 'Bridged Tokens Sepolia') {
            cellChild.value = 'Bridged Token Name';
            // Add a new row for each Sepolia token
            LiskAdresses.forEach(token => {
              if (token.chainId === chainIds[1]) {
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
                          type: 'link',
                          url: "https://sepolia.etherscan.io/address/" + token.ethAddress,
                          children: [{type: 'text', value: token.ethAddress }]
                        }
                      ]
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'link',
                          url: "https://sepolia-blockscout.lisk.com/address/" + token.address,
                          children: [{type: 'text', value: token.address }]
                        }
                      ]
                    }]
                  });
                }
            });
          }
        });
      });
    });
  });
}};
