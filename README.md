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

## Features

* CSS and JavaScript code co-located in a single `.one` file (extension is configurable)
* Configurable loaders for JavaScript and CSS
* Support for scoped styles through CSS Modules (using `css-loader`)

## Installation

```bash
$ npm i --save-dev one-loader
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

More examples are available in [examples](examples) directory:

* [Simple Counter](examples/01_counter)
* [Redux Todo List with extracted CSS file](examples/02_redux-todos)
* [Redux Todo List with scoped CSS](examples/03_redux-todos-scoped)

## Configuration

The `map` object in `one-loader` options it responsible for assigning loaders to code types in your single-file components.

If no mapping provided `<style>` contents will be processed with `css-loader` and `<script>` contents will remain unchanged.
These default values are defined in `options.js` file.

`type` property can be used to assign custom types to `<style>` and `<script>` tags:

```html
<style type="text/less">
  .component {
    text-align: center;
  }
</style>
<script type="es6">

</script>
```

There are not restrictions on type naming, so any string will work, however it is recommended to use descriptive values.

## License

MIT

[npm]: https://img.shields.io/npm/v/one-loader.svg
[npm-url]: https://npmjs.com/package/one-loader

[build]: https://travis-ci.org/digitalie/one-loader.svg?branch=master
[build-url]: https://travis-ci.org/digitalie/one-loader
