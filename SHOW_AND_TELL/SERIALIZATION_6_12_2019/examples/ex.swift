struct Parent: Codable {
  var id:Int
  var foo:String
  var baz:String

  var children:[Child]?
}

struct Child: Codable {
  var id:Int
  var key:String
  var optionalString:String?
}

class ApiClient {
  func getParentWithId(_ id: Int, completion: (err: Error, result: Parent?) -> Void) {
    let json = get("/Parents/\(id)") as? data else { completion(Error(), nil) }
    let decoder = JSONDecoder()
    if let parent = try decoder.decode(Parent.self, from: json) {
      completion(parent)
    } else {
      completion(error)
    }
  }
}

func getParents() {
  for id in self.parentIds {
    ApiClient.getParentWithId(id, { err, parent
      // check err or do thing with parent
    })
  }
}
