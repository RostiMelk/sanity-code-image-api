"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTwToHast = addTwToHast;
function addTwToHast(node, twName) {
    var _a;
    if (!twName)
        return node;
    node.properties || (node.properties = {});
    (_a = node.properties).tw || (_a.tw = []);
    if (typeof node.properties.tw === "string")
        node.properties.tw = node.properties.tw.split(/\s+/g);
    if (!Array.isArray(node.properties.tw))
        node.properties.tw = [];
    const targets = Array.isArray(twName) ? twName : twName.split(/\s+/g);
    for (const c of targets) {
        if (c && !node.properties.tw.includes(c))
            node.properties.tw.push(c);
    }
    return node;
}
