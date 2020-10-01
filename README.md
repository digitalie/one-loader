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

No databases, no programming, no headaches. A simple javascript shopping cart that you can setup in minutes. It's lightweight, fast, simple to use, and completely customizable. All you need to know is basic HTML.

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
                        'text/css': ['style-loader', 'css-loader'],
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

The `map` object in `one-loader` options is responsible for assigning loaders to code types in your single-file components.

If no mapping is provided `<style>` contents will be processed with `css-loader` and `<script>` contents will remain unchanged.
These default values are defined in `options.js` file.

The `type` property can be used to assign custom types to `<style>` and `<script>` tags:

```html
<style type="text/less">
  .component {
    text-align: center;
  }
</style>
<script type="es6">

</script>
```
There are no restrictions on type naming, so any string will work, however descriptive values are recommended.

## Known issues

The internal architecture of the loader requires passing the options object to sub-loaders through a `require` string.
This is currently causing issues when defining `map` object loaders in strings with a `!` separator.
Thus array syntax is recommended for defining mapped loaders.

This will **NOT** work:

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

This will work:

```javascript
{
    module: {
        loaders: [
            {
                test: /\.one$/,
                loader: 'one-loader',
                options: {
                    map: {
                        'text/css': ['style-loader', 'css-loader'],
                        'javascript': 'babel-loader'
                    }
                }
            }
        ]
    }
}
```

## License

MIT

[npm]: https://img.shields.io/npm/v/one-loader.svg
[npm-url]: https://npmjs.com/package/one-loader

[build]: https://travis-ci.org/digitalie/one-loader.svg?branch=master
[build-url]: https://travis-ci.org/digitalie/one-loader
