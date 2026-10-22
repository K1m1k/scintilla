# Scintilla

Personal site of **K1m1k (Kim)**: projects, articles and reflections on
artificial intelligence, technology, power and society.

Static site — HTML + CSS + a little JavaScript, no libraries to install.
Terminal aesthetic (black / cyan) with a typed intro and a code-rain background.

## Structure
```
index.html                     single page: home, projects, writing, about, contact
data/content.js                >>> EDIT THIS to change projects, articles and settings
assets/style.css               styles
assets/script.js               intro, background, menu, rendering, contact form
writing/<id>.html              one static page per article   (generated — do not edit)
projects/<id>.html             one static page per project   (generated — do not edit)
writing/article.html           old ?id= links: redirect to the static pages
projects/project.html          old ?id= links: redirect to the static pages
sitemap.xml                    list of pages for search engines (generated)
assets/og-image.png            preview image for social networks
```

## Everything lives in `data/content.js`
Both the articles and the project pages are rendered from this one file. No build
step: edit it, save, reload.

### Articles
Each article has its own page (`writing/<id>.html`, generated). To add one, copy a
block in the `articles` list, give it a unique `id`, and write the text in `body`:
```js
{
  id: "my-article",
  title: "My new article",
  date: "Oct 2026",
  read: "5 min read",
  excerpt: "One line shown in the list / featured card.",
  body: [
    "A first paragraph.",
    { h2: "A subheading" },
    "Another paragraph.",
    { ul: ["a bullet", "another bullet"] },
  ],
},
```
Set `featured: true` on the one to highlight at the top. An empty `body: []` shows a
"coming soon" note until you fill it in.

### Projects (clickable)
Each project card on the home page links to its own page
(`projects/<id>.html`, generated). A project block looks like:
```js
{
  id: "my-project",
  name: "My project",
  meta: "What kind of thing it is",
  desc: "Short text shown on the card.",
  tags: ["Tag", "Tag"],
  detail: {
    tagline: "One line shown at the top of the project page.",
    body: [
      { h2: "What it is" },
      "A paragraph.",
      { ul: ["a point", "another point"] },
      { code: "…", caption: "An illustrative snippet — not the real source." },
    ],
  },
},
```
The `{ code: "…" }` block renders a styled snippet. These are meant to be simplified
sketches that explain the idea — the pages intentionally do **not** publish the full
source code or internal structure of the projects.

## Contact form
By default the form sends visitors to GitHub. To receive messages by email,
set your address in `data/content.js`:
```js
contactEmail: "you@example.com",
```
Then the form opens the visitor's email app with the message pre-filled — no
server, no signup, no cost.

## View locally
Double-click `index.html`, or from this folder:
```sh
python3 -m http.server 8000
```
then open `http://localhost:8000`.

## Publish for free (GitHub Pages)
In the repository: **Settings → Pages → Branch: main → folder / (root) → Save**.
After a minute the site is live at the address GitHub shows there.

## Customize
- **Colors:** variables at the top of `assets/style.css` (`--cyan`, `--bg`, …).
- **Intro text:** the `lines` array in `assets/script.js`.
- **About / sections:** `index.html`.

## Static pages, Google and social previews
The static pages in `writing/`, `projects/` and `sitemap.xml` are generated from
`data/content.js` by `genera_pagine.py` (kept outside this repository, next to it in
`../strumenti/`), which runs automatically before every preview and publish. Each page
has its own title, description, canonical URL and social preview, and its text is
already in the HTML, so search engines and link previews can read it.
