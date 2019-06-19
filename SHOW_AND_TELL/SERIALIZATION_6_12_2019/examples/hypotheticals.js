// What if a developer working on an endpoint _and_ client A 
// decided to serialize data like this.
// What if it went unchecked until client B wanted to use that endpoint?
data = {
  "parents": {
    1: {
      "foo": "bar",
      "baz": "bazgo",
      "children": {
        1: {
          "key": "value",
          "optionalString": "hi there"
        },
        2: {
          "key": "value",
          "optionalString": null
        }
      }
    }
  }
}
Response.send(data)

// If the org or team lack an established standard for a project, inconsistencies can develop.
// The inconsistencies could result in time waste or worse, technical debt and code rot.
