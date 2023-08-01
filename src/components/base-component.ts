export abstract class DOMTemplate {
  private templateElement: HTMLTemplateElement;
  element: HTMLElement;
  constructor(public templateId: string) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    const importNode = document.importNode(this.templateElement.content, true);
    this.element = importNode.firstElementChild! as HTMLElement;
  }
}
