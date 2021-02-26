# Family Tree

A simple family tree built with [Vue3](https://v3.vuejs.org/) + [Vite](https://vitejs.dev/)

The layout is pure CSS and only the width of a family is calculated by vue.

## Usage

1. clone the repo
2. npm install
3. npm run dev

In the dev mode you can edit the tree by clicking on a person.
You can link a portrait image to the person, but the file has first to be placed in the `/public/portraits` folder.
A person can have up to two partner, the first one can have children. This is due to some layout limitations with pure CSS to arange the tree.
A person can be deleted with the "X" icon at the lower right corner.
Once you're happy with the tree, click the "Save tree to JSON" button on the lower right corner of the screen. then you can replace the `tree.json` in the `/public` folder with this new `tree.json`

Then you can `npm run build` and deploy the dist folder to a server, where the edit functionality is disabled. If not placed on root, add a base tag as the tree.json and the portraits are loaded with absolute urls.

## Contribution

If you want to contribute, by either improving the layout, adding some prettier styles or new functionality, reach out to me on Discord in either Vue Land or Vite Land @Onyx#4805
