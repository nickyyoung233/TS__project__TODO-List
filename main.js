/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const root_component_1 = __webpack_require__(/*! ./components/root-component */ "./src/components/root-component.ts");
const backdrop_1 = __importDefault(__webpack_require__(/*! ./components/backdrop */ "./src/components/backdrop.ts"));
const time_clock_1 = __importDefault(__webpack_require__(/*! ./components/time-clock */ "./src/components/time-clock.ts"));
const todoList_1 = __importDefault(__webpack_require__(/*! ./components/todoList */ "./src/components/todoList.ts"));
const button_1 = __webpack_require__(/*! ./components/button */ "./src/components/button.ts");
const root = root_component_1.RootComponent.getInstance("root");
let toggle = true;
const toggleHandler = () => {
    toggle = !toggle;
    todoList_1.default.triggerTodoType(toggle);
    backdrop_1.default.triggerFuzzy(toggle);
};
const showButton = new button_1.Button("show-button", () => {
    toggleHandler();
    addButton.setActive(true);
    closeButton.setActive(true);
    showButton.setActive(false);
}, true);
const addButton = new button_1.Button("add-button", () => {
    todoList_1.default.addItem();
    toggleHandler();
    showButton.setActive(true);
    addButton.setActive(false);
    closeButton.setActive(false);
});
const closeButton = new button_1.Button("close-button", () => {
    toggleHandler();
    showButton.setActive(true);
    addButton.setActive(false);
    closeButton.setActive(false);
});
root.attach(true, backdrop_1.default.element);
root.attach(true, time_clock_1.default.element);
time_clock_1.default.startTimeChange("localTime", "formatTime");
root.attach(false, todoList_1.default.todoShow.element);
root.attach(false, todoList_1.default.todoAdd.element);
root.attach(false, showButton.element);
root.attach(false, addButton.element);
root.attach(false, closeButton.element);


/***/ }),

/***/ "./src/components/backdrop.ts":
/*!************************************!*\
  !*** ./src/components/backdrop.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_component_1 = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
class BackDrop extends base_component_1.DOMTemplate {
    constructor(img) {
        super("backdrop");
        this.backImg = "";
        this._isFuzzy = true;
        this._cleanClass = "backdrop-clean";
        this._fuzzyClass = "backdrop-fuzzy";
        this._baseClass = this.element.className;
        this.backImg = img;
        this.element.style.backgroundImage = `url(${this.backImg})`;
        this.triggerFuzzy(this._isFuzzy);
    }
    static getInstance(img) {
        if (!BackDrop.instance) {
            BackDrop.instance = new BackDrop(img);
        }
        return BackDrop.instance;
    }
    get class() {
        return this._isFuzzy ? this._fuzzyClass : this._cleanClass;
    }
    triggerFuzzy(isFuzzy) {
        this._isFuzzy = isFuzzy;
        this.setElementClass();
        return this.class;
    }
    setElementClass() {
        this.element.className = `${this._baseClass} ${this.class}`;
    }
}
const imgLocation = "../../assets/images/background.jpg";
const backDropInstance = BackDrop.getInstance(imgLocation);
exports["default"] = backDropInstance;


/***/ }),

/***/ "./src/components/base-component.ts":
/*!******************************************!*\
  !*** ./src/components/base-component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DOMTemplate = void 0;
class DOMTemplate {
    constructor(templateId) {
        this.templateId = templateId;
        this.templateElement = document.getElementById(templateId);
        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
    }
}
exports.DOMTemplate = DOMTemplate;


/***/ }),

/***/ "./src/components/button.ts":
/*!**********************************!*\
  !*** ./src/components/button.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Button = void 0;
const base_component_1 = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
class Button extends base_component_1.DOMTemplate {
    constructor(_className, clickHandler, isActive = false) {
        super("button");
        this._className = _className;
        this.clickHandler = clickHandler;
        this._unFocusClass =
            this.element.className = `${this.element.className} ${this._className}`;
        this.element.onclick = this.clickHandler;
        this.setActive(isActive);
    }
    get className() {
        return this._className;
    }
    setActive(isActive) {
        this.element.className = isActive ? `${this._unFocusClass} slide-in` : "";
    }
}
exports.Button = Button;


/***/ }),

