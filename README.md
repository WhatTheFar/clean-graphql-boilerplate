# Modularized GraphQL Boilerplate with Testing

Fully-feature modularized GraphQL Server boilerplate with production-ready containerized workflow.

## Overview

* Easiest way to run a GraphQL server: Sensible defaults & includes everything you need with minimal setup.
* Practical: Built-in scripts to facilitate common workflows.
* Production-ready: Containerized with nginx and letsencrypt configuration.
* Testability: Including complete testing environment wih modular package.

This project is based on the following lobraries & tools:
* [`graphql-yoga`](https://github.com/prisma/graphql-yoga): Fully-featured GraphQL server framework
* [`graphql-shield`](https://github.com/maticzav/graphql-shield): GraphQL Server permissions as another layer of abstraction!
* [`merge-graphql-schemas`](https://github.com/okgrow/merge-graphql-schemas): A utility library to facilitate merging of modularized GraphQL schemas and resolver objects.
* [`prisma`](https://github.com/prisma/prisma): GraphQL ORM-like* layer  between between your GraphQL API and database
* [`prisma-binding`](https://github.com/prisma/prisma-binding): GraphQL Binding for Prisma services (GraphQL Database)
* [`graphql-playground`](https://github.com/graphcool/graphql-playground): Interactive GraphQL IDE

## Getting started

### Configuration

Create a `.env` file in the root directory of your project. Add
environment-specific variables on new lines in the form of `NAME=VALUE`.

See `.env.example` for example.

### Clean project

To clean the project run following command(s).

```sh
bash scripts/clean-local.sh
```

> **Note:** Recommended for the first run.

### Run the project

1. (Optional) Clean project, follow [Clean Project](#clean-project) topic above. (Recommended if you run for the first time).
2. Run command
   ```sh
   bash scripts/run-local.sh
   ```
3. (Optional) Start [GraphQL Playground](https://github.com/prisma/graphql-playground)
   ```sh
   bash scripts/graphql-playground.sh
   ```
   > **Note:** To use native GraphQL Playground, download it from [Releases](https://github.com/prisma/graphql-playground/releases) or [install via Homebrew](https://github.com/prisma/graphql-playground#installation).

## Testing

### Run the test

1. (Optional) Make sure you have run the project once.
2. (Optional) To clear running docker container, Run command
   ```sh
   bash scripts/clear-container.sh
   ```
3. Run command
    ```sh
    bash scripts/run-test.sh
    # OR
    bash scripts/run-watch-test.sh # To run test in watch mode
    ```

## Build & Deploy

```sh
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build --force-rm
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```
## Contributing

Contributions are **welcome and extremely helpful** 🙌, feel free to make discussions and open a pull request.

This project use angular [commit message guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines), please refer to the guildlines for more information.

License
-

    Copyright 2018 Jakpat Mingmongkolmitr

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.