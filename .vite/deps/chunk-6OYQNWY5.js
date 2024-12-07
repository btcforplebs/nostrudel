import {
  visitParents
} from "./chunk-ACPGOQRF.js";

// node_modules/.pnpm/applesauce-content@0.7.0_typescript@5.6.2/node_modules/applesauce-content/dist/nast/find-and-replace.js
function findAndReplace(tree, list) {
  const pairs = list;
  let pairIndex = -1;
  const visitor = (node, parents) => {
    let index = -1;
    let grandparent;
    while (++index < parents.length) {
      const parent = parents[index];
      grandparent = parent;
    }
    if (grandparent) {
      return handler(node, parents);
    }
    return void 0;
  };
  while (++pairIndex < pairs.length) {
    visitParents(tree, "text", visitor);
  }
  function handler(node, parents) {
    const parent = parents[parents.length - 1];
    const find = pairs[pairIndex][0];
    const replace = pairs[pairIndex][1];
    let start = 0;
    const siblings = parent.children;
    const index = siblings.indexOf(node);
    let change = false;
    let nodes = [];
    find.lastIndex = 0;
    let match = find.exec(node.value);
    while (match) {
      const position = match.index;
      let value = replace(...match);
      if (typeof value === "string") {
        value = value.length > 0 ? { type: "text", value } : void 0;
      }
      if (value === false) {
        find.lastIndex = position + 1;
      } else {
        if (start !== position) {
          nodes.push({
            type: "text",
            value: node.value.slice(start, position)
          });
        }
        if (Array.isArray(value)) {
          nodes.push(...value);
        } else if (value) {
          nodes.push(value);
        }
        start = position + match[0].length;
        change = true;
      }
      if (!find.global) {
        break;
      }
      match = find.exec(node.value);
    }
    if (change) {
      if (start < node.value.length) {
        nodes.push({ type: "text", value: node.value.slice(start) });
      }
      parent.children.splice(index, 1, ...nodes);
    } else {
      nodes = [node];
    }
    return index + nodes.length;
  }
}

export {
  findAndReplace
};
//# sourceMappingURL=chunk-6OYQNWY5.js.map
