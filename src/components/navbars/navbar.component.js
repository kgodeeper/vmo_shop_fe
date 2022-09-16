import { useState } from "react";

const Navbar = (props) => {
  const [showMore, setShowMore] = useState(true);
  const handleMore = () => {
    setShowMore(!showMore);
    const elm = document.querySelector(".account-more");
    if (showMore) {
      elm.classNameList.remove("d-none");
    } else {
      elm.classNameList.add("d-none");
    }
  };
  return (
    <>
      <div className="nav-bar w-100 position-fixed top-0 start-0 d-flex justify-content-between align-items-center">
        <div className="shop">
          <h3 className="text-white mb-0">
            <strong className="text-secondary-1">FR</strong>ESHER
          </h3>
        </div>
        <div className="nav d-flex align-items-center">
          <i className="text-white fa-solid fa-bell f-22 mx-3"></i>
          <i className="text-white fa-solid fa-cart-shopping f-22 mx-3"></i>
          <div className="account ms-3 position-relative">
            <img
              src="./images/404 not found.png"
              className="img-circle"
              alt="avatar"
              onClick={() => {
                handleMore();
              }}
            />
            <div className="account-more d-none bg-white position-absolute mt-3 end-0">
              <ul className="more">
                <li className="more-item">
                  <i className="fa-solid fa-screwdriver-wrench me-2"></i>Manager
                  account
                </li>
                <li className="more-item">
                  <i className="fa-solid fa-receipt me-2"></i>Your orders
                </li>
                <li className="more-item">
                  <i className="fa-solid fa-person-through-window me-2"></i>
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
