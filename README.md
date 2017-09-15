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
                        'text/css': 'style-loader!css-loader',
                        'javascript': 'babel-loader'
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

More examples are available in [examples](examples) directory.

## Configuration

In the example above we passed `map` object as an option to `one-loader`.
This object it responsible for assigning loaders to code types in your single-file components.

By default `one-loader` will assume that `<style>` tag contains code of type `text/css`
and `<script>` tag contains code of `javascript`. This default values are defined in `options.js` in this repository.

You can easily override or add more types to the map in case.
To assign custom types to `<style>` and `<script>` tags use property `type`:

```html
<style type="text/less">
  .component {
    text-align: center;
  }
</style>
<script type="es6">

</script>
```

In the example above I assigned custom types to these style and script tags.
There are not restrictions on naming, so any string will work, however it is recommended to use descriptive values.
Make sure you map appropriate loaders to these types, otherwise `one-loader` will ignore them.

## Roadmap

- [ ] Live Reloading
- [ ] React Native and SSR support via CSS2JS

## License

MIT

[npm]: https://img.shields.io/npm/v/one-loader.svg
[npm-url]: https://npmjs.com/package/one-loader

[build]: https://travis-ci.org/digitalie/one-loader.svg?branch=master
[build-url]: https://travis-ci.org/digitalie/one-loader
