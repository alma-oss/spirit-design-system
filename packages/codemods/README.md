# @alma-oss/spirit-codemods

> Codemods for migration to the newer version of the Spirit Design library.

`spirit-codemods` is a **CLI tool** designed to assist you in migrating to the latest version of our Spirit Design System library. This tool efficiently handles the removal of breaking changes and deprecations with simple commands.

For React transformations, it utilizes the [jscodeshift][jscodeshift] library.

## Install

No installation of this package is necessary; you can run it using `npx`.

## Usage

To view the available arguments for this package, use `-h` or `--help` as shown in the example below:

```shell
npx @alma-oss/spirit-codemods -h
```

There are **two mandatory arguments**: `-p`/`--path` and `-t`/`--transformation`.
The former specifies the directory path where you want to execute transforms, while the latter specifies the desired codemod to run.

```shell
npx @alma-oss/spirit-codemods -p ./ -t v2/web-react/<codemod-name>
```

Other optional arguments include:

- `-v`/`--version` - Displays current version
- `-h`/`--help` - Displays this message
- `-e`/`--extensions` - Extensions of the transformed files, default: `ts,tsx,js,jsx`
- `--parser` - Parser to use (babel, ts, tsx, flow), default: `tsx`
- `--ignore` - Ignore files or directories, default: `**/node_modules/**`

For example, this could be the command you will run:

```shell
npx @alma-oss/spirit-codemods -p ./src -t v2/web-react/fileuploader-prop-names -e js,jsx --parser babel
```

## Available Scripts

- [Web-React v2 Codemods](https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/src/transforms/v2/web-react/README.md)
- [Web-React v3 Codemods](https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/src/transforms/v3/web-react/README.md)
- [Web-React v4 Codemods](https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/src/transforms/v4/web-react/README.md)
- [Web-React v5 Codemods](https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/src/transforms/v5/web-react/README.md)

[jscodeshift]: https://github.com/facebook/jscodeshift
