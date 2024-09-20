import * as sanitizeHtml from "sanitize-html";

const allowedElements = [
  // HTML Elements
  "div",
  "span",
  "style",
  "class",
  "id",

  // MathML Elements
  "math",
  "mi",
  "mn",
  "mo",
  "ms",
  "mtext",
  "mspace",
  "mover",
  "munder",
  "munderover",
  "msup",
  "msub",
  "msubsup",
  "mfrac",
  "mroot",
  "msqrt",
  "mtable",
  "mtr",
  "mtd",
  "mlabeledtr",
  "merror",
  "mpadded",
  "mphantom",
  "mfenced",
  "menclose",
  "semantics",
  "annotation",
  "annotation-xml",

  // SVG Elements
  "svg",
  "g",
  "path",
  "line",
  "circle",
  "rect",
  "polygon",
  "polyline",
  "ellipse",
  "text",
  "tspan",
  "textPath",
  "defs",
  "marker",
  "pattern",
  "clippath",
  "mask",
  "desc",
  "title",
  "use",
  "symbol",
];

const allowedAttributes = [
  // Common Attributes
  "id",
  "class",
  "style",
  "href",
  "x",
  "y",
  "cx",
  "cy",
  "r",
  "rx",
  "ry",
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "transform",
  "width",
  "height",
  "xlink:href",
  "viewBox",
  "xmlns",
  "xmlns:xlink",

  // MathML Specific Attributes
  "mathvariant",
  "mathsize",
  "mathcolor",
  "display",
  "dir",
  "xlink:type",
  "xlink:href",

  // SVG Specific Attributes
  "preserveAspectRatio",
  "marker-start",
  "marker-mid",
  "marker-end",
  "patternUnits",
  "patternContentUnits",
  "patternTransform",
  "maskUnits",
  "maskContentUnits",
  "clipPathUnits",

  // Dataset attributes
  "data-*",
];

export const sanitizationConfig = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(
    ["img"],
    allowedElements
  ),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    "*": allowedAttributes,
  },
  allowedSchemes: ["data"],
};
