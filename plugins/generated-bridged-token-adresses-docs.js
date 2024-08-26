//import { Plugin } from 'unified';
import List from './optimism.tokenlist.json';
import {visit} from 'unist-util-visit';

console.log("+++ Running generated-bridged-token-adresses-docs.js +++");  
const tokens = List.tokens;

let chainIds =  [1135, 4202];

var LiskAdresses = tokens.filter(function(token) {
 /*  var tokensLisk = chainIds.indexOf(token.chainId) != -1
  var tokenEth;
  if (tokensLisk) {
    tokenEth = tokens.find(function(tkn) {
      return tkn.symbol === token.symbol && token.chainId === 1;
    });
  }
  return tokensLisk && tokenEth; */
  return chainIds.indexOf(token.chainId) != -1
});
console.log("LiskAdresses");
console.log(LiskAdresses);
LiskAdresses.forEach(token => {
  var ethAddress;
  if (token.chainId === chainIds[0]) {
    ethAddress = tokens.find(function(tkn) {
        return tkn.symbol === token.symbol && tkn.chainId === 1;
    });
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
  console.log("+++ Running generatedDocs +++");
  return async (root) => {
    //root.children = tokens;
   visit(root, (node) => {
    if (node.type !== 'table') {
      return 
    }

    node.children.forEach(row => {
      //console.dir("++++" + row.children[0]);
      row.children.forEach(cell => {
        //console.log(cell.type);
        cell.children.forEach(cellChild => {
          if( cellChild.value === 'Bridged Token Name') {
            console.log(cell);
            console.log(row);
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
