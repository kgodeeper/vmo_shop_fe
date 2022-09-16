import { useState } from "react";
import { AuthStatus } from "../../commons/enum.common";
import "./css/login.css";
import "./css/register.css";
import Login from "./login.components";
import Register from "./register.component";
import VerifyEmail from "./verify.component";

const Auth = () => {
  const [authStatus, setAuthStatus] = useState(AuthStatus.LOGIN);
  const [prevStatus, setPrevStatus] = useState(AuthStatus.LOGIN);
  const [info, setInfo] = useState(null);
  return (
    <>
      <div className="container-fluid full-height bg-main">
        <div className="container auth-container h-100 d-flex">
          <div className="shop-review d-flex justify-content-center flex-column h-100 w-50 mr-1">
            <h1 className="shop-name text-white">
              <strong className="text-secondary-1">VMO SHOP</strong>
              <br /> HIGH QUALITY PHONE
            </h1>
            <p className="text-white f-18">
              provide new, earliest and best quality phones
            </p>
            <div>
              <strong className="text-white vmo-logo">
                <strong className="text-secondary-1">V</strong>MO
              </strong>
            </div>
          </div>
          {authStatus === AuthStatus.LOGIN ? (
            <Login
              status={authStatus}
              changePrev={setPrevStatus}
              changeStatus={setAuthStatus}
              setInfo={setInfo}
            />
          ) : authStatus === AuthStatus.REGISTER ? (
            <Register
              status={authStatus}
              changeStatus={setAuthStatus}
              changePrev={setPrevStatus}
              setInfo={setInfo}
            />
          ) : (
            <VerifyEmail
              status={authStatus}
              prevStatus={prevStatus}
              changePrev={setPrevStatus}
              changeStatus={setAuthStatus}
              info={info}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
