---
permalink: websites
category: Shipping projects
---

# Shipping Websites

As we're getting close to release a new website, there's a whole bunch of
requirements we need to meet to ensure the process goes smoothly. This 
documentation is designed to serve as a sort of checklist to meet for 
shipping!

## Asset Guidelines & Populating Content

It's impossible to launch a website until your client has prepared their
content. When your CMS is starting to mature, and you have a good idea of 
the required assets sizes & aspect ratios, you'll want to provide your
client with an Asset Guidelines document.

Around 30% of the way through your project, ask your project manager 
to set up an Asset Guidlines google doc, and work with them to pick 
through the designs, and identify all of the asset buckets. Hand this
over to your client, and give them a hard deadline for when it's due.
This deadline is different for every project: if there's a lot of content,
I'd suggest telling them it should be done 60% point.

## Operator Manuals & Populating Content

Hopefully, by this point your client has been preparing their content
based on your Content Guidelines, and the CMS structure is mostly set.

At this point, (around ~60% of the way through the project) you'll want
to ask you project manager to setup an Operator Manual for the project.
You should work through the document to prepare a guide that your client
can use to enter all of their content into their CMS, and understand all
of the kinks that come along with wiring their site up.

I like to use these documents to record the login credentials to any
backend services they may need, and link out to the Asset Guidelines
document too.

It's important that you force your client to do content population
themselves. Doing it for them means they won't learn how their website
works, and you'll have less time to build great work!

Give them a deadline to have content populated by. I'd suggest by the
~80% point of the deadline. You can expect they'll miss it, so work
with your project manager to apply appropriate pressure to get this
done on time.

## Quality Assurance

Around 80% of the way through the project, we should be ready to start
on visual QA. There's three key phases:

1. Internal QA

Before handing off to the client, you'll ask a senior developer (like 
Hugh!) to QA the project. This person should not have coded on the site, 
and should file a bunch of QA notes in a Github Issue as checkboxes 
& screengrabs. We use this stage to catch low-hanging fruit, and apply
some last minute polish before the client sees their beautiful project!

2. QA Phase 1

Once the internal QA has been merged and deployed to staging, you'll 
be ready to hand the project off to the client. Ask your project manager
to prep a QA sheet, and send through the staging link along with that
document.

Give you client a deadline to finish populating the doc. After that deadline, 
your project manager will move those tickets to a seperate part of the QA
document, so you can focus on finishing that phase in peace.

Make sure you're commenting on the document and highlighting issues
as they're finished or kicked back.

3. QA Phase 2

Once you've finished the tickets in Phase 1, you'll deploy and send the 
staging link back to your client for a second round. Rinse and repeat!

Again, be sure to give them a deadline. If they don't meet it, we can't
meet their launch date!

**Hot tip:** While you're waiting for QA Phase 2 notes to be populated,
you should work through the pre-launch checklist.

## Pre-Launch Checklist

Here's a non-exhaustive list of everything you'll want to think about
before launch. Work with your project manager to ensure you're one
step ahead for all of these.

- A11y: Is your website accesible? Have you scanned over it with an 
accessibility tool? Can you navigate it entirely using your keyboard?
- Mailchimp Credentials: Does your project have an email capture? Have
you reached out to your client for login details?
- Cross Device & Browser Testing: You can't expect your client to do this
for you. Have you tried using your project on different browsers, and
devices?
- DNS Access: Have you got access to the client's domain server? You'll
need this to set the thing live, and it often takes the client days to
find these.
- Favicon: Does your website have a cute favicon?
- Analytics: Have you added in an analytics tag? Usually you'll want to
ensure your client generates this property, and gives you access.
- Metatags: Whats your strategy to ensure that Social Share cards are
crawlable on the site? Are you using React Snap? Does the client manage
that content in Contentful? Is it documented in the Operator Manual?
- Bug Tracking: Have you installed Sentry on your project? How will you
know if users encounter bugs?
- Webfont Licenses: Are you legally using your typeefaces? Has your client
purchases licenses?
- Cookie Consent: Does your project use cookies? (If it uses Google
Analytics, it does). You'll want to ensure you have a cookie consent
flag installed.
- 404 Page: What happens when the user navigates to non-existent
URL? Are they redirected, or do they see a nice 404?
- Empty states: Do new users of your project see a lot of empty states
when they start interacting? If so - have you added some messaging 
for those cases?
- Google Lighthouse: Have you profiled your website with Google 
Lighthouse too see where you can improve the initial paint, and therefore
the page ranking?
- SEO & Google Webmaster Tools: Have you registered & optimized your 
project with Google Webmaster Tools? Do you have a crawlable site map?
