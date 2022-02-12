import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRule = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem">
            <ExploreIcon
              fill={pathMatchRule("/") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
              onClick={() => navigate("/")}
            />
            <p
              className={
                pathMatchRule("/")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Explore
            </p>
          </li>
          <li className="navbarListItem">
            <OfferIcon
              fill={pathMatchRule("/offers") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
              onClick={() => navigate("/offers")}
            />
            <p
              className={
                pathMatchRule("/offers")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Offers
            </p>
          </li>
          <li className="navbarListItem">
            <PersonOutlineIcon
              fill={pathMatchRule("/profile") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
              onClick={() => navigate("/profile")}
            />
            <p
              className={
                pathMatchRule("/profile")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
