import { RootComponent } from "./components/root-component";
import { backDropInstance } from "./components/backdrop";

const root = RootComponent.getInstance("root");
root.attach(true, backDropInstance.element);
backDropInstance.triggerFuzzy(false);

console.log(backDropInstance.class);