/***/ "./src/components/root-component.ts":
/*!******************************************!*\
  !*** ./src/components/root-component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RootComponent = void 0;
class RootComponent {
    constructor(_rootId) {
        this._rootId = _rootId;
        this._rootElement = document.getElementById(this._rootId);
    }
    static getInstance(rootId) {
        if (!RootComponent.instance) {
            RootComponent.instance = new RootComponent(rootId);
        }
        return RootComponent.instance;
    }
    attach(insertAtBeginning, element) {
        let location = insertAtBeginning
            ? "afterbegin"
            : "beforeend";
        this._rootElement.insertAdjacentElement(location, element);
    }
}
exports.RootComponent = RootComponent;


/***/ }),

/***/ "./src/components/time-clock.ts":
/*!**************************************!*\
  !*** ./src/components/time-clock.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_component_1 = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
class TimeClock extends base_component_1.DOMTemplate {
    constructor() {
        super("timer");
        this.time = null;
        this.timeDOM = null;
        this.timeFormatDOM = null;
    }
    static getInstance() {
        if (!TimeClock.instance) {
            TimeClock.instance = new TimeClock();
        }
        return TimeClock.instance;
    }
    startTimeChange(id, id2) {
        this.time = new Date();
        const localTime = this.setTimeFormat(this.time, false);
        const localTimeFormat = this.setTimeFormat(this.time, true);
        this.timeDOM = document.getElementById(id);
        this.timeFormatDOM = document.getElementById(id2);
        this.timeDOM.innerHTML = localTime;
        this.timeFormatDOM.innerHTML = localTimeFormat;
        this.timer = setInterval(() => {
            const tempTime = new Date();
            const localTime = this.setTimeFormat(tempTime, false);
            if (localTime !== this.setTimeFormat(this.time, false)) {
                this.timeDOM.innerHTML = localTime;
            }
            this.time = tempTime;
        }, 1000);
    }
    setTimeFormat(time, isMonth) {
        if (isMonth) {
            return `${time.toLocaleString("zh-CN", {
                weekday: "long",
            })}, ${time.toLocaleString("zh-CN", {
                month: "long",
                day: "numeric",
            })}`;
        }
        else {
            return time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
        }
    }
}
const timeClock = TimeClock.getInstance();
exports["default"] = timeClock;


/***/ }),

