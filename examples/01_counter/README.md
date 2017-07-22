# Example: Counter

A simple counter application to demonstrate basic `one-loader` use case.

The build job relies on default code type identification: `<script>` => `javascript` and `<style>` => `text\css`.
Mapping in `webpack.config.js` file assigns loaders to these types:

```json
{
    'text/css': 'style-loader!css-loader',
    'javascript': 'babel-loader'
}
```
