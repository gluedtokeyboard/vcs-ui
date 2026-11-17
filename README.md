# VCS-UI

## Description

A React + TypeScript frontend for [VCS](https://github.com/gluedtokeyboard/vcs), a version control system built from
scratch in Java.

It provides a file explorer that supports the filesystem and version control operations exposed by the backend.

## Features

### Filesystem Operations

- Create, rename, and delete files and folders.
- Edit files using the built-in file editor.
- Clipboard support for cutting, copying and pasting files and folders.
- Optimistic updates with rollbacks for failed filesystem operations.

### Version Control

- Initialize, copy, and move repositories.
- Automatically resolve the repository associated with the current directory.
- Stage files for addition and removal.
- Create commits.
- View repository status and commit logs through side panels that automatically update on relevant mutations.
- Create, checkout, and delete branches.
- Checkout files from any commit.
- Reset the repository state to any commit.
- Merge branches and resolve conflicts directly in the file editor.

## Running Locally

### Prerequisites

- Node.js
- npm
- A running instance of [VCS](https://github.com/gluedtokeyboard/vcs#api-server)

### Development Server

1. Install the dependencies:

    ```bash
    npm install
    ```

2. Create a `.env.development` in the project root using [.env.example](.env.example) as a reference.
3. Start the development server:

    ```bash
    npm run dev
    ```

## Building

To build the application, run:

   ```bash
   npm run build
   ```

The generated files will be in the `dist/` directory.
