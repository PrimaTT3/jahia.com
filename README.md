# Jahia.com is Open Source!

This repository contains the [JavaScript Module](https://academy.jahia.com/tutorials-get-started/front-end-developer/introduction) that powers [**Jahia.com**](https://www.jahia.com). It defines the page templates, content types, views, and UI components used to build and render the public Jahia website.

This module is source-available but not open source. It is licensed under the [Jahia Sustainable Enterprise License (JSEL)](./LICENSE) and cannot be used outside of the official Jahia.com website. However, it is available for learning and reference purposes. We encourage you to explore the code, understand how it works, and use it as inspiration for your own projects.

## Getting Started

To build and run this module locally you will need a working development environment with Node.js, Yarn and Docker installed and configured. Please refer to the [Getting Started](https://github.com/Jahia/javascript-modules/tree/main/docs/1-getting-started/1-dev-environment#pre-requisites) guide if you need help setting up your environment.

Once your environment is ready, use the following commands to start a local Jahia instance and run the module in development mode:

```bash
# Install dependencies
yarn install

# Start Jahia in Docker
docker compose up --wait

# Build the module and start the dev mode
yarn dev
```

Contributions to this repository are not explicitely forbidden, but are very unlikely to be accepted.

## Content Types

The module defines custom content types under the `jahiacom` and `jahiacommix` namespaces. You will find common patterns:

- A blog with authors
- A sectioning component
- Automated OpenGraph metadata generation
- A generated navigation menu based on the content tree

You are free to use these content types as inspiration for your own projects.
