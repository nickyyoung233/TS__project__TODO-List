import { DOMTemplate } from "./base-component";

class TimeClock extends DOMTemplate<HTMLDivElement> {
  //single singleton
  timer: any;
  time: Date | null = null;
  timeDOM: HTMLElement | null = null;
  timeFormatDOM: HTMLElement | null = null;

  private static instance: TimeClock;

  private constructor() {
    super("timer");
  }
  static getInstance() {
    if (!TimeClock.instance) {
      TimeClock.instance = new TimeClock();
    }
    return TimeClock.instance;
  }

  startTimeChange(id: string, id2: string) {
    this.time = new Date();
    const localTime = this.setTimeFormat(this.time, false);
    const localTimeFormat = this.setTimeFormat(this.time, true);
    this.timeDOM = document.getElementById(id)!;
    this.timeFormatDOM = document.getElementById(id2)!;
    //init
    this.timeDOM.innerHTML = localTime;
    this.timeFormatDOM.innerHTML = localTimeFormat;

    this.timer = setInterval(() => {
      const tempTime = new Date();
      const localTime = this.setTimeFormat(tempTime, false);

      if (localTime !== this.setTimeFormat(this.time!, false)) {
        this.timeDOM!.innerHTML = localTime;
      }
      this.time = tempTime;
    }, 1000);
  }
  setTimeFormat(time: Date, isMonth: boolean) {
    if (isMonth) {
      return `${time.toLocaleString("zh-CN", {
        weekday: "long",
      })}, ${time.toLocaleString("zh-CN", {
        month: "long",
        day: "numeric",
      })}`;
    } else {
      return time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }
}
const timeClock = TimeClock.getInstance();
export default timeClock;
