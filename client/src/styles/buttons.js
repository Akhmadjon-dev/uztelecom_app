import styled from "styled-components";

const success = `
    display: inline-block;
    width: auto;
    margin: 0 5px;
    padding: 5px 10px;
    background: var(--success-light) !important;
    color: var(--success) !important;
    border-color: var(--success-light) !important;
    border-radius: 4px;
    font-size: initial;
    outline: none;
    cursor: pointer;
    &.active {
        background: var(--success) !important;
        color: #fff !important;
    }
    &.light {
        background: var(--success-light) !important;
        color: var(--success) !important;
    }
`;

const danger = `
    display: inline-block;
    width: auto;
    margin: 0 5px;
    padding: 5px 10px;
    background: var(--danger) !important;
    color: var(--danger) !important;
    border-color: var(--danger) !important;
    border-radius: 4px;
    font-size: initial;
    outline: none;
    cursor: pointer;
    &.active {
        background: var(--danger) !important;
        color: #fff !important;
    }
`;

const primary = `
    display: inline-block;
    width: auto;
    margin: 0 5px;
    padding: 5px 10px;
    color: rgba(255, 255, 255, 0.7); !important;
    font-size: initial;
    outline: none;
    cursor: pointer;
    &.active {
        background: var(--blue) !important;
        color: #fff !important;
    }
`;

const warning = `
    display: inline-block;
    width: auto;
    margin: 0 5px;
    padding: 5px 10px;
    background: var(--orange-light) !important;
    color: var(--orange) !important;
    border-color: var(--orange-light) !important;
    border-radius: 4px;
    font-size: initial;
    outline: none;
    cursor: pointer;
    &.active {
        background: var(--orange) !important;
        color: #fff !important;
    }
`;

const custom = (props) => `
    display: ${props.display || "block"};
    width: ${props.width || "auto"};
    margin: ${props.margin};
    margin-top: ${props.marginTop};
    margin-right: ${props.marginRight};
    margin-bottom: ${props.marginBottom};
    margin-left: ${props.marginLeft};
    padding: ${props.padding || "10px 15px"};
    background: ${props.background || "initial"};
    color: ${props.color || "initial"};
    border-color: ${props.borderColor || "initial"};
    border-radius: ${props.borderRadius || "20px"};
    font-size: ${props.fontSize || "initial"};
    outline: none;
    cursor: pointer;
`;

const status = {
  success,
  primary,
  danger,
  warning,
};

export const Button = styled.button`
  ${(props) => status[props.status] || custom}
  text-transform: capitalize;
  min-width: 80px;
  &:disabled {
    background: var(--grey);
    border: 1px solid var(--grey);
    cursor: not-allowed;
  }
  &.btn-sm {
    padding: 5px 10px;
    border-radius: 0px;
  }
  &.btn-grid-toggle {
    font-size: 14px;
    width: 25px !important;
    min-width: auto;
    border-radius: 2px;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--blue);
  }
  &:first-of-type {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  &:last-of-type {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  &.active {
    background-color: var(--light);
    border-color: var(--light);
    color: #fff;
  }
  &.log-out{
    background-color: inherit;
    border:none;
    text-align:left;
    color: rgba(255, 255, 255, 0.7); !important;
  }
`;
