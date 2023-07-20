import { styled } from "styled-components";

const PrimaryButtonContainer = styled.div`
  text-align: center;

  button {
    padding: 12px 20px;
    background-color: #333;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  button:disabled {
    opacity: 0.5;
  }
`;

export default function PrimaryButton({ children, ...props }) {
  return (
    <PrimaryButtonContainer>
      <button {...props}>{children}</button>
    </PrimaryButtonContainer>
  );
}
