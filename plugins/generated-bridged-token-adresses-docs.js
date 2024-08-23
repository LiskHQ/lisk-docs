//import { Plugin } from 'unified';
//import List from './optimism.tokenlist.json';
import {visit} from 'unist-util-visit';

console.log("+++ Running generated-bridged-token-adresses-docs.js +++");  
//const tokens = List.tokens;
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
          if( cellChild.value === 'Tether USD') {
            console.log(cell);
            row.children.push({
              type: 'tableCell',
              children: [
                {
                  type: 'text',
                  value: 'PUSHED FROM PLUGIN'
                }]
            });
          }
        });
      });
    });
  });
}};

      //if (node.type === 'heading' && node.depth === 1 && node.children[0].value === 'Faucets') {
      /* if (node.type === 'paragraph') {
        //console.log(node);
        node.children.forEach(child => {
          if (child.value.includes('Faucets enable you to get free')) {
            console.log(child);
          }
         // console.log(child);
        }); */
      //} 
      
    //})
    //console.log(root);
    

    // ... (rest of the plugin here!) ...
  //};
//};