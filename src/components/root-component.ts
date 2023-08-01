export class RootComponent {
  private _rootElement: HTMLElement;

  //single singleton
  private static instance: RootComponent;
  private constructor(private _rootId: string) {
    this._rootElement = document.getElementById(this._rootId)!;
  }
  static getInstance(rootId: string) {
    if (!RootComponent.instance) {
      RootComponent.instance = new RootComponent(rootId);
    }
    return RootComponent.instance;
  }

  public attach(insertAtBeginning: boolean, element: Element) {
    let location: InsertPosition = insertAtBeginning
      ? "afterbegin"
      : "beforeend";
    this._rootElement.insertAdjacentElement(location, element);
  }
}
