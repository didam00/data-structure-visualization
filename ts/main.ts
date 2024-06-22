type StrucutreMode = "stack" | "queue" | "linkedList";
let strucutreMode: StrucutreMode = "stack";

window.onload = () => {
  setStrcutureMode(strucutreMode);
}

function setStrcutureMode(mode: StrucutreMode) {
  switch (mode) {
    case "stack" : initStackMode(); break;
  }
}