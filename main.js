// Selecting elements from the HTML
const spreadSheetContainer = document.querySelector("#spreadsheet-container");
const refreshButton = document.querySelector("#refresh-button");

// Constants for spreadsheet dimensions and initialization
const ROWS = 101;
const COLUMNS = 101;
const spreadsheet = []; // The data structure to store spreadsheet cells
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// Cell class to represent individual cells
class Cell {
  constructor(isHeader, disabled, data, row, column, cellID) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.cellID = cellID;
  }
}

// Event handler for the refresh button click
refreshButton.onclick = function (e) {
      checkForFormulas();
};

// Function to check for formulas in cells
function checkForFormulas() {
  for (let i = 0; i < spreadsheet.length; i++) {
    for (let i2 = 0; i2 < spreadsheet[i].length; i2++) {
      const cell = spreadsheet[i][i2];

      if (typeof cell.data === "string") {
        const toInt = parseInt(cell.data);
        const cellElement = document.getElementById(cell.cellID);
        data = cell.data; // Get the cell's data

        if (!isNaN(toInt)) {
          console.log(toInt);
        }
        if (data.includes("=sum")) {
          console.log("SUM");
        }

        // Check for mathematical operations (+, -, *, /)
        if (cell.data.includes("+")) {
          cells = data.split("+");
          cell1 = document.getElementById(cells[0]).value;
          cell2 = document.getElementById(cells[1]).value;
          cell.data = parseInt(cell1) + parseInt(cell2);
          console.log(spreadsheet);
          cellElement.value = cell.data;
        }
        if (data.includes("-")) {
          cells = data.split("-");
          cell1 = document.getElementById(cells[0]).value;
          cell2 = document.getElementById(cells[1]).value;
          cell.data = parseInt(cell1) - parseInt(cell2);
          console.log(spreadsheet);
          cellElement.value = cell.data;
        }

        if (data.includes("*")) {
          cells = data.split("*");
          cell1 = document.getElementById(cells[0]).value;
          cell2 = document.getElementById(cells[1]).value;
          cell.data = parseInt(cell1) * parseInt(cell2);
          console.log(spreadsheet);
          cellElement.value = cell.data;
        }

        if (data.includes("/")) {
            cells = data.split("/");
            cell1 = document.getElementById(cells[0]).value;
            cell2 = document.getElementById(cells[1]).value;
            cell.data = parseInt(cell1) / parseInt(cell2);
            console.log(spreadsheet);
            cellElement.value = cell.data;
          }

          if (data.includes("=sum")) {
            cells = data.split(":");
            cell1 = document.getElementById(cells[0]).value;
            cell2 = document.getElementById(cells[1]).value;
            cell.data = parseInt(cell1) * parseInt(cell2);
            console.log(spreadsheet);
            cellElement.value = cell.data;
          }
      }
    }
  }
}

// Initialize and render the spreadsheet
newSpreadSheet();
renderSpreadSheet();


// Function to create a new spreadsheet data structure
function newSpreadSheet() {
  for (let r = 0; r < ROWS; r++) {
    let spreadsheetRow = [];
    for (let c = 0; c < COLUMNS; c++) {
      isHeader = false;
      disabled = false;
      let cellData = "";

    // Assign cell data based on row and column values
      if (c === 0) {
        isHeader = true;
        disabled = true;
        cellData = r;
      }

        // Calculate cell data for header cells (e.g., column labels)
      if (r === 0) {
        disabled = true;
        isHeader = true;

        c2 = c - 1;

        if (c <= 26) {
          cellData = alphabet[c2];
        } else {
          cellData = alphabet[Math.floor(c2 / 26) - 1] + alphabet[c2 % 26];
        }
      }
      if (c === 0 && r === 0) {
        cellData = "";
      }

      cellID = r + "x" + c;

      const cell = new Cell(isHeader, disabled, cellData, c, r, cellID);
      spreadsheetRow.push(cell);
    }
    spreadsheet.push(spreadsheetRow);
  }
}

// Function to create and configure a cell element
function createCellElement(cell, cellID) {
  const cellElement = document.createElement("input");
  cellElement.className = "cell";
  cellElement.id = cellID;
  cellElement.value = cell.data;
  cellElement.disabled = cell.disabled;

  if (cell.isHeader) {
    cellElement.classList.add("headerCell");
  }

  cellElement.onclick = () => handleCellClick(cell);
  cellElement.onchange = (e) => handleOnChange(e.target.value, cell);
  return cellElement;
}

// Event handler for cell click
function handleCellClick(cell) {
  console.log(cell.cellID);
}

function handleOnChange(data2, cell) {
  cell.data = data2;
}

// Function to render the spreadsheet in the HTML
function renderSpreadSheet() {
  for (let i = 0; i < spreadsheet.length; i++) {
    const rowContainerElement = document.createElement("div");
    rowContainerElement.className = "cell-row";
    for (let i2 = 0; i2 < spreadsheet[i].length; i2++) {
      const cell = spreadsheet[i][i2];

      rowContainerElement.append(createCellElement(cell, cell.cellID));
    }
    spreadSheetContainer.append(rowContainerElement);
  }
  console.log("spreadsheet ", spreadsheet);
}
