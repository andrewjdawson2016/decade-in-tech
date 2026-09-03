# Reflections on a decade in tech

A simple static blog. No backend, no build step.

## How to update the site

You edit **one file: `content.js`**. Save it, refresh the browser, done.

### The shape of it

```js
window.siteContent = {
  title: "Reflections on a decade in tech",
  subtitle: "…",
  author: "Andrew Dawson",

  sections: [        // ← list of sections
    {
      id: "foundations",   // unique slug (used for the TOC link + URL #anchor)
      title: "Foundations",
      intro: "What this section is about.",
      advice: [            // ← list of advice in this section
        {
          title: "Get good sleep",
          body: [ /* … */ ] // ← the text, as a list of "blocks"
        }
      ]
    }
  ]
};
```

### Add a new piece of advice

Drop another object into a section's `advice` array:

```js
{
  title: "Say no gracefully",
  body: [
    "A short paragraph goes here.",
    "Another paragraph."
  ]
}
```

### Add a new section

Add another object to the `sections` array (copy an existing one and change the
fields). Give it a **unique `id`** — it automatically shows up in the table of
contents.

### Formatting the `body`

`body` is a **list**, and each item is one of:

| You write                | You get           |
| ------------------------ | ----------------- |
| `"Some text"`            | a paragraph       |
| `{ list: ["a", "b"] }`   | • bullet list     |
| `{ ordered: ["a", "b"] }`| 1. numbered list  |

They render top-to-bottom, so you can mix them:

```js
body: [
  "Here's the idea.",
  { list: ["first point", "second point"] },
  "And a closing thought."
]
```

Inside any string you can use light formatting: `**bold**`, `*italic*`,
`` `code` ``, and `[link text](https://example.com)`.

### Rules to avoid breakage

- Keep the **commas** between items and the **quotes** around text.
- Every `id` must be **unique**.
- If the page shows blank or "content.js failed to load," it's almost always a
  missing comma or an unclosed quote/bracket.

## Running locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploying to Vercel

It's a static site, so it just works — no config needed:

```bash
npx vercel --prod
```

Or connect the repo at [vercel.com](https://vercel.com) and it redeploys on every push.

## Files

| File         | Purpose                                          |
| ------------ | ------------------------------------------------ |
| `content.js` | **All the content** — this is the one you edit.  |
| `index.html` | Page shell.                                      |
| `styles.css` | The design. Tweak the CSS variables at the top.  |
| `app.js`     | Renders `content.js` into the page.              |
