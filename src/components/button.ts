import { DOMTemplate } from "./base-component";

export class Button extends DOMTemplate {
  constructor(private _className: string, public clickHandler: () => void) {
    super("button");
    this.element.className = `${this.element.className} ${this._className}`;
    this.element.onclick = this.clickHandler;
  }
  get className() {
    return this._className;
  }
}
