import { useRef, useState } from "react";
import { loginApi } from "../../apis/auth.api";
import { AuthStatus } from "../../commons/enum.common";
import { setCookie } from "../../utils/cookie.util";
import Notification from "../notifications/notify.component";

const Login = (props) => {
  const [remember, setRemember] = useState(false);
  const [Noti, setNoti] = useState(<></>);
  const username = useRef();
  const password = useRef();
  const login = async () => {
    const usernameTxt = username.current.value;
    const passwordTxt = password.current.value;
    const response = await loginApi(usernameTxt, passwordTxt);
    if (response?.status === 200) {
      setCookie("accessToken", response.data.accessToken);
      setCookie("refreshToken", response.data.refreshToken);
      if (remember === true) {
        setCookie("refreshToken", response.data.refreshToken, 30);
      }
      window.location.replace("/home");
    } else {
      const message =
        typeof response.response.data.message === "string"
          ? response.response.data.message
          : response.response.data.message[0];
      setNoti(<Notification success={false} content={message} />);
      if (message.includes("inactive")) {
        props.setInfo(usernameTxt);
        props.changePrev(AuthStatus.LOGIN);
        props.changeStatus(AuthStatus.VERIFY);
      }
      setTimeout(() => {
        setNoti(<></>);
      }, 7000);
    }
  };
  // switch remember button
  const switchRmb = () => {
    setRemember(!remember);
  };
  return (
    <>
      {Noti}
      <div className="login-form w-50 h-100 d-flex justify-content-center align-items-center">
        <div className="login-border">
          <div className="title text-white f-22 bold">
            Please <span className="text-secondary-1">LOGIN</span> to shopping !
          </div>
          <p className="text-white mt-3 mb-1">Account name</p>
          <input
            ref={username}
            name="account"
            type="text"
            className="inp w-100"
            placeholder="Your username or email"
          />
          <p className="text-white mt-3 mb-1">Password</p>
          <input
            ref={password}
            name="password"
            type="password"
            className="inp w-100"
            placeholder="Your password"
          />
          <label
            htmlFor="remem-ck"
            className="mt-3 d-flex align-items-center justify-content-end"
          >
            $
            {!remember ? (
              <>
                <div className="fake-ckc" onClick={() => switchRmb()}></div>
                <span className="text-white px-1">Remember me ?</span>
              </>
            ) : (
              <>
                <div
                  className="fake-ckc ckc-active"
                  onClick={() => switchRmb()}
                ></div>
                <span className="text-secondary-1 px-1">Remember me ?</span>
              </>
            )}
          </label>
          <input type="checkbox" className="d-none" id="remem-ckb" />
          <input
            type="submit"
            onClick={async () => await login()}
            className="smt-btn mt-3 w-100"
          />
          <center className="mt-3">
            <span className="text-white d-block">Forgot password ?</span>
          </center>
          <p className="mt-2 text-center text-white">
            Don't have account ?{" "}
            <span
              className="text-secondary-1 link"
              onClick={() => {
                props.changeStatus(AuthStatus.REGISTER);
                props.changePrev(AuthStatus.LOGIN);
              }}
            >
              Register now !
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
