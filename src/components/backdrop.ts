import { DOMTemplate } from "./base-component";

class BackDrop extends DOMTemplate<HTMLDivElement> {
  //single singleton
  private static instance: BackDrop;
  private backImg: string = "";
  private _isFuzzy = true;
  private _baseClass: string;
  private _cleanClass = "backdrop-clean";
  private _fuzzyClass = "backdrop-fuzzy";

  private constructor(img: string) {
    super("backdrop");
    this._baseClass = this.element.className;
    this.backImg = img;
    this.element.style.backgroundImage = `url(${this.backImg})`;
    this.triggerFuzzy(this._isFuzzy);
  }
  static getInstance(img: string) {
    if (!BackDrop.instance) {
      BackDrop.instance = new BackDrop(img);
    }
    return BackDrop.instance;
  }
  get class() {
    return this._isFuzzy ? this._fuzzyClass : this._cleanClass;
  }

  triggerFuzzy(isFuzzy: boolean) {
    this._isFuzzy = isFuzzy;
    this.setElementClass();
    return this.class;
  }
  private setElementClass() {
    this.element.className = `${this._baseClass} ${this.class}`;
  }
}

const imgLocation = "../../assets/images/background.jpg";
const backDropInstance = BackDrop.getInstance(imgLocation);
export default backDropInstance;
