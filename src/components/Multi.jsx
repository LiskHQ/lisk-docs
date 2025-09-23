// src/components/MultiSidebarDocCardList.jsx
import React from 'react';
import DocCardList from '@theme/DocCardList';

// Import useDocusaurusContext safely
let useDocusaurusContext;
try {
  useDocusaurusContext = require('@docusaurus/useDocusaurusContext').default;
} catch (e) {
  console.warn('Failed to import useDocusaurusContext. Metadata may be limited.', e);
}

// Import sidebars configuration
import sidebarsConfig from '../../sidebars.js'; // Adjust path as needed

const MultiSidebarDocCardList = ({
  sidebarIds,
  categoryIds = [],
  maxItems = Infinity,
  heading = null,
  docsPluginId = 'default'
}) => {
  // Get Docusaurus context if available
  let docsData = {};
  if (useDocusaurusContext) {
    const fullContext = useDocusaurusContext();
    console.log(fullContext);
    try {
      const { globalData } = useDocusaurusContext();
      docsData = globalData['docusaurus-plugin-content-docs']?.[docsPluginId]?.versions?.[0]?.docs || {};
    } catch (e) {
      console.warn('Failed to access Docusaurus context:', e);
    }
  } else {
    console.warn('useDocusaurusContext not available. Using fallback mode.');
  }

  // Helper function to normalize category ID
  const normalizeCategoryId = (label) => {
    return label ? label.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
  };

  // Function to get doc metadata from globalData
  const getDocMetadata = (docId, sidebarId) => {
    if (!docId) return null;

    // Try exact ID match
    let docData = docsData[docId];

    // Try variations if not found
    if (!docData) {
      const variations = [
        docId,
        `${sidebarId}/${docId}`,
        `docs/${docId}`,
        docId.replace(/^\//, ''),
      ];

      for (const variation of variations) {
        if (docsData[variation]) {
          docData = docsData[variation];
          break;
        }
      }
    }

    return docData;
  };

  // Create doc item with metadata
  const createDocItem = (item, sidebarId) => {
    const docId = item.id || item.value;

    if (!docId) {
      console.warn('Doc item missing ID:', item);
      return null;
    }

    // Fetch metadata
    const docMetadata = getDocMetadata(docId, sidebarId);

    // Construct item for DocCardList
    const docItem = {
      type: 'doc',
      id: docId,
      label: item.label || (docMetadata?.title || docId),
      path: item.path || (docMetadata?.permalink || `/docs/${docId}`),
      ...(item.href && { href: item.href }),
      ...(item.customProps && { customProps: item.customProps }),
    };

    // Add metadata if available
    if (docMetadata) {
      docItem.title = docMetadata.title || item.label || docId;
      docItem.description = docMetadata.description ||
                           docMetadata.frontMatter?.description ||
                           `Learn about ${item.label?.toLowerCase() || docId}`;
      docItem.docData = docMetadata; // Pass full metadata for DocCardList
    } else {
      // Fallback
      docItem.title = item.label || docId;
      docItem.description = item.description || `Learn about ${item.label?.toLowerCase() || docId}`;
    }

    return docItem;
  };

  // Process sidebar items
  const processSidebarItems = () => {
    const allItems = [];

    sidebarIds.forEach((sidebarId) => {
      const sidebar = sidebarsConfig[sidebarId];

      console.log("++++ sidebar +++");
      console.log(sidebar);

      if (!sidebar || !Array.isArray(sidebar)) {
        console.warn(`Sidebar "${sidebarId}" not found or invalid. Available: ${Object.keys(sidebarsConfig).join(', ')}`);
        return;
      }

      console.log(`Processing sidebar: ${sidebarId} (${sidebar.length} items)`);

      // Recursive function to extract items
      const extractItems = (items, depth = 0) => {
         console.log("+++++++. items ++++++++");
        console.log(items);
        items.forEach((item) => {
            console.log("item.type");
            console.log(item.type);
            if (item.type === undefined ) {
                console.log(item);
            }
          if (item.type === 'category') {
            const categoryId = item.id || normalizeCategoryId(item.label);
            const shouldInclude = categoryIds.length === 0 ||
              categoryIds.includes(categoryId) ||
              categoryIds.includes(item.label);

            if (shouldInclude) {
              console.log(`  ${'  '.repeat(depth)}Including category: ${item.label}`);
              extractItems(item.items, depth + 1);
            } else if (categoryIds.length > 0) {
              console.log(`  ${'  '.repeat(depth)}Skipping category: ${item.label}`);
            }
          } else if (item.type === 'doc') {
            const docItem = createDocItem(item, sidebarId);
            if (docItem) {
              allItems.push(docItem);
              console.log(`  ${'  '.repeat(depth)}Added doc: ${docItem.title} (${docItem.id})`);
            }
          } else if (item.type === 'link') {
            allItems.push({
              type: 'link',
              label: item.label,
              href: item.href,
              title: item.label,
              description: item.description || `External resource: ${item.label}`,
              ...(item.customProps && { customProps: item.customProps }),
            });
            console.log(`  ${'  '.repeat(depth)}Added link: ${item.label}`);
          } else if (item.type === undefined){
            allItems.push({
              type: 'link',
              label: item,
              href: item,
              title: item,
              description: item,
            });
            console.log(`  ${'  '.repeat(depth)}Added link: ${item.path}`);
          }
        });
      };

      extractItems(sidebar, 0);
    });

    return allItems.slice(0, maxItems);
  };

  const items = processSidebarItems();

  console.log("items");
  console.log(items);

  // Handle empty state
  if (items.length === 0) {
    return (
      <div className="alert alert--warning margin-bottom--lg">
        <h3>No items found</h3>
        <p>No documentation items match your criteria.</p>
        <details>
          <summary>Debug info</summary>
          <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
            {JSON.stringify({
              sidebarIds,
              categoryIds,
              availableSidebars: Object.keys(sidebarsConfig),
              docsPluginId,
              availableDocs: Object.keys(docsData).slice(0, 10), // Limit for brevity
              hasContext: !!useDocusaurusContext,
            }, null, 2)}
          </pre>
        </details>
      </div>
    );
  }

  // Render heading if provided
  const headingElement = heading ? (
    <h2 className="margin-bottom--md">{heading}</h2>
  ) : null;

  return (
    <div>
      {headingElement}
      <DocCardList items={items} />
      {items.length < processSidebarItems().length && maxItems < Infinity && (
        <p className="margin-top--sm text--secondary">
          Showing {items.length} of {processSidebarItems().length} total items
        </p>
      )}
    </div>
  );
};

export default MultiSidebarDocCardList;