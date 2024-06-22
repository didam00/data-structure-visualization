"use strict";
let strucutreMode = "stack";
window.onload = () => {
    setStrcutureMode(strucutreMode);
};
function setStrcutureMode(mode) {
    switch (mode) {
        case "stack":
            initStackMode();
            break;
    }
}
