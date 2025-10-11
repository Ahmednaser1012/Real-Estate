import { BiChevronDown } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { openDropdown } from "../../features/uiSlice";

const SingleLink = ({ id, linkTextKey, url, subLinks }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const linkText = t(linkTextKey);
  
  const handleDropDown = (e) => {
    const linkCords = e.target.getBoundingClientRect();
    const center = (linkCords.left + linkCords.right) / 2;
    dispatch(openDropdown({ link: linkText, linkTextKey, center }));
  };
  
  return (
    <div className="relative">
      <NavLink
        to={url}
        end
        key={id}
        className="relative w-full px-3 py-[0.6rem] lg:px-4 flex-align-center gap-x-1 link"
        onMouseOver={handleDropDown}
      >
        {linkText}
        {subLinks && <BiChevronDown className="link" />}
      </NavLink>
    </div>
  );
};

export default SingleLink;
