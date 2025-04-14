import type { Tag } from "./types";

export const tags: Tag[] = [
  {
    id: "html-original",
    name: "html",
    description:
      "The root element of an HTML document. Common children: <head>, <body>.",
    hasChildren: true,
    attributes: [
      {
        name: "lang",
        value: "en",
        placeholder: "en,es,pt",
        regex: /^[a-zA-Z]{2}$/,
      },
      {
        name: "dir",
        value: "ltr",
        placeholder: "ltr,rtl",
        regex: /^(ltr|rtl)$/,
      }
    ],
    children: [],
    possibleChildren: [
      { name: "head", limit: 1 },
      { name: "body", limit: 1 },
    ],
  },
  {
    id: "head-original",
    name: "head",
    description: "Container for metadata, scripts, styles, and title.",
    hasChildren: true,
    attributes: [],
    children: [],
    possibleChildren: [
      { name: "title", limit: 1 },
      { name: "meta", limit: null },
      { name: "link", limit: null },
      { name: "style", limit: null },
      { name: "script", limit: null },
    ],
  },
  {
    id: "body-original",
    name: "body",
    description:
      "Contains the visible page content. Common children: <header>, <main>, <footer>.",
    hasChildren: true,
    attributes: [
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      },
      {
        name: "id",
        value: "",
        placeholder: "unique-id",
        regex: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
      }
    ],
    children: [],
    possibleChildren: [
      { name: "header", limit: 1 },
      { name: "main", limit: 1 },
      { name: "footer", limit: 1 },
      { name: "div", limit: null },
      { name: "p", limit: null },
      { name: "h1", limit: 1 },
      { name: "h2", limit: null },
      { name: "h3", limit: null },
      { name: "ul", limit: null },
      { name: "ol", limit: null },
      { name: "section", limit: null },
      { name: "article", limit: null },
      { name: "nav", limit: 1 },
      { name: "script", limit: null },
    ],
  },
  {
    id: "title-original",
    name: "title",
    description: "Sets the page title shown in the browser tab.",
    hasChildren: false,
    attributes: [],
    children: [],
    possibleChildren: [],
  },
  {
    id: "meta-original",
    name: "meta",
    description: "Defines metadata like charset, description, viewport, etc.",
    hasChildren: false,
    attributes: [
      {
        name: "charset",
        value: "UTF-8",
        placeholder: "UTF-8,ISO-8859-1",
        regex: /^[a-zA-Z0-9-]+$/,
      },
      {
        name: "name",
        value: "",
        placeholder: "viewport,description,keywords",
        regex: /^[a-zA-Z0-9-]+$/,
      }
    ],
    children: [],
    possibleChildren: [],
  },
  {
    id: "link-original",
    name: "link",
    description: "Links external resources like stylesheets or icons.",
    hasChildren: false,
    attributes: [
      {
        name: "rel",
        value: "stylesheet",
        placeholder: "stylesheet,icon,preload",
        regex: /^[a-zA-Z0-9-]+$/,
      },
      {
        name: "href",
        value: "",
        placeholder: "path/to/resource",
        regex: /^.+$/,
      }
    ],
    children: [],
    possibleChildren: [],
  },
  {
    id: "style-original",
    name: "style",
    description: "Contains internal CSS styles.",
    hasChildren: false,
    attributes: [
      {
        name: "type",
        value: "text/css",
        placeholder: "text/css",
        regex: /^text\/css$/,
      },
      {
        name: "media",
        value: "all",
        placeholder: "all,screen,print",
        regex: /^[a-zA-Z0-9,]+$/,
      }
    ],
    children: [],
    possibleChildren: [],
  },
  {
    id: "script-original",
    name: "script",
    description: "Embeds or references JavaScript code.",
    hasChildren: false,
    attributes: [
      {
        name: "type",
        value: "text/javascript",
        placeholder: "text/javascript,module",
        regex: /^[a-zA-Z0-9\/-]+$/,
      },
      {
        name: "src",
        value: "",
        placeholder: "path/to/script",
        regex: /^.+$/,
      }
    ],
    children: [],
    possibleChildren: [],
  },
  {
    id: "header-original",
    name: "header",
    description: "Represents introductory content. Often contains <h1>, <nav>.",
    hasChildren: true,
    attributes: [
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      },
      {
        name: "id",
        value: "",
        placeholder: "unique-id",
        regex: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
      }
    ],
    children: [],
    possibleChildren: [
      { name: "h1", limit: 1 },
      { name: "nav", limit: 1 },
      { name: "div", limit: null },
    ],
  },
  {
    id: "main-original",
    name: "main",
    description: "Represents the primary content of the document.",
    hasChildren: true,
    attributes: [
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      },
      {
        name: "id",
        value: "",
        placeholder: "unique-id",
        regex: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
      }
    ],
    children: [],
    possibleChildren: [
      { name: "section", limit: null },
      { name: "article", limit: null },
      { name: "div", limit: null },
    ],
  },
  {
    id: "footer-original",
    name: "footer",
    description: "Defines a footer for its nearest section or the page.",
    hasChildren: true,
    attributes: [
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      },
      {
        name: "id",
        value: "",
        placeholder: "unique-id",
        regex: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
      }
    ],
    children: [],
    possibleChildren: [
      { name: "p", limit: null },
      { name: "ul", limit: 1 },
      { name: "div", limit: null },
    ],
  },
  {
    id: "div-original",
    name: "div",
    description: "Generic container for grouping content and applying styles.",
    hasChildren: true,
    attributes: [
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      },
      {
        name: "id",
        value: "",
        placeholder: "unique-id",
        regex: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
      }
    ],
    children: [],
    possibleChildren: [
      { name: "p", limit: null },
      { name: "span", limit: null },
      { name: "img", limit: null },
      { name: "ul", limit: null },
      { name: "h2", limit: null },
      { name: "section", limit: null },
    ],
  },
  {
    id: "p-original",
    name: "p",
    description: "Defines a paragraph of text.",
    hasChildren: true,
    attributes: [
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      },
      {
        name: "id",
        value: "",
        placeholder: "unique-id",
        regex: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
      }
    ],
    children: [],
    possibleChildren: [
      { name: "span", limit: null },
      { name: "a", limit: null },
      { name: "strong", limit: null },
      { name: "em", limit: null },
      { name: "br", limit: null },
    ],
  },
  {
    id: "span-original",
    name: "span",
    description: "Inline container for text and inline elements.",
    hasChildren: true,
    attributes: [
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      },
      {
        name: "id",
        value: "",
        placeholder: "unique-id",
        regex: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
      }
    ],
    children: [],
    possibleChildren: [
      { name: "strong", limit: null },
      { name: "em", limit: null },
      { name: "a", limit: null },
    ],
  },
  {
    id: "a-original",
    name: "a",
    description: "Creates a hyperlink to another page or location.",
    hasChildren: true,
    attributes: [
      {
        name: "href",
        value: "",
        placeholder: "https://example.com",
        regex: /^.+$/,
      },
      {
        name: "target",
        value: "_self",
        placeholder: "_self,_blank",
        regex: /^(_self|_blank)$/,
      }
    ],
    children: [],
    possibleChildren: [
      { name: "span", limit: null },
      { name: "strong", limit: null },
      { name: "em", limit: null },
    ],
  },
  {
    id: "strong-original",
    name: "strong",
    description: "Indicates strong importance, typically bold.",
    hasChildren: true,
    attributes: [
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      }
    ],
    children: [],
    possibleChildren: [{ name: "em", limit: null }],
  },
  {
    id: "em-original",
    name: "em",
    description: "Emphasizes text, typically italic.",
    hasChildren: true,
    attributes: [
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      }
    ],
    children: [],
    possibleChildren: [],
  },
  {
    id: "ul-original",
    name: "ul",
    description: "Unordered list of items. Children must be <li>.",
    hasChildren: true,
    attributes: [
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      },
      {
        name: "id",
        value: "",
        placeholder: "unique-id",
        regex: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
      }
    ],
    children: [],
    possibleChildren: [{ name: "li", limit: null }],
  },
  {
    id: "ol-original",
    name: "ol",
    description: "Ordered list of items. Children must be <li>.",
    hasChildren: true,
    attributes: [
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      },
      {
        name: "start",
        value: "1",
        placeholder: "1,2,3",
        regex: /^[0-9]+$/,
      }
    ],
    children: [],
    possibleChildren: [{ name: "li", limit: null }],
  },
  {
    id: "li-original",
    name: "li",
    description:
      "List item within <ul> or <ol>. Can contain inline or block elements.",
    hasChildren: true,
    attributes: [
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      },
      {
        name: "value",
        value: "",
        placeholder: "1,2,3",
        regex: /^[0-9]+$/,
      }
    ],
    children: [],
    possibleChildren: [
      { name: "span", limit: null },
      { name: "a", limit: null },
      { name: "p", limit: null },
    ],
  },
  {
    id: "img-original",
    name: "img",
    description: "Embeds an image. Self-closing tag.",
    hasChildren: false,
    attributes: [
      {
        name: "src",
        value: "",
        placeholder: "path/to/image",
        regex: /^.+$/,
      },
      {
        name: "alt",
        value: "",
        placeholder: "Image description",
        regex: /^.+$/,
      }
    ],
    children: [],
    possibleChildren: [],
  },
  {
    id: "br-original",
    name: "br",
    description: "Inserts a line break. Self-closing tag.",
    hasChildren: false,
    attributes: [],
    children: [],
    possibleChildren: [],
  },
  {
    id: "form-original",
    name: "form",
    description: "Container for form controls like input, textarea, button.",
    hasChildren: true,
    attributes: [
      {
        name: "action",
        value: "",
        placeholder: "/submit",
        regex: /^.+$/,
      },
      {
        name: "method",
        value: "get",
        placeholder: "get,post",
        regex: /^(get|post)$/,
      }
    ],
    children: [],
    possibleChildren: [
      { name: "input", limit: null },
      { name: "label", limit: null },
      { name: "textarea", limit: null },
      { name: "button", limit: null },
      { name: "select", limit: null },
      { name: "div", limit: null },
    ],
  },
  {
    id: "input-original",
    name: "input",
    description: "Form input control for user data. Self-closing.",
    hasChildren: false,
    attributes: [
      {
        name: "type",
        value: "text",
        placeholder: "text,password,email",
        regex: /^[a-zA-Z0-9-]+$/,
      },
      {
        name: "name",
        value: "",
        placeholder: "field-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      }
    ],
    children: [],
    possibleChildren: [],
  },
  {
    id: "label-original",
    name: "label",
    description:
      "Defines a label for an <input>. Can contain text or inline elements.",
    hasChildren: true,
    attributes: [
      {
        name: "for",
        value: "",
        placeholder: "input-id",
        regex: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
      },
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      }
    ],
    children: [],
    possibleChildren: [
      { name: "span", limit: null },
      { name: "input", limit: 1 },
    ],
  },
  {
    id: "textarea-original",
    name: "textarea",
    description: "Multiline text input control.",
    hasChildren: false,
    attributes: [
      {
        name: "name",
        value: "",
        placeholder: "field-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      },
      {
        name: "rows",
        value: "4",
        placeholder: "4,5,6",
        regex: /^[0-9]+$/,
      }
    ],
    children: [],
    possibleChildren: [],
  },
  {
    id: "button-original",
    name: "button",
    description: "Clickable button, often used in forms.",
    hasChildren: true,
    attributes: [
      {
        name: "type",
        value: "button",
        placeholder: "button,submit,reset",
        regex: /^(button|submit|reset)$/,
      },
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      }
    ],
    children: [],
    possibleChildren: [{ name: "span", limit: null }],
  },
  {
    id: "select-original",
    name: "select",
    description: "Dropdown list of options.",
    hasChildren: true,
    attributes: [
      {
        name: "name",
        value: "",
        placeholder: "field-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      },
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      }
    ],
    children: [],
    possibleChildren: [{ name: "option", limit: null }],
  },
  {
    id: "option-original",
    name: "option",
    description: "Defines an item in a <select> dropdown.",
    hasChildren: false,
    attributes: [
      {
        name: "value",
        value: "",
        placeholder: "option-value",
        regex: /^.+$/,
      },
      {
        name: "selected",
        value: "",
        placeholder: "selected",
        regex: /^selected$/,
      }
    ],
    children: [],
    possibleChildren: [],
  },
  {
    id: "section-original",
    name: "section",
    description:
      "Thematic grouping of content. Usually contains a heading and related elements.",
    hasChildren: true,
    attributes: [
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      },
      {
        name: "id",
        value: "",
        placeholder: "unique-id",
        regex: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
      }
    ],
    children: [],
    possibleChildren: [
      { name: "h2", limit: 1 },
      { name: "p", limit: null },
      { name: "div", limit: null },
    ],
  },
  {
    id: "article-original",
    name: "article",
    description: "Self-contained composition like a blog post or news article.",
    hasChildren: true,
    attributes: [
      {
        name: "class",
        value: "",
        placeholder: "class-name",
        regex: /^[a-zA-Z0-9_-]+$/,
      },
      {
        name: "id",
        value: "",
        placeholder: "unique-id",
        regex: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
      }
    ],
    children: [],
    possibleChildren: [
      { name: "h2", limit: 1 },
      { name: "p", limit: null },
      { name: "div", limit: null },
    ],
  },
];
