import { useRef, useState } from "react";
import { registerApi } from "../../apis/auth.api";
import { AuthStatus } from "../../commons/enum.common";
import Notification from "../notifications/notify.component";

const Register = (props) => {
  const [Noti, setNotify] = useState(<></>);
  const username = useRef();
  const password = useRef();
  const rePassword = useRef();
  const email = useRef();
  const register = async () => {
    const usernameTxt = username.current.value;
    const passwordTxt = password.current.value;
    const rePasswordTxt = rePassword.current.value;
    const emailTxt = email.current.value;
    if (passwordTxt !== rePasswordTxt) {
      setNotify(
        <Notification success={false} content={"Password does not matched"} />
      );
      setTimeout(() => {
        setNotify(<></>);
      }, 5000);
      return;
    }
    const response = await registerApi(usernameTxt, passwordTxt, emailTxt);
    if (response.status === 200) {
      setNotify(
        <Notification
          success={true}
          content="Register success, we will send verify email for you"
        />
      );
      props.changePrev(AuthStatus.REGISTER);
      props.changeStatus(AuthStatus.VERIFY);
      props.setInfo(emailTxt);
    } else {
      const message =
        typeof response.response.data.message === "string"
          ? response.response.data.message
          : response.response.data.message[0];
      setNotify(<Notification success={false} content={message} />);
    }
    setTimeout(() => {
      setNotify(<></>);
    }, 5000);
  };
  console.log(Noti);
  return (
    <>
      {Noti}
      <div className="login-form w-50 h-100 d-flex justify-content-center align-items-center">
        <div className="login-border">
          <div className="title text-white f-22 bold">
            <span className="text-secondary-1">REGISTER</span> new account
          </div>
          <p className="text-white mt-3 mb-1">Username</p>
          <input
            ref={username}
            name="username"
            type="text"
            className="inp w-100"
            placeholder="Your username"
          />
          <p className="text-white mt-3 mb-1">Password</p>
          <input
            ref={password}
            name="password"
            type="password"
            className="inp w-100"
            placeholder="Your password"
          />
          <p className="text-white mt-3 mb-1">Re-password</p>
          <input
            ref={rePassword}
            name="rePassword"
            type="password"
            className="inp w-100"
            placeholder="Confirm your password"
          />
          <p className="text-white mt-3 mb-1">Email</p>
          <input
            ref={email}
            name="email"
            type="text"
            className="inp w-100"
            placeholder="Your email"
          />
          <input
            type="submit"
            onClick={() => register()}
            className="smt-btn mt-4 w-100"
          />
          <center className="mt-3">
            <p className="text-white">Make sure your email is belong to you</p>
          </center>
          <p className="mt-2 text-center text-white">
            Have account ?{" "}
            <span
              className="text-secondary-1 link"
              onClick={() => {
                props.changeStatus(AuthStatus.LOGIN);
                props.changePrev(AuthStatus.REGISTER);
              }}
            >
              Login now
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
