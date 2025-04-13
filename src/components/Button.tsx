import styled from "styled-components";

export const Button = styled.button<{ isDark?: boolean }>`
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
