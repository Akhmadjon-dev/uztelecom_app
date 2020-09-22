import styled from "styled-components";

export { Header, NavList, Brand, Nav, Input as SearchInput } from "./header";
export { Button } from "./buttons";

export const Main = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100vh;
`;

export const Section = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 15px;
  padding-left: 195px;
  padding-top: 75px;
  background: var(--bg-light);
  @media (max-width: 1024px) {
    & {
      padding-left: 85px;
    }
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "center"};
  flex-direction: ${(props) => props.fd || "row"};
`;
