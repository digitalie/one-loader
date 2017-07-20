[![npm][npm]][npm-url]
[![build][build]][build-url]

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

# One Loader

A webpack loader to enable single-file React components.
Inspired by `vue-loader`.

## Installation

```bash
$ npm i one-loader
```

## Example

In `webpack.config.js`:

```javascript
{
    module: {
        loaders: [
            {
                test: /\.one$/,
                loader: 'one-loader',
                options: {
                    map: {
                        'text/css': 'style-loader!css-loader!',
                        'javascript': 'babel-loader!'
                    }
                }
            }
        ]
    }
}
```

In `ExampleComponent.one`:

```html
<style>
    html {
        background-color: green;
    }

    .basicExample {
        color: white;
    }
</style>

<script>
    export default () => {
        return <div className="basicExample">
            Hello World
        </div>
    }
</script>
```

## Tips

Use `.babelrc` and `postcss.config.js` files to configure respective loaders.

## Roadmap

- [ ] Research: Extract CSS into separate file abilities
- [ ] Tests: Create tests
- [ ] Feature: Scoped styling and CSS Modules
- [ ] Feature: React Native and SSR support via CSS2JS

## License

MIT

[npm]: https://img.shields.io/npm/v/one-loader.svg
[npm-url]: https://npmjs.com/package/one-loader

[build]: https://travis-ci.org/digitalie/one-loader.svg?branch=master
[build-url]: https://travis-ci.org/digitalie/one-loader
