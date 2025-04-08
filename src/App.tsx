import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import "./App.css";

const GlobalStyle = createGlobalStyle<{ isDark: boolean }>`
  body {
    background-color: ${({ isDark }) => (isDark ? "#000" : "#fff")};
    color: ${({ isDark }) => (isDark ? "#fff" : "#000")};
    transition: background-color 0.3s, color 0.3s;
  }

  input {
    background-color: ${({ isDark }) => (isDark ? "#222" : "#fff")};
    color: ${({ isDark }) => (isDark ? "#fff" : "#000")};
    border: 1px solid ${({ isDark }) => (isDark ? "#555" : "#ccc")};
  }

  .underline_box {
    background-color: ${({ isDark }) => (isDark ? "#fff" : "#000")};
    transition: background-color 0.3s;
  }
`;

const Button = styled.button<{ isDark?: boolean }>`
  width: 40px;
  background-color: ${({ isDark }) => (isDark ? "#fff" : "#222")};
  color: ${({ isDark }) => (isDark ? "#000" : "#fff")};
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  margin-left: 5px;

  &.add {
    line-height: 25px;
    height: 25px;
  }

  &.delete {
    width: 40px;
  }

  &.save {
    width: 40px;
  }

  &.move {
    width: 30px;
    padding: 2px;
  }

  &.theme-toggle {
    display: flex;
    justify-self: end;
    width: auto;
    padding: 5px 10px;
    margin-bottom: 10px;
    font-weight: bold;
    margin-right: 100px;
  }

  &.allDelete {
    width: 70px;
    height: 30px;
  }
`;

const Text = styled.span<{ done: boolean }>`
  text-decoration: ${(props) => (props.done ? "line-through" : "none")};
  color: ${(props) => (props.done ? "#aaa" : "inherit")};
  cursor: pointer;
  margin-left: 8px;
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const OrderNumber = styled.span`
  width: 20px;
  font-weight: bold;
`;

function App() {
  const [taskList, setTaskList] = useState<
    { text: string; done: boolean; selected?: boolean }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState<"all" | "done" | "undone">("all");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectMode, setSelectMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() === "") return;
    setTaskList([{ text: inputValue, done: false }, ...taskList]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleDeleteTask = (index: number) => {
    setTaskList(taskList.filter((_, i) => i !== index));
  };

  const handleEditTask = (index: number) => {
    setEditingIndex(index);
    setEditValue(taskList[index].text);
  };

  const handleSaveEdit = (index: number) => {
    const updatedTasks = [...taskList];
    updatedTasks[index].text = editValue;
    setTaskList(updatedTasks);
    setEditingIndex(null);
  };

  const handleToggleDone = (index: number) => {
    const updatedTasks = [...taskList];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTaskList(updatedTasks);
  };

  const moveTask = (from: number, to: number) => {
    if (to < 0 || to >= taskList.length) return;
    const updatedTasks = [...taskList];
    const [movedItem] = updatedTasks.splice(from, 1);
    updatedTasks.splice(to, 0, movedItem);
    setTaskList(updatedTasks);
  };

  const handleFilterChange = (newFilter: "all" | "done" | "undone") => {
    setFilter(newFilter);
  };

  const handleSelectTask = (index: number) => {
    const updatedTasks = [...taskList];
    updatedTasks[index].selected = !updatedTasks[index].selected;
    setTaskList(updatedTasks);
  };

  const handleDeleteSelectedToggle = () => {
    if (!selectMode) {
      setSelectMode(true);
    } else {
      // 선택된 항목 삭제
      setTaskList(taskList.filter((task) => !task.selected));
      setSelectMode(false);
    }
  };

  const handleDeleteAllFiltered = () => {
    if (window.confirm("현재 필터된 작업을 모두 삭제할까요?")) {
      setTaskList(
        taskList.filter((task) => {
          if (filter === "done") return !task.done;
          if (filter === "undone") return task.done;
          return false;
        })
      );
    }
  };

  const filteredTasks = taskList.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "undone") return !task.done;
    return true;
  });

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <>
      <GlobalStyle isDark={isDarkTheme} />

      <h1>TODO!</h1>

      <Button className="theme-toggle" onClick={toggleTheme} isDark={isDarkTheme}>
        테마 변경
      </Button>

      <div className="delete-controls" style={{ marginTop: "10px" }}>
        <Button onClick={handleDeleteSelectedToggle} isDark={isDarkTheme} className="allDelete">
          선택 삭제
        </Button>
        <Button
          onClick={() => {
            if (filter === "all") {
              if (window.confirm("전체 작업을 삭제할까요?")) {
                setTaskList([]);
              }
            } else {
              handleDeleteAllFiltered();
            }
          }}
          isDark={isDarkTheme}
          className="allDelete"
        >
          전체 삭제
        </Button>
      </div>

      <div className="input_box">
        <input
          placeholder="할 일을 적어주세요"
          className="input"
          type="text"
          autoFocus
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button className="add" onClick={handleAddTask} isDark={isDarkTheme}>
          추가
        </Button>
      </div>

      <div className="tab">
        <div className={`box ${filter === "all" ? "active" : ""}`}>
          <a href="#" onClick={() => handleFilterChange("all")}>전체</a>
          <div className="underline_box" id="under1"></div>
        </div>
        <div className={`box ${filter === "done" ? "active" : ""}`}>
          <a href="#" onClick={() => handleFilterChange("done")}>완료</a>
          <div className="underline_box" id="under2"></div>
        </div>
        <div className={`box ${filter === "undone" ? "active" : ""}`}>
          <a href="#" onClick={() => handleFilterChange("undone")}>미완료</a>
          <div className="underline_box" id="under3"></div>
        </div>
      </div>

      <div className="task-list">
        {filteredTasks.map((task, index) => (
          <TaskItem key={index}>
            <OrderNumber>{index + 1}.</OrderNumber>

            {selectMode && (
              <input
                type="checkbox"
                className="select"
                checked={task.selected || false}
                onChange={() => handleSelectTask(index)}
              />
            )}

            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveEdit(index);
                    }
                  }}
                  autoFocus
                  className="edit_input"
                />
                <Button onClick={() => handleSaveEdit(index)} className="save" isDark={isDarkTheme}>
                  저장
                </Button>
              </>
            ) : (
              <>
                <Text done={task.done} onDoubleClick={() => handleEditTask(index)}>
                  {task.text}
                </Text>
                <input
                  type="checkbox"
                  className="check"
                  checked={task.done}
                  onChange={() => handleToggleDone(index)}
                />
                <Button onClick={() => moveTask(index, index - 1)} className="move" isDark={isDarkTheme}>
                  ↑
                </Button>
                <Button onClick={() => moveTask(index, index + 1)} className="move" isDark={isDarkTheme}>
                  ↓
                </Button>
                <Button onClick={() => handleDeleteTask(index)} className="delete" isDark={isDarkTheme}>
                  삭제
                </Button>
              </>
            )}
          </TaskItem>
        ))}
      </div>
    </>
  );
}

export default App;
