// Author: Harrison Wideman
///////////////////
// Serialization //
///////////////////

// In computer science, serialization is the process of translating data structures or
// object state into a format that can be stored (for example, in a file or memory buffer) 
// or transmitted (for example, across a network connection link) 
// and reconstructed later (possibly in a different computer environment).
//
// When the resulting series of bits is reread according to the serialization format, 
// it can be used to create a semantically identical clone of the original object. 

// https://en.wikipedia.org/wiki/Serialization

Goal:
"to transform data into a format more suitable for a specific task"
Examples:
"storage", "transmission", "middlewares/sdk/clients/etc"

// Good development exhibits careful consideration of data structures and their serialization.
//
// Thoughtful serialization and data structuring can be the difference 
// between a clean/maintainable project, and one that is difficult 
// for developers to pick up and make changes to.

///////////////////////////////
// Formats for Serialization //
///////////////////////////////

// https://en.wikipedia.org/wiki/Comparison_of_data-serialization_formats

Json:
  // self-describing, great for representing application data
  "fast to parse", "intuitive", "skeuomorphic", "lightweight"
XML:
  // extensible markup language
  // often used for configuration 
  // good in a more more deliberate and failsafe environment
  "verbose", "slow to parse"

  // https://docs.microsoft.com/en-us/dotnet/standard/serialization/examples-of-xml-serialization
YAML:
  // mostly found as configuration files
  "readable"
  creator: "why the lucky stiff"
Encoding:
  // spec of delimiters and codes that translate to data like video and file streams
  // i.e. bencode(bittorrent), binary, encryption, etc
  "bittorrent", "encryption"
URLParametersAndQueryStrings:
  // Easy to neglect if not following a standard or consistent format
  // "what am I asking of the server?"
  "important"

////////////////////
// Some questions //
////////////////////

// How does my server represent data internally?
// How does my server shape data transmitted externally?
//   What shape does an external API expect?
//   How will different platforms consume our data?

/* ex.js */
/* ex.swift */
/* ex.json */

// As programmers, we know that the same data is often shaped in a 
// variety of ways in order to accomplish different goals. One
// of the many skills we develop as professionals is the methodolody 
// we use to transform and transport data.

/////////////////////
// Adapter Pattern //
/////////////////////

// Adapters can be used used when we want incompatible interfaces to work together.
// They help us maintain a separation of concerns, and keep things simple and maintainable.

/* adapter.js */

///////////////////
// Hypotheticals //
///////////////////

// What sort of issues can arise as our data evolves?

// What if we start making changes to our data shape?
// What if we start making feature-specific endpoints that produce different shapes?

/* hypotheticals.js */

ActionPoints:
  "Maintain a unified front regarding data shape", "Practice consistency"

////////////
// Errors //
////////////

// How will we represent different types of errors?
// How will request errors be formatted by our server?

/* error.js */

ActionPoints:
  "Be consistent", "Use existing conventions if you can", "If you have to make your own error object, dont overcomplicate things!"

//////////////////////////////////////
// Api Standards and Specifications //
//////////////////////////////////////

// JsonApi
// https://jsonapi.org/examples/
//
// JsonApi is a standard built with the intent to provide a framework that can be applied in a 
// wide range of use cases, to reflect server-side data organization while being
// readable, and to be easy to implement.

/* ex_ja.js */

// JsonApi formatting
// https://jsonapi.org/format/

// Javascript JsonApi
// https://github.com/SeyZ/jsonapi-serializer
// Swift JsonApi
// https://github.com/wvteijlingen/spine
