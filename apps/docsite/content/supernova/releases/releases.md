---
title: Releases
sourceUrl: https://spirit.supernova-docs.io/latest/releases/releases-4VBGl5i1
sourcePath: /latest/releases/releases-4VBGl5i1
sourceSection: releases
lastExtractedAt: 2026-04-22T22:32:36.098Z
---

# Release Names

Date: 2024-06-17

Status: accepted

## Context

In our design system, we have been using semantic versioning for individual packages. We have been also talking about the version of the entire design system like we have v1 and v2. In the beginning, this was fine, as the individual packages were mostly updated together and the major versions were the same. But as the entire system evolved, we started to have different versions for different packages. We've found that this can lead to confusion about the state of the entire system, as different packages can be at different versions. To address this, we've decided to introduce a global version of the entire design system, which we're calling a "distribution" or "edition". Each distribution will also have a unique name to make it easier to refer to specific releases.

## Decision

We will continue to use semantic versioning for individual packages. Each package will have its own version number that is updated independently based on the changes in that package.

In addition, we will introduce a global version of the entire design system. This version name will be updated on every major release, regardless of which packages have changed. This will give us a single version name that represents the state of the entire system.

Each distribution of the design system will thus have a unique name. We've chosen a list of names that we will use for future distributions.

List of Distribution Names:

1.  🌟 Aura
2.  🍃 Breeze
3.  ✨ Charm
4.  🌈 Divine
5.  💫 Essence
6.  🔥 Flame
7.  👻 Ghost
8.  😇 Halo
9.  🌞 Illumine
10. 🎉 Jubilee
11. ☯️ Karma
12. 💡 Light
13. 🌌 Mystic
14. ☁️ Nimbus
15. 🔮 Omen
16. ❤️ Pulse
17. 🗺️ Quest
18. 🌠 Radiance
19. 🕊️ Seraph
20. 🌙 Twilight
21. 🤝 Unity
22. 💪 Vigor
23. 🌬️ Whisper
24. 🏝️ Xanadu
25. 💖 Yearn
26. 🌀 Zephyr

## Consequences

This decision will make it easier to understand the state of the entire design system at a glance. Users will be able to refer to a specific distribution by name, which will include specific versions of all packages.

However, this will also require us to maintain and update the global distribution names. We will need to clearly communicate these changes to our users, and update our documentation to explain our new versioning system.

For a better understanding of the release names and used versions, we will stick with the following terminology.

### Terminology

**Version**

A _version_ refers to a specific state of a package in our design system. Each package has its own version number, which we update whenever we make changes to that package.

**Release**

A _release_ refers to the process of publishing a new version of a package or the entire design system. When we make a release, we run tests, build the software, and then publish the new version so that you can use it. We provide release notes with each release that explain what changes were made.

**Distribution/Edition**

A _distribution_ or _edition_ refers to a specific state of the entire design system. Even though each package has its own version, we also provide a distribution name for the whole system. This gives you a way to talk about the state of all packages at a particular point in time.
