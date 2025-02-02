import React from "react";
import { getSingletonHighlighter, normalizeTheme } from "shiki";
import { ImageResponse } from "@vercel/og";
import { Parser as HtmlToReactParser } from "html-to-react";
import { addTwToHast } from "../utils/hast.js";
import { cloneElement } from "react";
import karmaDarkJSON from "@sreetamdas/karma/themes/default.json";
import { SanityLogo } from "../components/SanityLogo.js";
import fs from "node:fs/promises";
import path from "node:path";
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
const theme = normalizeTheme(karmaDarkJSON);
const cachedFonts = {};
async function loadFonts() {
  if (!cachedFonts.jetBrains) {
    cachedFonts.jetBrains = await fs.readFile(
      path.join(process.cwd(), "fonts/jetbrains.ttf"),
    );
  }
  if (!cachedFonts.inter) {
    cachedFonts.inter = await fs.readFile(
      path.join(process.cwd(), "fonts/inter.ttf"),
    );
  }
  return {
    jetBrains: cachedFonts.jetBrains,
    inter: cachedFonts.inter,
  };
}
export async function createImage(props) {
  const { value, language, fileName, highlightLines = [] } = props;
  try {
    const lines = value.trim().split("\n");
    const maxLineLength = Math.max(...lines.map((line) => line.length));
    const contentWidth = maxLineLength * CHAR_WIDTH;
    const calculatedWidth = Math.max(
      contentWidth + PADDING + FIGURE_PADDING + LINE_NUMBER_WIDTH,
      MIN_WIDTH,
    );
    const calculatedHeight = Math.max(
      lines.length * LINE_HEIGHT + PADDING + FIGURE_PADDING + HEADER_HEIGHT,
      MIN_HEIGHT,
    );
    const fonts = await loadFonts();
    const shiki = await getSingletonHighlighter({
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
            addTwToHast(node, "flex-col w-full bg-[#1b1d27]");
          },
          line(node, line) {
            addTwToHast(node, "items-center pl-4 pr-12");
            node.children.unshift({
              type: "element",
              tagName: "span",
              properties: {
                tw: "justify-end w-16 text-[#9499ad] shrink-0 mr-10",
              },
              children: [{ type: "text", value: line.toString() }],
            });
            if (highlightLines?.includes(line)) {
              addTwToHast(node, "bg-[#0d0e12]");
            }
          },
          span(node) {
            addTwToHast(node, "shrink-0 leading-6");
          },
        },
      ],
    });
    const htmlToReactParser = HtmlToReactParser();
    const parsedCode = htmlToReactParser.parse(code);
    const cleanedChildren = Array.isArray(
      parsedCode.props.children.props.children,
    )
      ? parsedCode.props.children.props.children.filter(
          (child) => typeof child !== "string" || child.trim() !== "",
        )
      : parsedCode.props.children.props.children;
    const cleanedParsedCode = cloneElement(
      parsedCode,
      parsedCode.props,
      cloneElement(
        parsedCode.props.children,
        parsedCode.props.children.props,
        cleanedChildren,
      ),
    );
    const codeWithStyle = cloneElement(cleanedParsedCode, {
      tw: "m-0",
    });
    return new ImageResponse(
      React.createElement(
        "main",
        { tw: `text-[${FONT_SIZE_PX}] flex w-full h-full bg-[#1b1d27] p-16` },
        React.createElement(
          "figure",
          {
            tw: "flex-col shadow-2xl border-2 border-[#252837] rounded-3xl pb-10",
          },
          React.createElement(
            "header",
            { tw: "flex items-center p-8 pl-9 pb-6" },
            React.createElement(SanityLogo, {
              tw: "w-15 h-15 mr-8 shadow-lg shadow-red-500/50 rounded-xl",
            }),
            React.createElement(
              "span",
              { tw: "text-[#f6f6f8] text-2xl", style: { fontFamily: "inter" } },
              fileName,
            ),
          ),
          codeWithStyle ?? "Something went wrong",
        ),
      ),
      {
        width: calculatedWidth,
        height: calculatedHeight,
        fonts: [
          {
            name: "mono",
            data: fonts.jetBrains,
            style: "normal",
            weight: 400,
          },
          {
            name: "inter",
            data: fonts.inter,
            style: "normal",
            weight: 400,
          },
        ],
      },
    );
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}
