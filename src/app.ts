import { RootComponent } from "./components/root-component";
import backDrop from "./components/backdrop";
import timeClock from "./components/time-clock";
import todoList from "./components/todoList";
import { Button } from "./components/button";

const root = RootComponent.getInstance("root");
let toggle = true;
const toggleHandler = () => {
  toggle = !toggle;
  todoList.triggerTodoType(toggle); //切换代办功能
  backDrop.triggerFuzzy(toggle); //切换背景功能
};
const showButton = new Button(
  "show-button",
  () => {
    toggleHandler();
    addButton.setActive(true);
    closeButton.setActive(true);
    showButton.setActive(false);
  },
  true
);
const addButton = new Button("add-button", () => {
  todoList.addItem();
  toggleHandler();
  showButton.setActive(true);
  addButton.setActive(false);
  closeButton.setActive(false);
});
const closeButton = new Button("close-button", () => {
  toggleHandler();
  showButton.setActive(true);
  addButton.setActive(false);
  closeButton.setActive(false);
});

root.attach(true, backDrop.element);
root.attach(true, timeClock.element);
timeClock.startTimeChange("localTime", "formatTime");

root.attach(false, todoList.todoShow.element);
root.attach(false, todoList.todoAdd.element);

root.attach(false, showButton.element);
root.attach(false, addButton.element);
root.attach(false, closeButton.element);
