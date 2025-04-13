import styled from "styled-components";

export const Dropdown = styled.select<{ isDark: boolean }>`
  background-color: ${({ isDark }) => (isDark ? "#333" : "#f9f9f9")};
  color: ${({ isDark }) => (isDark ? "#fff" : "#000")};
  border: 1px solid ${({ isDark }) => (isDark ? "#555" : "#ccc")};
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  margin-left: 10px;
  cursor: pointer;
`;
