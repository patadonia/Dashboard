const table = document.getElementById("wrapper");
let lessonsArr = [];
let groupName = "";
const days = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];
let currentDay = 0;

async function getLessons() {
  const answer = await fetch(
    `http://dashboard/api/index.php/?method=getTimeTable&group_id=${localStorage.getItem(
      "group_id"
    )}`
  );
  const result = await answer.json();
  if (result.status) {
    lessonsArr = result.data.lessons;
    groupName = result.data.group_name;
    createTable();
  }
}

function createTable() {
  const columnWrapper1 = fillFirstColumn();
  table.appendChild(columnWrapper1);
  for (let i = 0; i < 6; i++) {
    const columnWrapper = fillColumn(i);
    table.appendChild(columnWrapper);
  }
}

function fillFirstColumn() {
  const colWrapper = document.createElement("article");
  colWrapper.classList.add("column");
  colWrapper.classList.add("smallColumn");

  const firstCell = document.createElement("div");
  firstCell.classList.add("tableCell");
  firstCell.classList.add("smallCell");
  firstCell.classList.add("colorCell");
  firstCell.innerHTML = groupName;
  colWrapper.appendChild(firstCell);

  for (let i = 1; i < 6; i++) {
    const cellWrapper = document.createElement("div");
    cellWrapper.classList.add("tableCell");
    cellWrapper.classList.add("colorCell");
    cellWrapper.innerHTML = `${i} пара`;
    colWrapper.appendChild(cellWrapper);
  }
  return colWrapper;
}

function fillColumn(index) {
  const colWrapper = document.createElement("article");
  colWrapper.classList.add("column");

  const firstCell = document.createElement("div");
  firstCell.classList.add("tableCell");
  firstCell.classList.add("smallCell");
  firstCell.classList.add("colorCell");
  firstCell.innerHTML = days[index];
  colWrapper.appendChild(firstCell);

  const forStart = currentDay ;
  const forStop = currentDay + 5;
  for (let i = forStart; i < forStop; i++) {
    const newCell = document.createElement("div");
    newCell.classList.add("tableCell");
    if (lessonsArr[currentDay].top === 'null') {
      colWrapper.appendChild(newCell);
      currentDay++;
      continue;
    }
    const cellWrapperTop = document.createElement("div");
    const cellWrapperBottom = document.createElement("div");
    cellWrapperTop.classList.add("topCellInfo");
    cellWrapperBottom.classList.add("bottomCellInfo");
    cellWrapperTop.innerHTML = lessonsArr[currentDay].top;
    cellWrapperBottom.innerHTML = lessonsArr[currentDay].down;

    newCell.appendChild(cellWrapperTop);
    newCell.appendChild(cellWrapperBottom);

    colWrapper.appendChild(newCell);
    currentDay++;
  }
  return colWrapper;
}

getLessons();
