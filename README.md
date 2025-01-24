# Lisk Docs

This repository contains the Lisk documentation, accessible at <https://docs.lisk.com>.
It tracks and maintains all updates and new content related to the documentation.
The documentation for Lisk is generated using [Docusaurus](https://docusaurus.io/) as the site generator.

## Set up docs locally

1. Clone the `lisk-docs` repository to your computer.

2. Install all the dependencies by executing the following:

    ```
    yarn install
    ```

3. To run a local instance of docs, execute:

    ```
    yarn start
    ```

    This command starts a local development server and opens a browser window at <http://localhost:3000/>.
    Most changes are reflected live without having to restart the server.

## Build & Serve

It is essential to test your `build` & `serve` it locally before submitting it for review.

### Build

To build the docs, execute the following:

```
yarn build
```

This command generates static content into the `build` directory and can be served using any static content hosting service.

### Serve

Docusaurus provides a [serve](https://docusaurus.io/docs/cli#docusaurus-serve-sitedir) command to deploy your built files locally:

```
yarn serve
```

By default, this will load your site at <http://localhost:3000/>.
You'll have to build and serve again if any changes are made.

## Contributors

Would you like to contribute?
Please see which situation fits you best.

- [When should you create an issue?](https://opensource.guide/how-to-contribute/#opening-an-issue)
- [How do you create a pull request?](https://opensource.guide/how-to-contribute/#opening-a-pull-request)

Check out [our contributors](https://github.com/LiskHQ/lisk-documentation/graphs/contributors).

## License

Copyright 2016-2025 Onchain Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
