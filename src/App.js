import classNames from "classnames";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const groupButtonsOperands = {
    firstLine: ["1", "2", "3", "+"],
    secondLine: ["4", "5", "6", "*"],
    thirdLine: ["7", "8", "9", "/"],
    fourthLine: ["AC", "0", ".", "-"],
  };

  // отслеживание клика вне блока div
  window.addEventListener("click", (e) => {
    const target = e.target;
    if (!target.closest(".calc")) {
      setFocusCalc(false);
    }
    if (target.closest(".calc")) {
      setFocusCalc(true);
    }
  });

  //Состояние фокуса
  const [focusCalc, setFocusCalc] = useState(false);
  const [focusButton, setFocusButton] = useState("");

  //Выражение
  const [calcInputValue, setCalcInputValue] = useState("");

  //Координты, местоположения фокуса
  let [coordinates, setCoordinates] = useState({ x: 1, y: 1 });
  const maze = [
    [1, 2, 3, "+"],
    [4, 5, 6, "*"],
    [7, 8, 9, "/"],
    ["AC", 0, ".", "-"],
  ];

  // Расчет следующего хода по оси Y
  function possibleMoveY({ x, y }, e) {
    if (e.key === "ArrowUp") {
      if (maze[y - 1][x] !== undefined) {
        setCoordinates({ ...coordinates, y: y - 1 });
        const toStringCoordinates = String(maze[y - 1][x]);
        setFocusButton(toStringCoordinates);
      }
    } else if (e.key === "ArrowDown") {
      if (maze[y + 1][x] !== undefined) {
        setCoordinates({ ...coordinates, y: y + 1 });
        const toStringCoordinates = String(maze[y + 1][x]);
        setFocusButton(toStringCoordinates);
      }
    }
  }

  // Расчет следующего хода по оси X
  function possibleMoveX({ x, y }, e) {
    if (e.key === "ArrowLeft") {
      if (maze[y][x - 1] !== undefined) {
        setCoordinates({ ...coordinates, x: x - 1 });
        const toStringCoordinates = String(maze[y][x - 1]);
        setFocusButton(toStringCoordinates);
      }
    }
    if (e.key === "ArrowRight") {
      if (maze[y][x + 1] !== undefined) {
        setCoordinates({ ...coordinates, x: x + 1 });
        const toStringCoordinates = String(maze[y][x + 1]);
        setFocusButton(toStringCoordinates);
      }
    }
  }

  // отслеживание клавишь
  if (focusCalc) {
    document.onkeydown = function (event) {
      switch (event.key) {
        case "ArrowLeft":
          possibleMoveX(coordinates, event);
          break;
        case "ArrowUp":
          possibleMoveY(coordinates, event);
          break;
        case "ArrowRight":
          possibleMoveX(coordinates, event);
          break;
        case "ArrowDown":
          possibleMoveY(coordinates, event);
          break;
        case "Enter":
          let prevValueInput = focusButton;
          setCalcInputValue(calcInputValue + prevValueInput);
          break;
        default:
      }
    };
  }

  const [operands, setOperands] = useState("");
  const [operator, setOperator] = useState("");

  useEffect(() => {
    setFocusButton(focusCalc === true ? "5" : "");
  }, [focusCalc]);

  const genButton = (groupButtons) => {
    return groupButtons.map((i) => {
      return (
        <div className={classNames("button", i, { active: focusButton === i })} key={i}>
          <span>{i}</span>
        </div>
      );
    });
  };

  return (
    <div className="wrapper">
      <div
        className="calc"
        style={focusCalc ? { border: "10px dashed orange", cursor: "default" } : { border: "10px solid orange", cursor: "pointer" }}
      >
        <div className="calc-container">
          <div className="calc-container-input">
            <input type="text" defaultValue={calcInputValue} />
            <input type="text" defaultValue={0} />
          </div>
          <div className="calc-container-button">
            <div className="calc-container-button-firstLine">{genButton(groupButtonsOperands.firstLine)}</div>
            <div className="calc-container-button-secondLine">{genButton(groupButtonsOperands.secondLine)}</div>
            <div className="calc-container-button-thirdLine">{genButton(groupButtonsOperands.thirdLine)}</div>
            <div className="calc-container-button-thirdLine">{genButton(groupButtonsOperands.fourthLine)}</div>
          </div>
          <div className="calc-container-info">Что бы начать пользоваться калькулятором кликните по нему</div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(App);
