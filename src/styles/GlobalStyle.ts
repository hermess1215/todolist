import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle<{ isDark: boolean }>`
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
