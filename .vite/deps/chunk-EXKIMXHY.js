// node_modules/.pnpm/applesauce-content@0.7.0_typescript@5.6.2/node_modules/applesauce-content/dist/nast/eol-metadata.js
function eolMetadata() {
  return (tree) => {
    for (let i = 0; i < tree.children.length; i++) {
      const next = tree.children[i + 1];
      if (next && next.type === "text" && next.value.startsWith("\n")) {
        next.data = next.data || {};
        next.data.eol = true;
      }
    }
  };
}

// node_modules/.pnpm/applesauce-content@0.7.0_typescript@5.6.2/node_modules/applesauce-content/dist/nast/truncate.js
function truncateContent(tree, maxLength = 256) {
  let length = 0;
  for (let i = 0; i < tree.children.length; i++) {
    const node = tree.children[i];
    switch (node.type) {
      case "hashtag":
        length += 1 + node.hashtag.length;
        break;
      case "mention":
        length += 10;
        break;
      case "cashu":
        length += node.raw.length;
        break;
      case "gallery":
        length += node.links.reduce((t, l) => t + l.length, 0);
        break;
      case "link":
      case "text":
        length += node.value.length;
        break;
      case "emoji":
        length += 1;
        break;
    }
    if (length > maxLength) {
      if (node.type === "text") {
        const children = i > 0 ? tree.children.slice(0, i) : [];
        const chunkLength = node.value.length - (length - maxLength);
        const newLines = node.value.matchAll(/\n/g);
        for (const match of newLines) {
          if (match.index && match.index > chunkLength) {
            children.push({ type: "text", value: node.value.slice(0, match.index) });
            return { ...tree, children, truncated: true };
          }
        }
        children.push({ type: "text", value: node.value.slice(0, maxLength - length) });
        return { ...tree, children, truncated: true };
      } else
        return { ...tree, children: tree.children.slice(0, i), truncated: true };
    }
  }
  return tree;
}

export {
  eolMetadata,
  truncateContent
};
//# sourceMappingURL=chunk-EXKIMXHY.js.map
