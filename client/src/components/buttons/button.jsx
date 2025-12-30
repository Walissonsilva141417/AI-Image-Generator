import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: min-content;
  padding: 10px 24px;
  border: none;
  @media (max-width: 600px) {
    padding: 8px 12px;
  }

  ${({ $variant, theme }) =>
    $variant === "secondary"
      ? `
  background: ${theme.secondary};
  `
      : `
  background: ${theme.primary};
`}

  ${({ $disabled }) =>
    $disabled &&
    `
  opacity: 0.4;
  cursor: not-allowed;

  `}
  ${({ $loading }) =>
    $loading &&
    `
    opacity: 0.8;
  cursor: not-allowed;
`}
${({ $flex }) =>
  $flex &&
    `
    flex: 1;
`}
`;

const Button = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
}) => {
  return (
    <StyledButton
      onClick={() => !isDisabled && !isLoading && onClick()}
      $disabled={isDisabled}
      $variant={type}
      $loading={isLoading}
      $flex={flex}
      disabled={isDisabled || isLoading}
      type="button"
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </StyledButton>
  );
};

export default Button;