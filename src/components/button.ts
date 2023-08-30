import { DOMTemplate } from "./base-component";

export class Button extends DOMTemplate<HTMLButtonElement> {
  private _unFocusClass: string;
  constructor(
    private _className: string,
    public clickHandler: () => void,
    isActive: boolean = false
  ) {
    super("button");
    this._unFocusClass =
      this.element.className = `${this.element.className} ${this._className}`;
    this.element.onclick = this.clickHandler;
    this.setActive(isActive);
  }
  get className() {
    return this._className;
  }
  setActive(isActive: boolean) {
    this.element.className = isActive ? `${this._unFocusClass} slide-in` : "";
  }
}
