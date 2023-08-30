export abstract class DOMTemplate<T extends HTMLElement> {
  private templateElement: HTMLTemplateElement;
  element: T;
  constructor(public templateId: string) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    const importNode = document.importNode(this.templateElement.content, true);
    this.element = importNode.firstElementChild! as T;
  }
}
