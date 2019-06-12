// Target: Parent, Adapter: RemoteParentAdapter, Adaptee: RemoteApiClient
class RemoteApiClient {
  constructor() {
    this.root = process.env.REMOTE_API_ROOT
  }

  post(route, body) {
    result = doNetwork(`${this.root}/${route}`)
    return result
  }
}

class RemoteParentAdapter {
  constructor(parent) {
    this.remoteApiClient = new RemoteApiClient()
    this.resourceName = "parents"

    this.parent = parent
  }

  _serialize() {
    const o = {
      id: this.parent.id,
      foo: this.parent.foo,
      numberOfChildren: this.parent.children ? this.parent.children.length : 0
    }
    return o
  }

  serializeToJSON() {
    const o = this._serialize
    JSON.stringify(o)
  }

  persist() {
    const json = this.serializeToJSON()
    this.remoteApiClient.post(this.resourceName, json)
  }
}

// Our adapter will also work with subclasses of Parent
class SpecialParent extends Parent {
  constructor(data) {
    super(data)
    this.specialData = data.specialData
  }
}
