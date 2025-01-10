# TypeScript Only

Date: 2024-01-26

Status: accepted

## Context

Teams and individuals building modern web applications have many great reasons
to build them with [TypeScript][typescript].

One of the challenges with [TypeScript][typescript] is getting it configured properly.
This is not an issue with a stack that starts you off on the right foot without needing
to configure anything.

Another challenge with [TypeScript][typescript] is handling dependencies that are not written in [TypeScript][typescript].
This is increasingly becoming less of an issue with more and more dependencies being written in [TypeScript][typescript].

## Decision

We strongly advise the use of [TypeScript][typescript] even for simple projects and those worked on by single developers.

This project uses and leverages TypeScript in every possible way to have the best developer experience.

## Consequences

This makes the initial experience not great for folks using JavaScript.

This also may anger some folks who really don't like [TypeScript][typescript].
For those folks, we provide also transpiled packages that can be used in a JavaScript environment.

[typescript]: https://www.typescriptlang.org/
