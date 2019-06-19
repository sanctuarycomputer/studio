# ADA Compliance, the Web, and You

**Table of Contents**
- [What is **"ADA Compliance"**?](#what-is-ada-compliance)
- [How and why does it apply to the web?](#how-and-why-does-it-apply-to-the-web)
- [What is **"WCAG 2.1"**?](#what-is-wcag-2.1)
- [What's the difference between **Level A**, **AA**, **AAA**?](#whats-the-difference-between-level-a-aa-aaa)
- [How do I ensure ADA compliance on my website?](#how-do-i-ensure-ada-compliance-on-my-website)

## What is **ADA Compliance**?

### Background

via [ADA.gov](https://www.ada.gov):

> The Americans with Disabilities Act (ADA) was signed into law on July 26, 1990, by President George H.W. Bush. The ADA is one of America's most comprehensive pieces of civil rights legislation that prohibits discrimination and guarantees that people with disabilities have the same opportunities as everyone else to participate in the mainstream of American life -- to enjoy employment opportunities, to purchase goods and services, and to participate in State and local government programs and services. Modeled after the Civil Rights Act of 1964, which prohibits discrimination on the basis of race, color, religion, sex, or national origin – and Section 504 of the Rehabilitation Act of 1973 -- the ADA is an "equal opportunity" law for people with disabilities.

### Resolution

- Everything built after 1993 must factor ADA regulations into the design of the structure.
- Criteria for compliance include:
  - General accommodation. Any public accommodation may not screen out or "tend to screen out" any class of individuals with disability.
  - Extended safety requirements. Any additional operations added to accommodate must be done safely.
  - Prohibition of surcharges for operation. You may not impose any additional charges for specialized operations.
- Enforced by the office of the Attorney General


## How and why does it apply to the web?

### Why should web developers and online businesses care?

The ADA doesn't mention websites within its code. However, the Dept. of Justice has acknowledged that it's generally widening their interpretation to include online businesses as part of ADA's Title III – the regulation as it applies to businesses and non-profit service providers.

As the share of goods and services shifts towards the web, online businesses are coming under a new wave of scrutiny.

Legal issues aside, businesses should strive to produce inclusive experiences and create a culture of equality.

### How bad can it really be?

- Five Guys: Sued for $5.4m in 2017
- Dominos Pizza: Ongoing...
- In 2018 there were 2,285 ADA website lawsuits, up 181% from 2017.

## What is **"WCAG 2.1"**?

### Background

> Web Content Accessibility Guidelines (WCAG) 2.1 defines how to make Web content more accessible to people with disabilities. 

### What's the difference between ADA and WCAG 2.1?

- ADA is the broader legislation that applies to all organizations nationwide
- WCAG 2.1 is a recommended implementation of ADA when building websites and defines three levels of compliance: A, AA, AAA

### Examples

> **Success Criterion 1.4.3 Contrast (Minimum) – Level AA:**

>The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following:

> Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;

> Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.

> Text that is part of a logo or brand name has no contrast requirement.

## What's the difference between **Level A**, **AA**, **AAA**?

### Major differences between levels

- **Level A:** Achievable by writing valid HTML and using a "predictable and easy-to-use" page structure to display crucial information.
- **Level AA:** Achievable by altering design and optimizing user interactions for ease-of-understanding and ease-of-use.
- **Level AAA:** Going above and beyond to label content. Design yields to function.

### What am I responsible for as a developer?

Technically, we aren't directly responsible for any of these levels. However, we should play it safe and shoot for one of the first two levels of compliance:

**Level A:** This bare minimum can allow businesses to establish both an attempt to accommodate and the lack of intent to discriminate. Some can argue that Level A is not enough.

**Level AA:** The Dept. of Justice has pointed to the Level AA specifications in WCAG 2.0 as a suitable target for compliance. By including manditory contrast ratios, Level AA is the first level to explicitly cover visibility - a core attribute of the ADA.

## How do I ensure ADA compliance on my website?

### Write valid HTML

Write valid HTML as specified by W3C and catalogued by a number of other services including MDN and WHATWG.

Other benefits include:
- Better SEO
- Allows your webpages to be used as XML documents
- Greater confidence that code works in untested browsers
- Less room for browsers to interpret your code incorrectly
- Faster browser rendering
- Generally more usable experience

### Auditing

#### axe

> Axe-core is a self-contained open source library and testing engine. It doesn’t require any outside server calls, and it can be customized to include custom rules and to integrate with all modern browsers and testing frameworks.

**`jest-axe`**

```js
const { axe, toHaveNoViolations } = require('jest-axe')

expect.extend(toHaveNoViolations)

it('should demonstrate this matcher`s usage', async () => {
  const render = () => '<img src="#"/>'

  // pass anything that outputs html to axe
  const html = render()

  expect(await axe(html)).toHaveNoViolations()
})
```

**`react-axe`**

```js
var React = require('react');
var ReactDOM = require('react-dom');

if (process.env.NODE_ENV !== 'production') {
  var axe = require('react-axe');
  axe(React, ReactDOM, 1000);
}
```

#### Google Lighthouse

> Lighthouse is an open-source, automated tool for improving the quality of web pages. You can run it against any web page, public or requiring authentication. It has audits for performance, accessibility, progressive web apps, and more.

#### Tota11y for Chrome

> Just click the tota11y icon to run tota11y from Khan Academy and visualize how your site performs with assistive technologies.

https://chrome.google.com/webstore/detail/tota11y-for-chrome/nkghaekndgmonifcpfgjmpfjlhnmflhp?hl=en

#### Axe Dev Tools for Firefox

> Automated tool to find Accessibility defects on your web site by using the axe Firefox extension. Drop the axe on your accessibility defects!

https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/

#### MacOS Voiceover

> Every Mac is built with assistive technologies to support people who are blind or have low vision.

https://webaim.org/articles/voiceover/

## Videos: 

- [Voice Control on Mac and iOS (Apple)](https://www.youtube.com/watch?v=aqoXFCCTfm4)
- [Navigating Websites with JAWS](https://www.youtube.com/watch?v=3MUEyYoKwx0)
- [Screen Reader Demo with Marc Sutton](https://www.youtube.com/watch?v=dEbl5jvLKGQ)

## Resources:

- https://www.ada.gov/
- https://www.w3.org/TR/WCAG21/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility
- https://dequeuniversity.com/rules/axe/3.2/
- https://validator.w3.org/
- https://www.apple.com/accessibility/mac/vision/
