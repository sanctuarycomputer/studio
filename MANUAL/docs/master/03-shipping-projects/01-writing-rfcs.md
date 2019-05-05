---
permalink: rfcs 
category: Shipping projects
---

# Writing RFCs 

Before we start a project, the first contributor and project lead is tasked with
writing an RFC.  folder.

A Request for Comments (RFC) is a short document made at the beginning of a new project, 
or perhaps before starting a complicated feature. It very briefly outlines how 
things will be executed, so the rest of the team can comment and offer suggestions.

An RFC is a version controlled markdown file that lives in the repo under the `rfcs`
folder. When the RFC draft is complete, it's submitted as a PR that the entire team
is expected to read over and ask questions / provide comments.

## Why?

- As a newer developer, it's normal to need help sometimes. Outlining the project at 
the beginning will help you identify places where you will need to collaborate with 
another developer or do some independent research. It will also help everyone plan.
- As a more experienced developer, a lot of your knowledge sits in the back of your 
mind. Jotting down the overall approach will help you remember to factor in steps 
that you might forget later, or identify areas in the project where your default 
approach could be improved, or where you'd like to try something new.
- The shared document promotes knowledge sharing within the team.
- Ticket estimation will be a breeze (& more accurate!)

## What goes in it?

The format is pretty open and can include whatever topics seem relevant. Here's
some ideas:

- Abstract (what is it about / what will it do / who will use it)
- Tech stack / Frameworks
- Libraries & other  Dependencies
- UI/UX
- Network interactions / API endpoints
- Hosting & Deployment
- Potential Challenges
- Other topics if they apply, like Metrics, Security or Performance considerations  

## Examples: 

- [Roti Delivery Functionality (adding a new feature to a complicated project)](https://github.com/sanctuarycomputer/roti/pull/1246)
- [Light Site (Frontend)](https://github.com/sanctuarycomputer/light-site/blob/20444e6779f0a20c38aebb56edee971131a09f27/rfcs/001_APPROACH.md)
- [Light API Onboarding (backend)](https://github.com/sanctuarycomputer/light-two/blob/0e79d6f8d127cbfca4337ec87a4aec5d98d8ddde/rfcs/LIGHTOS_ONBOARDING.md)

## More Reading:

- https://blog.pragmaticengineer.com/scaling-engineering-teams-via-writing-things-down-rfcs/

