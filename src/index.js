import "./styles.css";

// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// <div>
//   We use the same configuration as Parcel to bundle this sandbox, you can find more
//   info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>
// `;

var currentPlayer = 1;
var timerCount = 0;
var boardCount = 0;

if (document.readyState !== "loading") {
  console.log("ready");
  intialize();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    console.log("waiting before executing");
    intialize();
  });
}

function intialize() {
  updateCurrentPlayer(currentPlayer);
  var table = document.getElementById("board");
  var rows = document.getElementsByTagName("tr");
  var cells = document.getElementsByTagName("td");

  if (table) {
    console.log("table ready");
    table.addEventListener("click", function(f) {
      if (f.target && f.target.nodeName === "TD") {
        if (checkIsEmpty(f)) {
          getCell(cells);
          timer();
          if (currentPlayer === 1) {
            var X = document.createTextNode("X");
            f.target.appendChild(X);
            f.target.setAttribute("class", "color1");
            currentPlayer = 2;
            updateCurrentPlayer(currentPlayer);
          } else {
            var O = document.createTextNode("O");
            f.target.appendChild(O);
            f.target.setAttribute("class", "color2");
            currentPlayer = 1;
            updateCurrentPlayer(currentPlayer);
          }
        }
        if (checkWinConditions(rows) !== 0) {
          alert("Player " + checkWinConditions(rows) + " wins!");
          resetTable(cells);
        }
      }
    });
  } else {
    console.log("Table not ready");
  }
}

function updateCurrentPlayer(currentPlayer) {
  var current = document.getElementById("current");
  if (currentPlayer === 1) {
    current.innerHTML = "current player: 1, playing X";
  } else {
    current.innerHTML = "current player: 2, playing O";
  }
}

function getCell(cells) {
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    cell.onclick = function() {
      var cIndex = this.cellIndex + 1;
      var rowIndex = this.parentNode.rowIndex + 1;
      console.log("row " + rowIndex + " cell " + cIndex);
    };
  }
}

function checkIsEmpty(f) {
  if (f.target.innerHTML !== "") {
    alert("cell already taken");
    return false;
  } else {
    return true;
  }
}

function checkWinConditions(rows) {
  var hori = checkHorizontal(rows);
  var vert = checkVertical(rows);
  var diagDown = checkDiagonalDown(rows);
  var diagUp = checkDiagonalUp(rows);
  if (hori !== 0) {
    return hori;
  } else if (vert !== 0) {
    return vert;
  } else if (diagDown !== 0) {
    return diagDown;
  } else if (diagUp !== 0) {
    return diagUp;
  } else {
    return 0;
  }
}

function checkDiagonalDown(rows) {
  var XCount = 0;
  var Ocount = 0;
  for (var i = 0; i < rows.length; i++) {
    var cell = rows[i].getElementsByTagName("td");
    if (cell[i].innerHTML === "X") {
      XCount += 1;
    } else if (cell[i].innerHTML === "O") {
      Ocount += 1;
    }
    if (XCount === 5 || Ocount === 5) {
      return checkWinner(XCount, Ocount);
    }
  }
  return 0;
}

function checkDiagonalUp(rows) {
  var XCount = 0;
  var Ocount = 0;
  var x = 0;
  for (var i = rows.length - 1; i >= 0; i--) {
    var cell = rows[i].getElementsByTagName("td");
    if (cell[x].innerHTML === "X") {
      XCount += 1;
    } else if (cell[x].innerHTML === "O") {
      Ocount += 1;
    }
    x++;
    if (XCount === 5 || Ocount === 5) {
      return checkWinner(XCount, Ocount);
    }
  }

  return 0;
}

function checkVertical(rows) {
  for (var cellLocation = 0; cellLocation < rows.length; cellLocation++) {
    var XCount = 0;
    var Ocount = 0;
    for (var i = 0; i < rows.length; i++) {
      var cell = rows[i].getElementsByTagName("td");
      if (cell[cellLocation].innerHTML === "X") {
        XCount += 1;
      } else if (cell[cellLocation].innerHTML === "O") {
        Ocount += 1;
      }

      if (XCount === 5 || Ocount === 5) {
        return checkWinner(XCount, Ocount);
      }
    }
  }
  return 0;
}

function checkHorizontal(rows) {
  for (var i = 0; i < rows.length; i++) {
    var cell = rows[i].getElementsByTagName("td");
    var XCount = 0;
    var Ocount = 0;

    for (var j = 0; j < cell.length; j++) {
      if (cell[j].innerHTML === "X") {
        XCount += 1;
      } else if (cell[j].innerHTML === "O") {
        Ocount += 1;
      }
      if (XCount === 5 || Ocount === 5) {
        return checkWinner(XCount, Ocount);
      }
    }
  }
  return 0;
}

function checkWinner(XCount, Ocount) {
  if (XCount === 5) {
    return 1;
  } else if (Ocount === 5) {
    return 2;
  } else {
    return 0;
  }
}

function resetTable(cells) {
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    cell.innerHTML = "";
    cell.setAttribute("class", "td");
  }
}

function timer() {
  timerCount++;
  var i = 0;
  var timeLeft = 10;
  if (i === 0) {
    i = 1;
    var timer = document.getElementById("timer");
    var timeDisplay = document.getElementById("time");
    var id = setInterval(frame, 10);
    var width = 0.1;
    function frame() {
      if (timerCount !== 1) {
        clearInterval(id);
        timerCount--;
      }
      if (width >= 100 || timeLeft <= 0) {
        clearInterval(id);
        timeDisplay.innerHTML = "time ended, changing player";
        timerCount--;
        changePlayer();
        i = 0;
        return 0;
      } else {
        width += 0.1;
        timeLeft -= 0.01;
        timeDisplay.innerHTML = "time left: " + timeLeft.toFixed(1) + "s";
        timer.style.width = width + "%";
      }
    }
  }
}

function changePlayer() {
  if (currentPlayer === 1) {
    currentPlayer = 2;
    updateCurrentPlayer(currentPlayer);
  } else if (currentPlayer === 2) {
    currentPlayer = 1;
    updateCurrentPlayer(currentPlayer);
  }
}

function countBoard() {
  var cells = document.getElementsByTagName("td");
  var count = 0;
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === "X" || cells[i].innerHTML === "O") {
      count++;
    }
  }
  return count;
}
