// In order to create an instance of an object in js, 
// we use a variety of clients and custom solutions.
// i.e. redux, orms, etc

class Parent {
  constructor(data) {
    this.id = data.id
    this.foo = data.foo
    this.baz = data.baz
    this._children = data.children
  }

  get children() {
    this.children.map(child => { new Child(child) })
  }

  set children(children) {
    this._children = children
  }
}

class Child {
  constructor(data) {
    this.id = data.id
    this.key = data.key
    this.optionalString = data.optionalString
  }

  get optionalString() {
    this.optionalString ? this.optionalString : undefined
  }
}
