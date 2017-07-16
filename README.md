# ComponentOne

A webpack loader to enable single-file React components.
Inspired by `vue-loader`.

## Usage

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
                        css: 'style-loader!css-loader!',
                        react: 'babel-loader!'
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

<script lang="react">
    export default () => {
        return <div className="basicExample">
            Hello World
        </div>
    }
</script>
```

## Tips

Use `.babelrc` and `postcss.config.js` files to configure respective loaders.
