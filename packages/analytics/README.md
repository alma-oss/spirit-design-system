# @alma-oss/spirit-analytics

> Analytic tools for Spirit Design System.

Spirit-analytics is a simple command-line tool, which parses a repository with [react-scanner][react-scanner].
The output is a JSON file or files with collected data.

## Install

```shell
# NPM
npm install --save-dev @alma-oss/spirit-analytics

# Yarn
yarn add -D @alma-oss/spirit-analytics
```

## Usage

Running the command without arguments will use the working directory as a root and parse the entire directory structure from this point.

```shell
spirit-analytics
```

You can parse only specific directories from the project with `--source` argument:

```shell
spirit-analytics --source ./frontend
```

By default, the output will be saved into the `.scanner` directory, but you can specify the path with the `--output` argument:

```shell
spirit-analytics --output path/to/folder
```

The [react-scanner][react-scanner] requires a [config file][react-scanner-config] to make it work, `spirit-analytics` has a default config inside, but if you need, you can use your own config:

```shell
spirit-analytics --config path/to/config
```

You can easily switch from React scanner to Twig scanner using `type` argument. By default, both scanners will be used.

```shell
spirit-analytics --type react
```

You can run `spirit-analytics --help` to get a list of available options and examples.

## Configuration

You can provide your own configuration file in the following format:

```js
export default {
  react: {
    // react-scanner config; @see https://www.npmjs.com/package/react-scanner#config-file
  },
  twig: {
    crawlFrom: './',
    exclude: ['node_modules', 'dist', 'build', 'coverage', 'public', 'vendor', 'storybook-static'],
    configFile: './config/spirit-web-twig.yml',
    outputFile: './.scanner/adoption-data-twig.json',
    coreComponentsPath: './vendor/lmc/spirit-web-twig-bundle/src/Resources/twig-components',
  },
};
```

### Configuration Options

#### React

👉 [`react-scanner` Configuration Options][react-scanner-config-options]

#### Twig

| Option             | Type                  | Description                                                                                                                                                                                                                                                                                                                                                             |
| ------------------ | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| crawlFrom          | `string`              | The path of the directory to start crawling from.                                                                                                                                                                                                                                                                                                                       |
| exclude            | `array` or `function` | Each array item should be a string or a regular expression. When crawling, if directory name matches exactly the string item or matches the regular expression item, it will be excluded from crawling. For more complex scenarios, exclude can be a a function that accepts a directory name and should return true if the directory should be excluded from crawling. |
| configFile         | `string`              | Path to the local `spirit-web-twig.yml` configuration file.                                                                                                                                                                                                                                                                                                             |
| outputFile         | `string`              | Path to the file where the result of the analysis will be stored.                                                                                                                                                                                                                                                                                                       |
| coreComponentsPath | `string`              | Path to the directory where are core Spirit components installed.                                                                                                                                                                                                                                                                                                       |

[react-scanner]: https://github.com/moroshko/react-scanner
[react-scanner-config]: https://github.com/moroshko/react-scanner#config-file
[react-scanner-config-options]: https://www.npmjs.com/package/react-scanner#config-options
