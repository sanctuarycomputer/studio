---
permalink: collab
category: How we work
---

# Collaboration

We're in this thing together. Here's some notes about how we work together!

![](https://shop.sanctuary.computer/assets/coveralls-on-models.gif)
*Code is Blue Collar*

## Agile Development & Git Flow

At Sanctuary, we practice agile development via a branching & merging process called "Git Flow". It works like this:

1. Every feature should be broken into as many Zenhub cards as possible during Sprint Planning, and the week's workflow is placed in the `Todo` column of the project board (`13.5` points per developer)
2. You'll move a card from `Todo` to `In Progress` when you start work on it (you should only have a single card in `In Progress` as a time)
3. Locally, you create a Git Branch to represent that Card (`feature/144-implement-color-picker`)
4. When you finish work, you'll push that branch up, and create a Pull Request into master, and start on the next ticket!

At **11:45am** and **4:30pm** (our PR review slots), you'll then ask your reviewer to review your code - if they have suggestions (good suggestions are the sign of a healthy dev shop), you'll work through those suggestions, and ask for another review when you're done.

Once your reviewer is happy, they will merge the PR, and that Zenhub card can be moved to the `Closed` column! On to the next 😊!

[note]
At Sanctuary, no-one merges their own code. We have a buddy system to make sure that we only commit excellent work to master, and learn a bunch along the way!
[/note]

## The PR Mindset

Lots of commenting and activity on Pull Requests is a sign of a healthy development shop. It's important to note that when someone comments on your PR, it doesn't mean it's bad work! We've all been doing this long enough to know that humans make mistakes, and that PR comments are the best defence we have to human error.

When PR comments come in - welcome them with open arms. They're making the work better, our clients happier, and ultimately building a stronger development team across the board.

## Code Style

Our code style is optimized for two things: Readability and Maintainability. From a high level, this means:

- Opt for verbose variable names over smaller, hard to understand naming
- Compose small classes and components rather than big blocks
- Use well known, stable libraries over custom implementations
- Document unavoidable areas of complexity with comments or a `README.md`

Because our code-style is every evolving, it lives on github, [here](https://github.com/sanctuarycomputer/style).

## Asking for Help

At Sanctuary, struggling through an issue on your own does not make you cool. It's important to know the difference between "something that you can learn by figuring out yourself", and a blocker that halts progress on the project. Spinning your wheels for too long on the latter is hurtful for the project, and can actually have the effect of lowering your confidence when it comes to solving hard problems.

[note]
Asking for help at Sanctuary is considered a wise and proactive thing to do, provided you've tried to work it out yourself first. Programming is hard work, so don't go it alone.
[/note]

## Developers in the firing line

We believe the best products and relationships are built when the creative works directly with the client (rather than through a project/account manager).

This way, the client can communicate their complicated needs firsthand to the person building the solution, and the developer is compelled to find and create the best solution to solve the problem. At Sanctuary, developers are "in the firing line", so to speak.

This has the added benefit of allowing us to run a creative-heavy, management-light workplace, helping everyone to feel like they're in it together, rather than being micro-managed. Of course, there's some parts of the relationship that are best left to the producer, so for that reason, developer's almost always have the support of a non-technical team mate.

It's worth noting however, that, developers are expected to be strong and willing communicators. If a developer is not willing to take the time to help a producer write an email, or explain exactly why something's working, they're doing a bad job. The best projects are always those with the best communication, and that starts with the developer.
