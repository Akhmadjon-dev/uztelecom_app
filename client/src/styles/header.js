import styled from 'styled-components'

export const Header = styled.header`
  width: 180px;
  height: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background: var(--main-dark);
  color: var(--white);
  box-shadow: var(--box-shadow);
  z-index: 1050;
  overflow-y: auto;
  scroll-behavior: smooth;

  #brand {
    font-size: 10px;
    padding: 10px 0;
  }
  #brand a {
    color: white;
  }
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 5px grey; */
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(
      to bottom,
      transparent 60px,
      #00be4c 61px,
      #00be4c 90px,
      transparent 10px
    );
    border-radius: 10px;
  }

  ul {
    padding: 0px;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 100px);
  }
  @media (max-width: 1024px) {
    & {
      width: 70px;
      box-shadow: none;
    }
    #brand span {
      display: none;
    }
  }
`

export const Brand = styled.div`
  position: sticky;
  top: 0;
  height: 60px;
  background: var(--main-dark);
  text-align: center;
  line-height: 60px;
  text-decoration: none;
  font-weight: 700;
  #logo {
    display: block;
    height: 100%;
    width: 90%;
    padding: 5px 0;
    margin: auto;
    max-width: 120px;
  }
  #logo-short {
    display: none;
  }
  @media (max-width: 1024px) {
    & {
      background: var(--white);
    }
    #logo-extend {
      display: none;
    }
    #logo-short {
      display: block;
      width: 40px;
      height: 40px;
      margin: 5px auto;
    }
  }
`

export const NavList = styled.li`
  margin: 3px 0;
  list-style: none;
  a {
    display: block;
    padding: 10px 20px;
    color: var(--white);
    text-decoration: none;
    transition: 0.3s;

    &.active,
    &:hover {
      background-color: var(--orange-dark);
      transition: 0.5s;
    }
  }
  svg {
    margin-right: 7px;
    vertical-align: middle;
    height: 24px;
  }
  &:last-of-type {
    margin-top: auto;
  }
  &:last-of-type a {
    color: var(--danger);
  }
  @media (max-width: 1024px) {
    & {
      padding-left: 0;
      text-align: center;
      span {
        display: none;
      }
    }
    a {
      font-size: 20px;
    }
    &:last-of-type svg {
      margin-right: 0;
    }
  }
`

export const Nav = styled.nav`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding-left: 225px;
  padding-right: 30px;
  background: #fff;
  color: var(--main);
  border-bottom: 1px solid var(--grey);
  line-height: 60px;
  z-index: 100;
  box-shadow: var(--box-shadow);
  .links {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 30px;
    margin: 0 3px;
    padding: 3px 2px;
    text-decoration: none;
    color: var(--main);
  }
  .links svg {
    stroke: var(--success);
  }

  .profile-img {
    display: flex;
    margin-left: 5px;
    align-items: center;
    text-decoration: none;
    color: var(--main);
  }
  .profile-img img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    box-shadow: var(--box-shadow);
    padding: 2px;
    margin-left: 3px;
  }

  select {
    -webkit-appearance: none;
    text-align: center;
    padding: 3px 8px;
    border: none;
    background: none;
    outline: none;
    font-size: 14px;
    color: var(--main);
  }

  small {
    line-height: 1;
  }
  @media (max-width: 991px) {
    & {
      padding-left: 105px;
    }
  }
`

export const Input = styled.input`
  width: ${props => props.width || '100%'};
  height: 35px;
  display: inline-block;
  padding: 7px 10px 7px 20px;
  font-size: 16px;
  border-radius: 20px;
  border: 1px solid var(--grey);
  background-color: var(--bg-light);
  outline: none;
  &:focus {
    border: 1px solid var(--main-dark);
  }

  @media (max-width: 550px) {
    & {
      display: none;
    }
  }
`
