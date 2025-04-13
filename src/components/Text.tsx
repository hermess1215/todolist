import styled from "styled-components";

export const Text = styled.span<{ done: boolean }>`
  text-decoration: ${(props) => (props.done ? "line-through" : "none")};
  color: ${(props) => (props.done ? "#aaa" : "inherit")};
  cursor: pointer;
  margin-left: 8px;
`;
