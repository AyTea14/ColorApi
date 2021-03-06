## Welcome to ColorAPI!

ColorAPI shows a square image for any hex code provided.

## Supported File Types

-   svg
-   webp
-   png
-   jpeg/jpg

## Using ColorAPI

ColorAPI uses the following URL structure:

```
https://color.aytea.ml/SIZE/HEXCODE.FILETYPE

// SIZE is optional
```

For example:

```
https://color.aytea.ml/fff.webp
https://color.aytea.ml/600x300/fff.webp
```

## How it works

ColorAPI takes the provided hex code and inserts it into SVG code, then if necessary, converts it to an image file using [svg-to-img](https://npmjs.org/package/svg-to-img). ColorAPI is powered by [express](https://expressjs.com).

---

ColorAPI was created by [advaith](https://advaith.fun)
