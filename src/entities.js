class Entity {
  constructor(attrs) {
    Object.assign(this, attrs);
  }
}

export class Article extends Entity {
  static get modelName() {
    return "Article";
  }
}