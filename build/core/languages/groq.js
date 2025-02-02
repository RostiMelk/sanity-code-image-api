"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groqLanguage = void 0;
/**
 * Copied from https://github.com/sanity-io/vscode-sanity/blob/main/grammars/groq.json
 * Unfortunately, we don't have a separate package for this grammar and adding
 * a VSCode extension as a dependency seems undesirable, so just copy-n-pasted.
 * That file hasn't been updated in years, so 🤞 this proves fine.
 */
exports.groqLanguage = {
    // $schema: "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
    name: "groq",
    scopeName: "source.groq",
    patterns: [
        {
            include: "#query",
        },
        {
            include: "#value",
        },
        {
            include: "#pair",
        },
    ],
    repository: {
        query: {
            patterns: [
                {
                    include: "#nullary-access-operator",
                },
                {
                    include: "#arraylike",
                },
                {
                    include: "#pipe",
                },
                {
                    include: "#sort-order",
                },
                {
                    include: "#filter",
                },
            ],
        },
        variable: {
            match: "\\$[_A-Za-z][_0-9A-Za-z]*",
            name: "variable.other.groq",
        },
        keyword: {
            match: "\\b(asc|desc|in|match)\\b",
            name: "keyword.other.groq",
        },
        comparison: {
            match: "(==|!=|>=|<=|(?<!=)>|<)",
            name: "keyword.operator.comparison.groq",
        },
        operator: {
            match: "(\\+|-|\\*{1,2}|/|%)",
            name: "keyword.operator.arithmetic.groq",
        },
        pipe: {
            match: "\\|",
            name: "keyword.operator.pipe.groq",
        },
        logical: {
            match: "(!|&&|(\\|\\|))",
            name: "keyword.operator.logical.groq",
        },
        reference: {
            match: "\\->",
            name: "keyword.operator.reference.groq",
        },
        pair: {
            patterns: [
                {
                    include: "#identifier",
                },
                {
                    include: "#value",
                },
                {
                    include: "#filter",
                },
                {
                    match: "=>",
                    name: "keyword.operator.pair.groq",
                },
            ],
        },
        arraylike: {
            begin: "\\[",
            beginCaptures: {
                0: {
                    name: "punctuation.definition.bracket.begin.groq",
                },
            },
            end: "\\](\\s*\\.)?",
            endCaptures: {
                0: {
                    name: "punctuation.definition.bracket.end.groq",
                },
                1: {
                    name: "keyword.operator.descendant.groq",
                },
            },
            patterns: [
                {
                    include: "#range",
                },
                {
                    include: "#filter",
                },
                {
                    include: "#array-values",
                },
            ],
        },
        array: {
            name: "meta.structure.array.groq",
            begin: "\\[",
            beginCaptures: {
                0: {
                    name: "punctuation.definition.bracket.begin.groq",
                },
            },
            end: "\\]",
            endCaptures: {
                0: {
                    name: "punctuation.definition.bracket.end.groq",
                },
            },
            patterns: [
                {
                    include: "#array-values",
                },
            ],
        },
        range: {
            name: "meta.structure.range.groq",
            match: "\\s*(\\d+)\\s*(\\.{2,3})\\s*(\\d+)\\s*",
            captures: {
                1: {
                    name: "constant.numeric.groq",
                },
                2: {
                    name: "keyword.operator.range.groq",
                },
                3: {
                    name: "constant.numeric.groq",
                },
            },
        },
        spread: {
            name: "meta.structure.spread.groq",
            begin: "\\.\\.\\.",
            beginCaptures: {
                0: {
                    name: "punctuation.definition.spread.begin.groq",
                },
            },
            end: "(?=.)",
            applyEndPatternLast: true,
            endCaptures: {
                0: {
                    name: "punctuation.definition.spread.end.groq",
                },
            },
            patterns: [
                {
                    include: "#array",
                },
                {
                    include: "#function-call",
                },
                {
                    include: "#projection",
                },
            ],
        },
        "array-values": {
            name: "meta.structure.array-values.groq",
            patterns: [
                {
                    include: "#value",
                },
                {
                    include: "#spread",
                },
                {
                    match: ",",
                    name: "punctuation.separator.array.groq",
                },
                {
                    match: "[^\\s\\]]",
                    name: "invalid.illegal.expected-array-separator.groq",
                },
            ],
        },
        filter: {
            name: "meta.structure.filter.groq",
            patterns: [
                {
                    include: "#function-call",
                },
                {
                    include: "#keyword",
                },
                {
                    include: "#constant",
                },
                {
                    include: "#identifier",
                },
                {
                    include: "#value",
                },
                {
                    include: "#comparison",
                },
                {
                    include: "#operator",
                },
                {
                    include: "#logical",
                },
            ],
        },
        comments: {
            patterns: [
                {
                    name: "comment.line.double-slash.js",
                    match: "(//).*$\\n?",
                    captures: {
                        1: {
                            name: "punctuation.definition.comment.groq",
                        },
                    },
                },
            ],
        },
        "nullary-access-operator": {
            match: "[*@^]",
            name: "constant.language.groq",
        },
        constant: {
            match: "\\b(?:true|false|null)\\b",
            name: "constant.language.groq",
        },
        number: {
            match: "(?x)        # turn on extended mode\n  -?        # an optional minus\n  (?:\n    0       # a zero\n    |       # ...or...\n    [1-9]   # a 1-9 character\n    \\d*     # followed by zero or more digits\n  )\n  (?:\n    (?:\n      \\.    # a period\n      \\d+   # followed by one or more digits\n    )?\n    (?:\n      [eE]  # an e character\n      [+-]? # followed by an option +/-\n      \\d+   # followed by one or more digits\n    )?      # make exponent optional\n  )?        # make decimal portion optional",
            name: "constant.numeric.groq",
        },
        "named-projection": {
            patterns: [
                {
                    include: "#identifier",
                },
                {
                    include: "#objectkey",
                },
                {
                    include: "#projection",
                },
            ],
        },
        projection: {
            begin: "\\{",
            beginCaptures: {
                0: {
                    name: "punctuation.definition.projection.begin.groq",
                },
            },
            end: "\\}",
            endCaptures: {
                0: {
                    name: "punctuation.definition.projection.end.groq",
                },
            },
            name: "meta.structure.projection.groq",
            patterns: [
                {
                    include: "#identifier",
                },
                {
                    include: "#objectkey",
                },
                {
                    include: "#named-projection",
                },
                {
                    include: "#comments",
                },
                {
                    include: "#spread",
                },
                {
                    include: "#pair",
                },
                {
                    begin: ":",
                    beginCaptures: {
                        0: {
                            name: "punctuation.separator.projection.key-value.groq",
                        },
                    },
                    end: "(,)|(?=\\})",
                    endCaptures: {
                        1: {
                            name: "punctuation.separator.projection.pair.groq",
                        },
                    },
                    name: "meta.structure.projection.value.groq",
                    patterns: [
                        {
                            include: "#nullary-access-operator",
                        },
                        {
                            include: "#arraylike",
                        },
                        {
                            include: "#value",
                        },
                        {
                            include: "#spread",
                        },
                        {
                            include: "#identifier",
                        },
                        {
                            include: "#operator",
                        },
                        {
                            include: "#comparison",
                        },
                        {
                            include: "#pair",
                        },
                        {
                            match: "[^\\s,]",
                            name: "invalid.illegal.expected-projection-separator.groq",
                        },
                    ],
                },
                {
                    match: "[^\\s\\},]",
                    name: "invalid.illegal.expected-projection-separator.groq",
                },
            ],
        },
        string: {
            name: "string.quoted.groq",
            patterns: [
                {
                    include: "#single-string",
                },
                {
                    include: "#double-string",
                },
            ],
        },
        "double-string": {
            name: "string.quoted.double.groq",
            begin: '"',
            beginCaptures: {
                0: {
                    name: "punctuation.definition.string.begin.groq",
                },
            },
            end: '"',
            endCaptures: {
                0: {
                    name: "punctuation.definition.string.end.groq",
                },
            },
            patterns: [
                {
                    include: "#stringcontent",
                },
            ],
        },
        "single-string": {
            name: "string.quoted.single.groq",
            begin: "'",
            beginCaptures: {
                0: {
                    name: "punctuation.definition.string.single.begin.groq",
                },
            },
            end: "'",
            endCaptures: {
                0: {
                    name: "punctuation.definition.string.single.end.groq",
                },
            },
            patterns: [
                {
                    include: "#stringcontent",
                },
            ],
        },
        objectkey: {
            name: "string.groq support.type.property-name.groq",
            patterns: [
                {
                    include: "#string",
                },
            ],
        },
        stringcontent: {
            patterns: [
                {
                    match: '(?x)                # turn on extended mode\n  \\\\                # a literal backslash\n  (?:               # ...followed by...\n    ["\\\\/bfnrt]     # one of these characters\n    |               # ...or...\n    u               # a u\n    [0-9a-fA-F]{4}) # and four hex digits',
                    name: "constant.character.escape.groq",
                },
                {
                    match: "\\\\.",
                    name: "invalid.illegal.unrecognized-string-escape.groq",
                },
            ],
        },
        "sort-pair": {
            name: "attribute.sortpair.groq",
            patterns: [
                {
                    match: "([_A-Za-z][_0-9A-Za-z]*)(?:\\s*(asc|desc))?",
                    captures: {
                        1: {
                            name: "variable.other.readwrite.groq",
                        },
                        2: {
                            name: "keyword.other.groq",
                        },
                    },
                },
                {
                    begin: "(@)(\\[)",
                    beginCaptures: {
                        1: {
                            name: "constant.language.groq",
                        },
                        2: {
                            name: "punctuation.definition.bracket.begin.groq",
                        },
                    },
                    end: "(\\])(?:\\s*(asc|desc))?",
                    endCaptures: {
                        1: {
                            name: "punctuation.definition.bracket.begin.groq",
                        },
                        2: {
                            name: "keyword.other.groq",
                        },
                    },
                    patterns: [
                        {
                            include: "#string",
                        },
                    ],
                },
            ],
        },
        "sort-order": {
            name: "support.function.sortorder.groq",
            begin: "\\b(order)\\s*\\(",
            beginCaptures: {
                0: {
                    name: "support.function.sortorder.begin.groq",
                },
            },
            end: "\\)",
            endCaptures: {
                0: {
                    name: "support.function.sortorder.end.groq",
                },
            },
            patterns: [
                {
                    include: "#sort-pair",
                },
                {
                    match: ",",
                    name: "punctuation.separator.array.groq",
                },
                {
                    match: "[^\\s\\]]",
                    name: "invalid.illegal.expected-sort-separator.groq",
                },
            ],
        },
        "function-call": {
            patterns: [
                {
                    include: "#function-var-arg",
                },
                {
                    include: "#function-single-arg",
                },
                {
                    include: "#function-round",
                },
            ],
        },
        "function-var-arg": {
            name: "support.function.vararg.groq",
            begin: "\\b(coalesce|select)\\s*\\(",
            beginCaptures: {
                0: {
                    name: "support.function.vararg.begin.groq",
                },
            },
            end: "\\)",
            endCaptures: {
                0: {
                    name: "support.function.vararg.end.groq",
                },
            },
            patterns: [
                {
                    include: "#value",
                },
                {
                    include: "#identifier",
                },
                {
                    include: "#filter",
                },
                {
                    include: "#pair",
                },
                {
                    match: ",",
                    name: "punctuation.separator.array.groq",
                },
            ],
        },
        "function-single-arg": {
            name: "support.function.singlearg.groq",
            begin: "\\b(count|defined|length|path|references)\\s*\\(",
            beginCaptures: {
                0: {
                    name: "support.function.singlearg.begin.groq",
                },
            },
            end: "\\)",
            endCaptures: {
                0: {
                    name: "support.function.singlearg.end.groq",
                },
            },
            patterns: [
                {
                    include: "#query",
                },
                {
                    include: "#identifier",
                },
                {
                    include: "#value",
                },
                {
                    include: "#pair",
                },
            ],
        },
        identifier: {
            patterns: [
                {
                    match: "([_A-Za-z][_0-9A-Za-z]*)\\s*(\\[\\s*\\])?\\s*(\\->)",
                    captures: {
                        1: {
                            name: "variable.other.readwrite.groq",
                        },
                        2: {
                            name: "punctuation.definition.block.js",
                        },
                        3: {
                            name: "keyword.operator.reference.groq",
                        },
                    },
                },
                {
                    match: "(?:([_A-Za-z][_0-9A-Za-z]*)|([@^]))\\s*(\\[\\s*\\])?\\s*(\\.)",
                    captures: {
                        1: {
                            name: "variable.other.readwrite.groq",
                        },
                        2: {
                            name: "constant.language.groq",
                        },
                        3: {
                            name: "punctuation.definition.block.js",
                        },
                        4: {
                            name: "keyword.operator.descendant.groq",
                        },
                    },
                },
                {
                    match: "[_A-Za-z][_0-9A-Za-z]*",
                    name: "variable.other.readwrite.groq",
                },
            ],
        },
        value: {
            patterns: [
                {
                    include: "#constant",
                },
                {
                    include: "#number",
                },
                {
                    include: "#string",
                },
                {
                    include: "#array",
                },
                {
                    include: "#variable",
                },
                {
                    include: "#projection",
                },
                {
                    include: "#comments",
                },
                {
                    include: "#function-call",
                },
            ],
        },
    },
    // The types don't match but it does work
    // so the types are probably wrong. This
    // is an unpleasant workaround for type errors
};
