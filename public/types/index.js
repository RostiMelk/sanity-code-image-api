"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snippet = void 0;
const zod_1 = require("zod");
exports.Snippet = zod_1.z.object({
    value: zod_1.z.string(),
    language: zod_1.z.string(),
    highlightLines: zod_1.z.array(zod_1.z.number()).optional(),
    fileName: zod_1.z.string().optional(),
});
