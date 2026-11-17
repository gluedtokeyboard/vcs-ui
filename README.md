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

## Demo

### Filesystem Operations

Demonstrates creating files and folders, editing files, and moving, copying, renaming, and deleting them.

[Filesystem-Operations.webm](https://github.com/user-attachments/assets/8746e397-f45f-49d8-95f3-f8774ac05d2f)

### Version Control

#### Repository Basics

Demonstrates repository initialization, staging files for addition and removal, creating commits, and repository status 
and commit log side panels automatically updating on repository changes.

[Repository-Basics.webm](https://github.com/user-attachments/assets/53f083bf-a4a1-4c0e-88bc-dde826de606d)

#### Branch

Demonstrates creating, checking out, and deleting a branch.

[Branch.webm](https://github.com/user-attachments/assets/62c05286-f414-4b6d-80ad-f613ad193b16)

#### Checkout and Reset

Demonstrates checking out files and resetting the repository.

[Checkout-and-Reset.webm](https://github.com/user-attachments/assets/8e01d15c-1ead-424a-8af0-efef6e01e2ff)

#### Copying and Moving Repositories

Demonstrates copying and moving repositories.

[Copying-and-Moving-Repositories.webm](https://github.com/user-attachments/assets/e276a75b-5d50-4773-8f5a-0911ba44158a)

#### Merge

##### Merge without Conflicts

Demonstrates merging two branches without conflicts.

[Merge-without-Conflicts.webm](https://github.com/user-attachments/assets/904d9ac9-7063-46b4-b284-32c982b40af2)

##### Merge with Conflicts

Demonstrates merging two branches with conflicting changes and resolving the resulting conflicts.

[Merge-with-Conflicts.webm](https://github.com/user-attachments/assets/3d2195af-cc99-4a1c-a3be-ae44293072aa)

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
