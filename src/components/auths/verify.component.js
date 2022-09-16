import { useEffect, useRef, useState } from "react";
import { activeApi, resendApi } from "../../apis/auth.api";
import { AuthStatus } from "../../commons/enum.common";
import Notification from "../notifications/notify.component";

const VerifyEmail = (props) => {
  const [Notify, setNotify] = useState(<></>);
  useEffect(() => {
    if (props.prevStatus === AuthStatus.LOGIN) {
      resendApi(props.info).then((data) => {
        if (data?.status === 200) {
        } else {
          const message =
            typeof data.response.data.message === "string"
              ? data.response.data.message
              : data.response.data.message[0];
          setNotify(<Notification success={false} content={message} />);
          setTimeout(() => {
            setNotify(<></>);
          }, 5000);
        }
      });
    }
  }, []);
  const char1 = useRef();
  const char2 = useRef();
  const char3 = useRef();
  const char4 = useRef();
  const char5 = useRef();
  const char6 = useRef();

  const changeInp = (id) => {
    const elm = document.getElementById(id);
    const next = Number(id[1]) + 1;
    const prev = Number(id[1]) - 1;
    const nextelm = document.getElementById(id[0] + next);
    const preveml = document.getElementById(id[0] + prev);
    elm.blur();
    if (elm.value) {
      if (next <= 6) {
        nextelm.focus();
      }
    } else {
      if (prev > 0) {
        preveml.focus();
      }
    }
  };

  const activeAccount = async () => {
    const c1 = char1.current.value;
    const c2 = char2.current.value;
    const c3 = char3.current.value;
    const c4 = char4.current.value;
    const c5 = char5.current.value;
    const c6 = char6.current.value;
    const code = "" + c1 + c2 + c3 + c4 + c5 + c6;
    const response = await activeApi(props.info, code);
    console.log(response);
    if (response?.status === 200) {
      setNotify(
        <Notification
          success={true}
          content={"active account success, now you can login"}
        />
      );
      setTimeout(() => {
        setNotify(<></>);
      }, 5000);
    } else {
      const message =
        typeof response.response.data.message === "string"
          ? response.response.data.message
          : response.response.data.message[0];
      setNotify(<Notification success={false} content={message} />);
      setTimeout(() => {
        setNotify(<></>);
      }, 5000);
    }
  };

  const resendCode = () => {
    resendApi(props.info).then((data) => {
      if (data?.status === 200) {
        setNotify(
          <Notification
            success={true}
            content={"Send verify code success, please check your email"}
          />
        );
        setTimeout(() => {
          setNotify(<></>);
        }, 5000);
      } else {
        const message =
          typeof data.response.data.message === "string"
            ? data.response.data.message
            : data.response.data.message[0];
        setNotify(<Notification success={false} content={message} />);
        setTimeout(() => {
          setNotify(<></>);
        }, 5000);
      }
    });
  };

  return (
    <>
      {Notify}
      <div className="verify-email">
        <img
          src="./images/sendmail.png"
          className="sendmail"
          alt="Send Email On Local - Send Email@clipartmax.com"
        />
        <div className="title text-white">
          We'd sent verify code to your email, check your email, get code then
          put it in below input
        </div>
        <br />
        <h4 className="text-secondary-1">Enter your verify code</h4>
        <div className="verify-inp d-flex justify-content-center align-items-center mt-1">
          <input
            onChange={() => changeInp("c1")}
            ref={char1}
            type="text"
            maxLength="1"
            name="verify"
            id="c1"
            className="verify-inp-box text-center mx-1 text-secondary-1"
          />
          <input
            onChange={() => changeInp("c2")}
            ref={char2}
            type="text"
            maxLength="1"
            name="verify"
            id="c2"
            className="verify-inp-box text-center mx-1 text-secondary-1"
          />
          <input
            onChange={() => changeInp("c3")}
            ref={char3}
            type="text"
            maxLength="1"
            name="verify"
            id="c3"
            className="verify-inp-box text-center mx-1 text-secondary-1"
          />
          <input
            onChange={() => changeInp("c4")}
            ref={char4}
            type="text"
            maxLength="1"
            name="verify"
            id="c4"
            className="verify-inp-box text-center mx-1 text-secondary-1"
          />
          <input
            onChange={() => changeInp("c5")}
            ref={char5}
            id="c5"
            type="text"
            maxLength="1"
            name="verify"
            className="verify-inp-box text-center mx-1 text-secondary-1"
          />
          <input
            onChange={() => changeInp("c6")}
            ref={char6}
            id="c6"
            type="text"
            maxLength="1"
            name="verify"
            className="verify-inp-box text-center mx-1 text-secondary-1"
          />
        </div>
        <input
          type="submit"
          onClick={() => activeAccount()}
          className="smt-btn px-5 mt-5"
        />
        <p
          className="text-center text-secondary-1 mt-3 link"
          onClick={() => resendCode()}
        >
          Resend verify code
        </p>
        <p
          className="text-center text-white mt-3 link"
          onClick={() => {
            props.changePrev();
            props.changeStatus(AuthStatus.LOGIN);
          }}
        >
          Go to Login
        </p>
      </div>
    </>
  );
};

export default VerifyEmail;
