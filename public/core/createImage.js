"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImage = createImage;
const react_1 = __importDefault(require("react"));
const shiki_1 = require("shiki");
const og_1 = require("@vercel/og");
const html_to_react_1 = require("html-to-react");
const hast_1 = require("../utils/hast");
const react_2 = require("react");
const default_json_1 = __importDefault(require("@sreetamdas/karma/themes/default.json"));
const SanityLogo_1 = require("../components/SanityLogo");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const FONT_SIZE = 26;
const FONT_SIZE_PX = `${FONT_SIZE}px`;
const CHAR_WIDTH = FONT_SIZE * 0.7;
const LINE_HEIGHT = FONT_SIZE * 1.9;
const PADDING = 48;
const FIGURE_PADDING = 40;
const LINE_NUMBER_WIDTH = 64;
const MIN_WIDTH = 0;
const MIN_HEIGHT = 0;
const HEADER_HEIGHT = FONT_SIZE * 2.5;
const theme = (0, shiki_1.normalizeTheme)(default_json_1.default);
async function createImage(props) {
    const { value, language, fileName, highlightLines = [] } = props;
    try {
        const lines = value.split("\n");
        const maxLineLength = Math.max(...lines.map((line) => line.length));
        const contentWidth = maxLineLength * CHAR_WIDTH;
        const calculatedWidth = Math.max(contentWidth + PADDING + FIGURE_PADDING + LINE_NUMBER_WIDTH, MIN_WIDTH);
        const calculatedHeight = Math.max(lines.length * LINE_HEIGHT + PADDING + FIGURE_PADDING + HEADER_HEIGHT, MIN_HEIGHT);
        const jetBrainsMonoData = await promises_1.default.readFile(node_path_1.default.join(process.cwd(), "fonts/jetbrains.ttf"));
        const interData = await promises_1.default.readFile(node_path_1.default.join(process.cwd(), "fonts/inter.ttf"));
        const shiki = await (0, shiki_1.getSingletonHighlighter)({
            themes: [theme],
            langs: [language],
        }).catch((error) => {
            throw new Error(`Language "${language}" is not supported`);
        });
        const code = shiki.codeToHtml(value, {
            theme: theme,
            lang: language,
            transformers: [
                {
                    code(node) {
                        (0, hast_1.addTwToHast)(node, "flex-col w-full bg-[#1b1d27]");
                    },
                    line(node, line) {
                        (0, hast_1.addTwToHast)(node, "items-center pl-4 pr-12");
                        node.children.unshift({
                            type: "element",
                            tagName: "span",
                            properties: {
                                tw: "justify-end w-16 text-[#9499ad] shrink-0 mr-10",
                            },
                            children: [{ type: "text", value: line.toString() }],
                        });
                        if (highlightLines?.includes(line)) {
                            (0, hast_1.addTwToHast)(node, "bg-[#0d0e12]");
                        }
                    },
                    span(node) {
                        (0, hast_1.addTwToHast)(node, "shrink-0 leading-6");
                    },
                },
            ],
        });
        const htmlToReactParser = (0, html_to_react_1.Parser)();
        const parsedCode = htmlToReactParser.parse(code);
        const cleanedChildren = Array.isArray(parsedCode.props.children.props.children)
            ? parsedCode.props.children.props.children.filter((child) => typeof child !== "string" || child.trim() !== "")
            : parsedCode.props.children.props.children;
        const cleanedParsedCode = (0, react_2.cloneElement)(parsedCode, parsedCode.props, (0, react_2.cloneElement)(parsedCode.props.children, parsedCode.props.children.props, cleanedChildren));
        const codeWithStyle = (0, react_2.cloneElement)(cleanedParsedCode, {
            tw: "m-0",
        });
        return new og_1.ImageResponse((react_1.default.createElement("main", { tw: `text-[${FONT_SIZE_PX}] flex w-full h-full bg-[#1b1d27] p-16` },
            react_1.default.createElement("figure", { tw: "flex-col shadow-2xl border-2 border-[#252837] rounded-3xl pb-10" },
                react_1.default.createElement("header", { tw: "flex items-center p-8 pl-9 pb-6" },
                    react_1.default.createElement(SanityLogo_1.SanityLogo, { tw: "w-15 h-15 mr-8 shadow-lg shadow-red-500/50 rounded-xl" }),
                    react_1.default.createElement("span", { tw: "text-[#f6f6f8] text-2xl", style: { fontFamily: "inter" } }, fileName)),
                codeWithStyle ?? "Something went wrong"))), {
            width: calculatedWidth,
            height: calculatedHeight,
            fonts: [
                {
                    name: "mono",
                    data: jetBrainsMonoData,
                    style: "normal",
                    weight: 400,
                },
                {
                    name: "inter",
                    data: interData,
                    style: "normal",
                    weight: 400,
                },
            ],
        });
    }
    catch (error) {
        console.error("Error generating image:", error);
        return null;
    }
}
