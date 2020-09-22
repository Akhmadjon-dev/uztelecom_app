import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineBell, AiOutlineFileAdd } from "react-icons/ai";
import { SearchInput, Nav, FlexWrapper } from "../../styles";
import defaultImg from "../../assets/img/profile.jpg";

const Navbar = (props) => {
  const { img, name, type } = props;

  return (
    <Nav>
      {/* <SearchInput type="search" width="50%" placeholder="Search product" /> */}

      <Link
        to="/profile"
        className="ml-auto profile-img"
        display="inline-block"
      >
        <FlexWrapper fd="column" align="flex-end">
          <small>{name || "User"}</small>
        </FlexWrapper>

        <img
          src={img || defaultImg}
          onError={(e) => (e.target.src = defaultImg)}
          alt="Profile"
        />
      </Link>
    </Nav>
  );
};

export default Navbar;
