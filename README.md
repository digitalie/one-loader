# ComponentOne

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
