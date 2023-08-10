import { RootComponent } from "./components/root-component";
import backDrop from "./components/backdrop";
import timeClock from "./components/time-clock";

console.log(timeClock);

const root = RootComponent.getInstance("root");
root.attach(true, backDrop.element);
root.attach(true, timeClock.element);
timeClock.startTimeChange("localTime", "format-time");
backDrop.triggerFuzzy(false);
