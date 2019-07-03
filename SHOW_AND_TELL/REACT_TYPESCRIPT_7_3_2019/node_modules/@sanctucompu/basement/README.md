<p align="center">
  <img src="basement_logo.svg" width="400"/>
</p>

# Basement
Ground floor CSS utility classes

# How to
Import any settings before the `src/index.scss` file and any default settings will get overwritten:
```
@import
  'overrides',
  'src/index';
```

## Usage with Webpack (or Create React App)

First, install the webpack deps for compiling sass. If you are using Create React App `< v2.0.0` you will be using [react-app-rewired](https://github.com/timarney/react-app-rewired) if you haven't ejected and will require the following packages:

```
yarn add sass-loader node-sass --dev
```

Add the following loader to your webpack config:

```
{
  test: /\.scss$/,
  loaders: [
    require.resolve('style-loader'),
    require.resolve('css-loader'),
    require.resolve('sass-loader'),
  ]
},
```

If you are using Create React App `v2.0.0+` then SCSS modules is natively supported and you will only need to install `node-sass`:

```
yarn add node-sass --dev
```


Then rename your `index.css` file to `index.scss` (and be sure to change any javascript imports to `import 'index.scss';`). Sass should be working nicely, now!

---

Now you can install basement:

```
yarn add '@sanctucompu/basement'
```

And require it in `index.scss` like so:

```
@import '~basement/src/index';
```


## Usage with Ember JS

Be sure that Basement, as well as [Ember CLI Sass](https://github.com/aexmachina/ember-cli-sass), [Sass](https://www.npmjs.com/package/sass), and [Broccoli Funnel](https://github.com/broccolijs/broccoli-funnel) are included in your devDependencies.
```
yarn add -D '@sanctucompu/basement'
yarn add -D sass ember-cli-sass broccoli-funnel
```

Update `ember-cli-build.js`. Using broccoli-funnel enables us to set the destination directory, so that the call to import 'basement/index' works as we'd expect.
```
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        new Funnel('node_modules/@sanctucompu/basement/src', { destDir: 'basement' })
      ]
    }
  });
```

Now you can import basement in your main sass file
```
@import 'basement/index';
```



# Settings

Overwriting these settings is encouraged! To do so, define them in a `.scss` file and import them before Basement.

| variable | description | default |
| --- | --- | --- |
| `$grid-columns` | Amount of columns in the grid. | `12` |
| `$colors` | Color map use for `color-<color>`, `bg-color-<color>`, and `border-color-<color>` classes. | `('black': #000, 'white': #FFF, 'blue': #0A3862);` |
| `$breakpoints` | Media query breakpoints. | `('sm': 640px, 'md': 832px, 'lg': 1024px, 'xl': 1152px)` |
| `$spacing-units` | Spacing units defined here will be available in spacing and padding utility classes at each breakpoint. For example, `.p_25` will set `padding: .25rem;` on the selected element. If you update the list of `$spacing_units` to include `3.125rem`, then `.sm:mt3_125` will affect the top margin of your element only at small screen sizes.  | `0rem, .25rem, .5rem, .75rem, 1rem, 2rem, 3rem, 4rem, 6rem, 8rem;` |
| `$aspect-ratios` | Ratios for `.aspect-<ratio>` utility class. | `('square': (1, 1), 'landscape': (16, 9), 'portrait': (2, 3));`|
| `$dynamic_spacing` | Whether or not each margin and padding class is generated for each breakpoint. | `true` |
| `$decimal_deliminator` | The deliminator used to replace a `.` | `'_'` |
| `$dynamic-grid` | Whether or not each `col-<i>` class is generated for each breakpoint. | `true` |

# Contributing

We want basement to be effective and effecient so we encourage contribution. You can contribute by making a pull request and requesting review from previous contributors or a member of the [Sanctuary Computer](https://github.com/sanctuarycomputer) team.

## Running locally

```bash
# clone the repo
git clone https://github.com/sanctuarycomputer/basement.git

cd basement

# Install dependancies (currently only node-sass)
yarn install
# or
npm install

# Run the watcher
yarn watch
# or the minified watch if you are pointing towards the minified build (dist/basement.min.css)
yarn watch:min

# Build before commiting
yarn build
```
