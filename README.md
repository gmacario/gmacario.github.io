# gmacario.github.io

![Build and deploy](https://github.com/gmacario/gmacario.github.io/actions/workflows/build-and-deploy.yml/badge.svg)
![Check links](https://github.com/gmacario/gmacario.github.io/actions/workflows/check-links.yml/badge.svg)

Gianpaolo Macario public website on GitHub.com.

Automatically published to <https://gmacario.github.io/>

## How this site was made

The blog is based on the [Next.js](https://nextjs.org/) framework as explained in
<https://css-tricks.com/building-a-blog-with-next-js/>

## Prerequisites

Install Node.js 14.x from <https://nodejs.org/>

To install the dependencies simply run

```sh
npm install
```

## Adding content to the blog

- Blog posts have to be created under the `_posts` folder.
- Other content (like images or files) can be added under the `public` directory

### Referencing content under `public\`

Consider the following directory structure:

```txt
┌  ...
├  /pages
|   ├  /pages/posts
|   ├  /pages/_app.js
|   └  /pages/index.js
|
├  /public
|   ├  ...
|   ├  /public/files/example_file.pdf
|   └  ...
└  ...
```

You would reference the file as:

```html
 <a href='../files/example_file.pdf'>example file</a>
```

Blog posts get compiled to a static website using the commands detailed below.

## Run a development server

To build and test the pages locally, run the npm script

```sh
npm run dev
```

and follow the instructions.

## Run tests on the static build

To build a production version of the static website and run automated tests, run the npm script

```sh
npm run test
```

and follow the instructions.

## Deploy the blog

To create an optimized production build run the following commands:

```sh
npm run build
npm run start
```

## Generate static files

To generate static files under `_static`:

```sh
npm run export
```

---

## Copyright and license

Copyright 2006-2021 [Gianpaolo Macario](https://gmacario.github.io/).

The contents of this repository are subject to the [MIT License](LICENSE),
with the exception of the `_posts` and `_drafts` folders which are licensed as CC BY-SA (Attribution-ShareAlike)
as detailed in <https://creativecommons.org/licenses/>.

<!-- EOF -->