/***/ "./src/components/todoList.ts":
/*!************************************!*\
  !*** ./src/components/todoList.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_component_1 = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
class TodoCommon extends base_component_1.DOMTemplate {
    constructor(id) {
        super(id);
    }
}
class TodoList {
    get list() {
        return this._list;
    }
    get todoShow() {
        return this._todoShow;
    }
    get todoAdd() {
        return this._todoAdd;
    }
    constructor() {
        this._list = [];
        this._todoShow = new TodoCommon("todoListShow");
        this._todoAdd = new TodoCommon("todoListAdd");
        this.triggerTodoType(true);
    }
    static getInstance() {
        if (!TodoList.instance) {
            TodoList.instance = new TodoList();
        }
        return TodoList.instance;
    }
    triggerTodoType(isShow) {
        if (isShow) {
            this._todoShow.element.className = "to-do-list-show push-active";
            this._todoAdd.element.className = "to-do-list-add pull-leave";
        }
        else {
            this._todoShow.element.className = "to-do-list-show push-leave";
            this._todoAdd.element.className = "to-do-list-add pull-active";
        }
    }
    addItem() {
        const input = this._todoAdd.element.querySelector("#todoItem");
        if (this._list.length === 5) {
            alert("别太贪心，完成以后再添加吧！");
            return;
        }
        else if (input.value.trim() === "") {
            return;
        }
        else {
            this._list.push({
                isDone: false,
                text: input.value,
            });
            this.renderList();
        }
        input.value = "";
    }
    removeItem(index) {
        const li = document.querySelector(`#list_${index}`);
        li.className = "done";
        let timer = setTimeout(() => {
            clearTimeout(timer);
            this._list.splice(index, 1);
            this.renderList();
        }, 1000);
    }
    renderList() {
        const input = this._todoShow.element.querySelector("ul");
        input.innerHTML = "";
        this._list.forEach((item, index) => {
            const li = document.createElement("li");
            li.id = `list_${index}`;
            li.innerHTML = `<span></span><a>${item.text}</a>`;
            li.onclick = this.removeItem.bind(this, index);
            !item.isDone ? input.appendChild(li) : "";
        });
    }
}
const todoList = TodoList.getInstance();
exports["default"] = todoList;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RzX19wcm9qZWN0X190b2RvLWxpc3QvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL3RzX19wcm9qZWN0X190b2RvLWxpc3QvLi9zcmMvY29tcG9uZW50cy9iYWNrZHJvcC50cyIsIndlYnBhY2s6Ly90c19fcHJvamVjdF9fdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvYmFzZS1jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vdHNfX3Byb2plY3RfX3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL2J1dHRvbi50cyIsIndlYnBhY2s6Ly90c19fcHJvamVjdF9fdG9kby1saXN0Ly4vc3JjL2NvbXBvbmVudHMvcm9vdC1jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vdHNfX3Byb2plY3RfX3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3RpbWUtY2xvY2sudHMiLCJ3ZWJwYWNrOi8vdHNfX3Byb2plY3RfX3RvZG8tbGlzdC8uL3NyYy9jb21wb25lbnRzL3RvZG9MaXN0LnRzIiwid2VicGFjazovL3RzX19wcm9qZWN0X190b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdHNfX3Byb2plY3RfX3RvZG8tbGlzdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RzX19wcm9qZWN0X190b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RzX19wcm9qZWN0X190b2RvLWxpc3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvb3RDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL3Jvb3QtY29tcG9uZW50XCI7XG5pbXBvcnQgYmFja0Ryb3AgZnJvbSBcIi4vY29tcG9uZW50cy9iYWNrZHJvcFwiO1xuaW1wb3J0IHRpbWVDbG9jayBmcm9tIFwiLi9jb21wb25lbnRzL3RpbWUtY2xvY2tcIjtcbmltcG9ydCB0b2RvTGlzdCBmcm9tIFwiLi9jb21wb25lbnRzL3RvZG9MaXN0XCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiLi9jb21wb25lbnRzL2J1dHRvblwiO1xuXG5jb25zdCByb290ID0gUm9vdENvbXBvbmVudC5nZXRJbnN0YW5jZShcInJvb3RcIik7XG5sZXQgdG9nZ2xlID0gdHJ1ZTtcbmNvbnN0IHRvZ2dsZUhhbmRsZXIgPSAoKSA9PiB7XG4gIHRvZ2dsZSA9ICF0b2dnbGU7XG4gIHRvZG9MaXN0LnRyaWdnZXJUb2RvVHlwZSh0b2dnbGUpOyAvL+WIh+aNouS7o+WKnuWKn+iDvVxuICBiYWNrRHJvcC50cmlnZ2VyRnV6enkodG9nZ2xlKTsgLy/liIfmjaLog4zmma/lip/og71cbn07XG5jb25zdCBzaG93QnV0dG9uID0gbmV3IEJ1dHRvbihcbiAgXCJzaG93LWJ1dHRvblwiLFxuICAoKSA9PiB7XG4gICAgdG9nZ2xlSGFuZGxlcigpO1xuICAgIGFkZEJ1dHRvbi5zZXRBY3RpdmUodHJ1ZSk7XG4gICAgY2xvc2VCdXR0b24uc2V0QWN0aXZlKHRydWUpO1xuICAgIHNob3dCdXR0b24uc2V0QWN0aXZlKGZhbHNlKTtcbiAgfSxcbiAgdHJ1ZVxuKTtcbmNvbnN0IGFkZEJ1dHRvbiA9IG5ldyBCdXR0b24oXCJhZGQtYnV0dG9uXCIsICgpID0+IHtcbiAgdG9kb0xpc3QuYWRkSXRlbSgpO1xuICB0b2dnbGVIYW5kbGVyKCk7XG4gIHNob3dCdXR0b24uc2V0QWN0aXZlKHRydWUpO1xuICBhZGRCdXR0b24uc2V0QWN0aXZlKGZhbHNlKTtcbiAgY2xvc2VCdXR0b24uc2V0QWN0aXZlKGZhbHNlKTtcbn0pO1xuY29uc3QgY2xvc2VCdXR0b24gPSBuZXcgQnV0dG9uKFwiY2xvc2UtYnV0dG9uXCIsICgpID0+IHtcbiAgdG9nZ2xlSGFuZGxlcigpO1xuICBzaG93QnV0dG9uLnNldEFjdGl2ZSh0cnVlKTtcbiAgYWRkQnV0dG9uLnNldEFjdGl2ZShmYWxzZSk7XG4gIGNsb3NlQnV0dG9uLnNldEFjdGl2ZShmYWxzZSk7XG59KTtcblxucm9vdC5hdHRhY2godHJ1ZSwgYmFja0Ryb3AuZWxlbWVudCk7XG5yb290LmF0dGFjaCh0cnVlLCB0aW1lQ2xvY2suZWxlbWVudCk7XG50aW1lQ2xvY2suc3RhcnRUaW1lQ2hhbmdlKFwibG9jYWxUaW1lXCIsIFwiZm9ybWF0VGltZVwiKTtcblxucm9vdC5hdHRhY2goZmFsc2UsIHRvZG9MaXN0LnRvZG9TaG93LmVsZW1lbnQpO1xucm9vdC5hdHRhY2goZmFsc2UsIHRvZG9MaXN0LnRvZG9BZGQuZWxlbWVudCk7XG5cbnJvb3QuYXR0YWNoKGZhbHNlLCBzaG93QnV0dG9uLmVsZW1lbnQpO1xucm9vdC5hdHRhY2goZmFsc2UsIGFkZEJ1dHRvbi5lbGVtZW50KTtcbnJvb3QuYXR0YWNoKGZhbHNlLCBjbG9zZUJ1dHRvbi5lbGVtZW50KTtcbiIsImltcG9ydCB7IERPTVRlbXBsYXRlIH0gZnJvbSBcIi4vYmFzZS1jb21wb25lbnRcIjtcblxuY2xhc3MgQmFja0Ryb3AgZXh0ZW5kcyBET01UZW1wbGF0ZTxIVE1MRGl2RWxlbWVudD4ge1xuICAvL3NpbmdsZSBzaW5nbGV0b25cbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEJhY2tEcm9wO1xuICBwcml2YXRlIGJhY2tJbWc6IHN0cmluZyA9IFwiXCI7XG4gIHByaXZhdGUgX2lzRnV6enkgPSB0cnVlO1xuICBwcml2YXRlIF9iYXNlQ2xhc3M6IHN0cmluZztcbiAgcHJpdmF0ZSBfY2xlYW5DbGFzcyA9IFwiYmFja2Ryb3AtY2xlYW5cIjtcbiAgcHJpdmF0ZSBfZnV6enlDbGFzcyA9IFwiYmFja2Ryb3AtZnV6enlcIjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKGltZzogc3RyaW5nKSB7XG4gICAgc3VwZXIoXCJiYWNrZHJvcFwiKTtcbiAgICB0aGlzLl9iYXNlQ2xhc3MgPSB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lO1xuICAgIHRoaXMuYmFja0ltZyA9IGltZztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke3RoaXMuYmFja0ltZ30pYDtcbiAgICB0aGlzLnRyaWdnZXJGdXp6eSh0aGlzLl9pc0Z1enp5KTtcbiAgfVxuICBzdGF0aWMgZ2V0SW5zdGFuY2UoaW1nOiBzdHJpbmcpIHtcbiAgICBpZiAoIUJhY2tEcm9wLmluc3RhbmNlKSB7XG4gICAgICBCYWNrRHJvcC5pbnN0YW5jZSA9IG5ldyBCYWNrRHJvcChpbWcpO1xuICAgIH1cbiAgICByZXR1cm4gQmFja0Ryb3AuaW5zdGFuY2U7XG4gIH1cbiAgZ2V0IGNsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0Z1enp5ID8gdGhpcy5fZnV6enlDbGFzcyA6IHRoaXMuX2NsZWFuQ2xhc3M7XG4gIH1cblxuICB0cmlnZ2VyRnV6enkoaXNGdXp6eTogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzRnV6enkgPSBpc0Z1enp5O1xuICAgIHRoaXMuc2V0RWxlbWVudENsYXNzKCk7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3M7XG4gIH1cbiAgcHJpdmF0ZSBzZXRFbGVtZW50Q2xhc3MoKSB7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9IGAke3RoaXMuX2Jhc2VDbGFzc30gJHt0aGlzLmNsYXNzfWA7XG4gIH1cbn1cblxuY29uc3QgaW1nTG9jYXRpb24gPSBcIi4uLy4uL2Fzc2V0cy9pbWFnZXMvYmFja2dyb3VuZC5qcGdcIjtcbmNvbnN0IGJhY2tEcm9wSW5zdGFuY2UgPSBCYWNrRHJvcC5nZXRJbnN0YW5jZShpbWdMb2NhdGlvbik7XG5leHBvcnQgZGVmYXVsdCBiYWNrRHJvcEluc3RhbmNlO1xuIiwiZXhwb3J0IGFic3RyYWN0IGNsYXNzIERPTVRlbXBsYXRlPFQgZXh0ZW5kcyBIVE1MRWxlbWVudD4ge1xuICBwcml2YXRlIHRlbXBsYXRlRWxlbWVudDogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgZWxlbWVudDogVDtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlSWQ6IHN0cmluZykge1xuICAgIHRoaXMudGVtcGxhdGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICB0ZW1wbGF0ZUlkXG4gICAgKSEgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgICBjb25zdCBpbXBvcnROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLnRlbXBsYXRlRWxlbWVudC5jb250ZW50LCB0cnVlKTtcbiAgICB0aGlzLmVsZW1lbnQgPSBpbXBvcnROb2RlLmZpcnN0RWxlbWVudENoaWxkISBhcyBUO1xuICB9XG59XG4iLCJpbXBvcnQgeyBET01UZW1wbGF0ZSB9IGZyb20gXCIuL2Jhc2UtY29tcG9uZW50XCI7XG5cbmV4cG9ydCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBET01UZW1wbGF0ZTxIVE1MQnV0dG9uRWxlbWVudD4ge1xuICBwcml2YXRlIF91bkZvY3VzQ2xhc3M6IHN0cmluZztcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfY2xhc3NOYW1lOiBzdHJpbmcsXG4gICAgcHVibGljIGNsaWNrSGFuZGxlcjogKCkgPT4gdm9pZCxcbiAgICBpc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIHN1cGVyKFwiYnV0dG9uXCIpO1xuICAgIHRoaXMuX3VuRm9jdXNDbGFzcyA9XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gYCR7dGhpcy5lbGVtZW50LmNsYXNzTmFtZX0gJHt0aGlzLl9jbGFzc05hbWV9YDtcbiAgICB0aGlzLmVsZW1lbnQub25jbGljayA9IHRoaXMuY2xpY2tIYW5kbGVyO1xuICAgIHRoaXMuc2V0QWN0aXZlKGlzQWN0aXZlKTtcbiAgfVxuICBnZXQgY2xhc3NOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9jbGFzc05hbWU7XG4gIH1cbiAgc2V0QWN0aXZlKGlzQWN0aXZlOiBib29sZWFuKSB7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9IGlzQWN0aXZlID8gYCR7dGhpcy5fdW5Gb2N1c0NsYXNzfSBzbGlkZS1pbmAgOiBcIlwiO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgUm9vdENvbXBvbmVudCB7XG4gIHByaXZhdGUgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAvL3NpbmdsZSBzaW5nbGV0b25cbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFJvb3RDb21wb25lbnQ7XG4gIHByaXZhdGUgY29uc3RydWN0b3IocHJpdmF0ZSBfcm9vdElkOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuX3Jvb3RJZCkhO1xuICB9XG4gIHN0YXRpYyBnZXRJbnN0YW5jZShyb290SWQ6IHN0cmluZykge1xuICAgIGlmICghUm9vdENvbXBvbmVudC5pbnN0YW5jZSkge1xuICAgICAgUm9vdENvbXBvbmVudC5pbnN0YW5jZSA9IG5ldyBSb290Q29tcG9uZW50KHJvb3RJZCk7XG4gICAgfVxuICAgIHJldHVybiBSb290Q29tcG9uZW50Lmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIGF0dGFjaChpbnNlcnRBdEJlZ2lubmluZzogYm9vbGVhbiwgZWxlbWVudDogRWxlbWVudCkge1xuICAgIGxldCBsb2NhdGlvbjogSW5zZXJ0UG9zaXRpb24gPSBpbnNlcnRBdEJlZ2lubmluZ1xuICAgICAgPyBcImFmdGVyYmVnaW5cIlxuICAgICAgOiBcImJlZm9yZWVuZFwiO1xuICAgIHRoaXMuX3Jvb3RFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChsb2NhdGlvbiwgZWxlbWVudCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERPTVRlbXBsYXRlIH0gZnJvbSBcIi4vYmFzZS1jb21wb25lbnRcIjtcblxuY2xhc3MgVGltZUNsb2NrIGV4dGVuZHMgRE9NVGVtcGxhdGU8SFRNTERpdkVsZW1lbnQ+IHtcbiAgLy9zaW5nbGUgc2luZ2xldG9uXG4gIHRpbWVyOiBhbnk7XG4gIHRpbWU6IERhdGUgfCBudWxsID0gbnVsbDtcbiAgdGltZURPTTogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgdGltZUZvcm1hdERPTTogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogVGltZUNsb2NrO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJ0aW1lclwiKTtcbiAgfVxuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgaWYgKCFUaW1lQ2xvY2suaW5zdGFuY2UpIHtcbiAgICAgIFRpbWVDbG9jay5pbnN0YW5jZSA9IG5ldyBUaW1lQ2xvY2soKTtcbiAgICB9XG4gICAgcmV0dXJuIFRpbWVDbG9jay5pbnN0YW5jZTtcbiAgfVxuXG4gIHN0YXJ0VGltZUNoYW5nZShpZDogc3RyaW5nLCBpZDI6IHN0cmluZykge1xuICAgIHRoaXMudGltZSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgbG9jYWxUaW1lID0gdGhpcy5zZXRUaW1lRm9ybWF0KHRoaXMudGltZSwgZmFsc2UpO1xuICAgIGNvbnN0IGxvY2FsVGltZUZvcm1hdCA9IHRoaXMuc2V0VGltZUZvcm1hdCh0aGlzLnRpbWUsIHRydWUpO1xuICAgIHRoaXMudGltZURPTSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSE7XG4gICAgdGhpcy50aW1lRm9ybWF0RE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQyKSE7XG4gICAgLy9pbml0XG4gICAgdGhpcy50aW1lRE9NLmlubmVySFRNTCA9IGxvY2FsVGltZTtcbiAgICB0aGlzLnRpbWVGb3JtYXRET00uaW5uZXJIVE1MID0gbG9jYWxUaW1lRm9ybWF0O1xuXG4gICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGNvbnN0IHRlbXBUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgIGNvbnN0IGxvY2FsVGltZSA9IHRoaXMuc2V0VGltZUZvcm1hdCh0ZW1wVGltZSwgZmFsc2UpO1xuXG4gICAgICBpZiAobG9jYWxUaW1lICE9PSB0aGlzLnNldFRpbWVGb3JtYXQodGhpcy50aW1lISwgZmFsc2UpKSB7XG4gICAgICAgIHRoaXMudGltZURPTSEuaW5uZXJIVE1MID0gbG9jYWxUaW1lO1xuICAgICAgfVxuICAgICAgdGhpcy50aW1lID0gdGVtcFRpbWU7XG4gICAgfSwgMTAwMCk7XG4gIH1cbiAgc2V0VGltZUZvcm1hdCh0aW1lOiBEYXRlLCBpc01vbnRoOiBib29sZWFuKSB7XG4gICAgaWYgKGlzTW9udGgpIHtcbiAgICAgIHJldHVybiBgJHt0aW1lLnRvTG9jYWxlU3RyaW5nKFwiemgtQ05cIiwge1xuICAgICAgICB3ZWVrZGF5OiBcImxvbmdcIixcbiAgICAgIH0pfSwgJHt0aW1lLnRvTG9jYWxlU3RyaW5nKFwiemgtQ05cIiwge1xuICAgICAgICBtb250aDogXCJsb25nXCIsXG4gICAgICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgICB9KX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGltZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtcbiAgICAgICAgaG91cjogXCIyLWRpZ2l0XCIsXG4gICAgICAgIG1pbnV0ZTogXCIyLWRpZ2l0XCIsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbmNvbnN0IHRpbWVDbG9jayA9IFRpbWVDbG9jay5nZXRJbnN0YW5jZSgpO1xuZXhwb3J0IGRlZmF1bHQgdGltZUNsb2NrO1xuIiwiaW1wb3J0IHsgRE9NVGVtcGxhdGUgfSBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xuXG5pbnRlcmZhY2UgTGlzdEl0ZW0ge1xuICBpc0RvbmU6IGJvb2xlYW47XG4gIHRleHQ6IHN0cmluZztcbn1cblxuY2xhc3MgVG9kb0NvbW1vbiBleHRlbmRzIERPTVRlbXBsYXRlPEhUTUxEaXZFbGVtZW50PiB7XG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihpZCk7XG4gIH1cbn1cblxuY2xhc3MgVG9kb0xpc3Qge1xuICAvL3NpbmdsZSBzaW5nbGV0b25cbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFRvZG9MaXN0O1xuICBwcml2YXRlIF9saXN0OiBMaXN0SXRlbVtdID0gW107XG4gIGdldCBsaXN0KCkge1xuICAgIHJldHVybiB0aGlzLl9saXN0O1xuICB9XG4gIHByaXZhdGUgX3RvZG9TaG93OiBUb2RvQ29tbW9uO1xuICBnZXQgdG9kb1Nob3coKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvZG9TaG93O1xuICB9XG4gIHByaXZhdGUgX3RvZG9BZGQ6IFRvZG9Db21tb247XG4gIGdldCB0b2RvQWRkKCkge1xuICAgIHJldHVybiB0aGlzLl90b2RvQWRkO1xuICB9XG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fdG9kb1Nob3cgPSBuZXcgVG9kb0NvbW1vbihcInRvZG9MaXN0U2hvd1wiKTtcbiAgICB0aGlzLl90b2RvQWRkID0gbmV3IFRvZG9Db21tb24oXCJ0b2RvTGlzdEFkZFwiKTtcbiAgICB0aGlzLnRyaWdnZXJUb2RvVHlwZSh0cnVlKTtcbiAgfVxuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgaWYgKCFUb2RvTGlzdC5pbnN0YW5jZSkge1xuICAgICAgVG9kb0xpc3QuaW5zdGFuY2UgPSBuZXcgVG9kb0xpc3QoKTtcbiAgICB9XG4gICAgcmV0dXJuIFRvZG9MaXN0Lmluc3RhbmNlO1xuICB9XG5cbiAgdHJpZ2dlclRvZG9UeXBlKGlzU2hvdzogYm9vbGVhbikge1xuICAgIGlmIChpc1Nob3cpIHtcbiAgICAgIHRoaXMuX3RvZG9TaG93LmVsZW1lbnQuY2xhc3NOYW1lID0gXCJ0by1kby1saXN0LXNob3cgcHVzaC1hY3RpdmVcIjtcbiAgICAgIHRoaXMuX3RvZG9BZGQuZWxlbWVudC5jbGFzc05hbWUgPSBcInRvLWRvLWxpc3QtYWRkIHB1bGwtbGVhdmVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdG9kb1Nob3cuZWxlbWVudC5jbGFzc05hbWUgPSBcInRvLWRvLWxpc3Qtc2hvdyBwdXNoLWxlYXZlXCI7XG4gICAgICB0aGlzLl90b2RvQWRkLmVsZW1lbnQuY2xhc3NOYW1lID0gXCJ0by1kby1saXN0LWFkZCBwdWxsLWFjdGl2ZVwiO1xuICAgIH1cbiAgfVxuXG4gIGFkZEl0ZW0oKSB7XG4gICAgY29uc3QgaW5wdXQgPSB0aGlzLl90b2RvQWRkLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiI3RvZG9JdGVtXCJcbiAgICApIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuX2xpc3QubGVuZ3RoID09PSA1KSB7XG4gICAgICBhbGVydChcIuWIq+Wkqui0quW/g++8jOWujOaIkOS7peWQjuWGjea3u+WKoOWQp++8gVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGlucHV0LnZhbHVlLnRyaW0oKSA9PT0gXCJcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saXN0LnB1c2goe1xuICAgICAgICBpc0RvbmU6IGZhbHNlLFxuICAgICAgICB0ZXh0OiBpbnB1dC52YWx1ZSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5yZW5kZXJMaXN0KCk7XG4gICAgfVxuXG4gICAgaW5wdXQudmFsdWUgPSBcIlwiO1xuICB9XG4gIHJlbW92ZUl0ZW0oaW5kZXg6IG51bWJlcikge1xuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2xpc3RfJHtpbmRleH1gKSE7XG4gICAgbGkuY2xhc3NOYW1lID0gXCJkb25lXCI7XG4gICAgbGV0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGhpcy5fbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgdGhpcy5yZW5kZXJMaXN0KCk7XG4gICAgfSwgMTAwMCk7XG4gIH1cbiAgcmVuZGVyTGlzdCgpIHtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuX3RvZG9TaG93LmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpITtcblxuICAgIGlucHV0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGhpcy5fbGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICBsaS5pZCA9IGBsaXN0XyR7aW5kZXh9YDtcbiAgICAgIGxpLmlubmVySFRNTCA9IGA8c3Bhbj48L3NwYW4+PGE+JHtpdGVtLnRleHR9PC9hPmA7XG4gICAgICBsaS5vbmNsaWNrID0gdGhpcy5yZW1vdmVJdGVtLmJpbmQodGhpcywgaW5kZXgpO1xuICAgICAgIWl0ZW0uaXNEb25lID8gaW5wdXQuYXBwZW5kQ2hpbGQobGkpIDogXCJcIjtcbiAgICB9KTtcbiAgfVxufVxuY29uc3QgdG9kb0xpc3QgPSBUb2RvTGlzdC5nZXRJbnN0YW5jZSgpO1xuZXhwb3J0IGRlZmF1bHQgdG9kb0xpc3Q7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9