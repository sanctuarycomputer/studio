# 💰 Rich Websites 💸

_January 22, 2020_

## What's a target audience?

>**tar·get au·di·ence** _noun_
A particular group at which a film, book, advertising campaign, etc., is aimed.

We often talk about user groups, user stories, user flows, journeys, and so on. All of which highlight and promote human interaction. As designers and developers, we tend to focus on user-driven metrics and goals since we believe they make up the entirety of our target. But in doing so, we omit a very important vistor that's critical to our campaign's succes: **the bot**.

### Who is **the bot**?

We've talked about accessibility many times before and those conversations emphasize certain types of bots called _screenreaders_. These little crawlers help map the page, promote informative content, and create a specialized interface for a specific group.

In the same sense, we should hold a similar type of concern for the cousins of screenreaders: _the scrapers_. These crawlers, often deployed by search engines and indexing services, take a hold of the page in a different way but still with the goal of highlighting key information and producing a particular way of observing that information.

### Should we care for the bot?

This isn't your average SEO optimization talk. Page rank is certainly important. Those cute preview cards in our Google results searches are definitely helpful. But they are only primitive examples for how our products can live beyond the domain we deploy to.

Prioritizing our information's availability to the rest of the world promotes a culture of transparency and collaboration. We democratize information when we publicize information. And now more than ever, the purity and promise of information is at stake. As technologists, we're given this specific responsibility to make truths more visible in a noisy and chaotic environment.

There are standards in place to help bots understand the contents of our domain. These standards have been used by Big Tech to advertise and commericialize content. But they have also been used by researchers, teachers, activists, and artists. `EXAMPLES HERE`

### How do we care for the bot?

There are many baseline efforts that can result in a page that bots love. We've talked about them before in our accessibility talks:

- Valid HTML: `alt` attributes for `<img>`, `<button>` never being nested into `<a>`, etc.
- Semantic HTML: `<nav>`, `<article>`, `<section>`, `<header>` are always used and used appropriately

There are a few additional thoughts to consider that typically come up as performance or SEO optimizations:
- Server-side rendering: providing a fully-rendered document on initial response rather than exclusively loading content in after the initial response.
- Caching: keeping static resources readily available, saving time and energy, strengthening the known relationship between the original requested resource and its dependencies

There are several standards we can employ to enrich 🤑 our websites beyond the browser visit:
- Use of search consoles: i.e. Google Search Console and telling Google exactly where to look
- Structured Data: On-page rich HTML elements or JSON structures that follow a specification and highlight key information on the page

## What is Structured Data

> Structured data is a standardized format for providing information about a page and classifying the page content; for example, on a recipe page, what are the ingredients, the cooking time and temperature, the calories, and so on.

<cite>Google Developers: https://developers.google.com/search/docs/guides/intro-structured-data</cite>

There are always going to be a few competing implementations.

### `Schema.org`: http://schema.org/docs/documents.html (Microdata Format)

Without microdata:
```html
<div>
  <img src="dell-30in-lcd.jpg" alt="A Dell UltraSharp monitor" />
  Dell UltraSharp 30" LCD Monitor
  87 out of 100 based on 24 user ratings
  $1250 to $1495 from 8 sellers
  Sellers:
  <a href="save-a-lot-monitors.com/dell-30.html">Save A Lot Monitors - $1250</a>
  <a href="jondoe-gadgets.com/dell-30.html">Jon Doe's Gadgets - $1350</a>
</div>
```

With microdata:

```html
<div itemscope itemtype="http://schema.org/Product">
  <img itemprop="image" src="dell-30in-lcd.jpg" alt="A Dell UltraSharp monitor"/>
  <span itemprop="name">Dell UltraSharp 30" LCD Monitor</span>
  <div
    itemprop="aggregateRating"
    itemscope
    itemtype="http://schema.org/AggregateRating"
  >
    <span itemprop="ratingValue">87</span>
    out of <span itemprop="bestRating">100</span>
    based on <span itemprop="ratingCount">24</span> user ratings
  </div>
  <div itemprop="offers" itemscope itemtype="http://schema.org/AggregateOffer">
    <span itemprop="lowPrice">$1250</span>
    to <span itemprop="highPrice">$1495</span>
    from <span itemprop="offerCount">8</span> sellers
    Sellers:
    <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
        <a itemprop="url" href="save-a-lot-monitors.com/dell-30.html">
        Save A Lot Monitors - $1250</a>
    </div>
    <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
        <a itemprop="url" href="jondoe-gadgets.com/dell-30.html">
        Jon Doe's Gadgets - $1350</a>
    </div>
  </div>
</div>
```

### `JSON-LD.org`: https://json-ld.org/ (Linked Data Format)

```html
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Product",
  "aggregateRating": {
    "@type": "AggregateRating",
    "bestRating": "100",
    "ratingCount": "24",
    "ratingValue": "87"
  },
  "image": "dell-30in-lcd.jpg",
  "name": "Dell UltraSharp 30\" LCD Monitor",
  "offers": {
    "@type": "AggregateOffer",
    "highPrice": "$1495",
    "lowPrice": "$1250",
    "offerCount": "8",
    "offers": [
      {
        "@type": "Offer",
        "url": "save-a-lot-monitors.com/dell-30.html"
      },
      {
        "@type": "Offer",
        "url": "jondoe-gadgets.com/dell-30.html"
      }
    ]
  }
}
</script>
```

## What do we do going forward?

>JSON-LD is the recommended format. Google is in the process of adding JSON-LD support for all markup-powered features. The table below lists the exceptions to this. We recommend using JSON-LD where possible.

<cite>Google Developers: https://developers.google.com/search/docs/guides/intro-structured-data</cite>
