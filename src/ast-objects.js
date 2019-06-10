export class AstNode {
  constructor(name, status, children) {
    this.name = name;
    this.status = status;
    this.children = children;
    this.type = 'node';
  }
}

export class AstElement {
  constructor(name, status, value) {
    this.name = name;
    this.status = status;
    this.value = value;
    this.type = 'element';
  }
}
