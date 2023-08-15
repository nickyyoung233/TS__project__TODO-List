import { RootComponent } from "./components/root-component";
import backDrop from "./components/backdrop";
import timeClock from "./components/time-clock";
import { Button } from "./components/button";

console.log(timeClock);

const root = RootComponent.getInstance("root");
const showButton = new Button("show-button", () => {
  console.log("show");
});
const addButton = new Button("add-button", () => {
  console.log("add");
});
const closeButton = new Button("close-button", () => {
  console.log("close");
});
console.log(showButton, addButton, closeButton);

root.attach(true, backDrop.element);
root.attach(true, timeClock.element);
root.attach(false, showButton.element);
// root.attach(false, addButton.element);
// root.attach(false, closeButton.element);
timeClock.startTimeChange("localTime", "formatTime");

backDrop.triggerFuzzy(false);
