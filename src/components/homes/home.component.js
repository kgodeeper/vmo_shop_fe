import { useEffect, useState } from "react";
import { checkAuthApi, refresh } from "../../apis/auth.api";
import { getCaregoriesApi } from "../../apis/categories.api";
import { getCurrentCouponApi, saveCouponApi } from "../../apis/coupon.api";
import { getCurrentSaleApi, getSaleProducts } from "../../apis/sale.api";
import { getCookie, setCookie } from "../../utils/cookie.util";
import Navbar from "../navbars/navbar.component";
import Notification from "../notifications/notify.component";
import "./css/home.css";
const Home = (props) => {
  const [isLogin, setLogin] = useState(false);
  const [category, setCategory] = useState(<></>);
  const [flashSale, setFlashSale] = useState(<></>);
  const [coupon, setCoupon] = useState(<></>);
  const [saleRemain, setSaleRemain] = useState("--:--:--");
  const [haveSale, setHaveSale] = useState(false);
  const [notify, setNotify] = useState(<></>);
  useEffect(() => {
    const refreshToken = getCookie("refreshToken");
    const accessToken = getCookie("accessToken");
    if (!refreshToken) {
      window.location.replace("/login");
    }
    checkAuthApi(accessToken).then((data) => {
      if (data?.status === 200) {
        setLogin(true);
      } else {
        refresh().then((data) => {
          if (data?.status === 200) {
            console.log(data);
            const { accessToken } = data.data;
            setCookie("accessToken", accessToken);
            setLogin(true);
          } else {
            window.location.replace("/login");
          }
        });
      }
    });
    getCaregoriesApi().then((data) => {
      if (data?.status === 200) {
        const elms = data.data.items;
        const cate = elms.map((item, index) => {
          return (
            <li
              key={index}
              className="cate-item d-flex justify-content-center align-items-center flex-column py-4 px-4"
            >
              <img
                className="img-circle cate-banner bg-white"
                src={item.banner}
                alt={item.name + "- logo"}
              />
              <p className="cate-name mb-0 text-white mt-1">{item.name}</p>
            </li>
          );
        });
        setCategory(cate);
      }
    });
    getCurrentSaleApi()
      .then((data) => {
        if (data?.status === 200) {
          let pkSale = "";
          if (data.data.pkSale) {
            pkSale = data.data.pkSale;
          }
          return {
            pkSale,
            end: data.data.end,
          };
        }
      })
      .then(({ pkSale, end }) => {
        if (pkSale) {
          setHaveSale(true);
          reloadSale(pkSale);
          reloadSale(pkSale);
          setInterval(async () => {
            await reloadSale(pkSale);
          }, 5000);
          setInterval(() => {
            const now = new Date();
            now.setHours(now.getHours() + 7);
            const millis = new Date(end) - now;
            const diff = new Date(millis);
            diff.setHours(diff.getHours() - 8);
            if (millis <= 0) {
              window.location.reload();
            }
            setSaleRemain(
              `${
                diff.getHours() < 10 ? "0" + diff.getHours() : diff.getHours()
              }:${
                diff.getMinutes() < 10
                  ? "0" + diff.getMinutes()
                  : diff.getMinutes()
              }:${
                diff.getSeconds() < 10
                  ? "0" + diff.getSeconds()
                  : diff.getSeconds()
              }`
            );
          }, 1000);
        }
      });
    reloadCoupon();
    setInterval(() => {
      reloadCoupon();
    }, 10000);
  }, []);

  const saveCoupon = (code) => {
    const accessToken = getCookie("accessToken");
    checkAuthApi(accessToken).then((data) => {
      if (data?.status === 200) {
        setLogin(true);
      } else {
        if (data.response.data.message === "jwt expires") {
          refresh().then((data) => {
            if (data?.status === 200) {
              const { accessToken } = data.data;
              setCookie("accessToken", accessToken);
              setLogin(true);
            } else {
              window.location.replace("/login");
            }
          });
        }
      }
    });
    saveCouponApi(code).then((data) => {
      if (data?.status === 200) {
        setNotify(
          <Notification success={true} content={"save coupon success"} />
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
  const reloadCoupon = () => {
    getCurrentCouponApi().then((data) => {
      if (data?.status === 200) {
        const items = data.data.items;
        const couponMap = items.map((item, index) => {
          return (
            <li key={index} className="item-coupon my-1 mx-1">
              <div className="coupon  bg-white d-flex justify-content-between align-items-center">
                <div className="discount w-25 py-3 px-2 text-center bold f-22 bg-coupon text-white d-flex justify-content-center align-items-center">
                  {item.code}
                  <br />
                  {item.discount}$
                </div>
                <div className="px-4">
                  <div className="coupon-content">{item.description}</div>
                  <div className="coupon-expires">{item.end}</div>
                </div>
                <div
                  onClick={() => saveCoupon(item.code)}
                  className="save-coupon bg-secondary-1 h-100 px-3 me-2 py-2 link bold text-white"
                >
                  SAVE
                </div>
              </div>
            </li>
          );
        });
        setCoupon(couponMap);
      }
    });
  };
  const reloadSale = (pkSale) => {
    getSaleProducts(pkSale).then((data) => {
      if (data?.status === 200) {
        const items = data.data.items;
        const saleComponent = items.map((item, index) => {
          return (
            <li key={index} className="sale-item">
              <div className="product">
                <div className="product-img">
                  <div className="product-status d-flex justify-content-center align-items-center">
                    <div className="status-bound">
                      <div className="status">Saling</div>
                    </div>
                  </div>
                  <img src={item.fkProduct.avatar} alt="products-iphone-13" />
                </div>
                <div className="product-name text-white bold">
                  {item.fkProduct.name}
                </div>
                <div className="d-flex justify-content-between align-items-center product-price">
                  <div className="price d-flex justify-content-start align-items-center">
                    <div className="cur-price text-secondary-1 f-22 bold me-2">
                      {item.salePrice}$
                    </div>
                    <div className="old-price text-secondary f-14">
                      <del>{item.fkProduct.exportPrice}$</del>
                    </div>
                  </div>
                  <div className="remaining f-14 text-white">
                    Remaining: {item.remainQuantity}
                  </div>
                </div>
              </div>
            </li>
          );
        });
        setFlashSale(saleComponent);
      }
    });
  };
  return (
    <>
      {notify}
      <div className="w-100 home-full-height bg-main margin-nav">
        <Navbar isLogin={isLogin} />
        <div className="banner main-width d-flex justify-content-between align-items-center">
          <div className="big-banner w-70">
            <img
              src="./images/iPhone-14-Pro-specs-810x298_c.jpeg"
              className="w-100"
              alt="banner"
            />
          </div>
          <div className="sub-banner d-flex flex-column justify-content-center align-items-center w-30">
            <img
              src="./images/eabdaadef69a169117a2900e77bfde9f.jpg"
              alt="banner"
              className="h-50 w-100"
            />
            <img
              src="./images/reno-8-1.jpg"
              alt="banner"
              className="h-50 w-100"
            />
          </div>
        </div>
        <h5 className="text-white main-width pt-3 mb-0 pb-0">
          <i className="fa-solid fa-bars-staggered me-2"></i>Categories
        </h5>
        <div className="categories main-width">
          <ul className="cate-list w-75 m-auto">{category}</ul>
        </div>
        {haveSale ? (
          <>
            <h5 className="text-white main-width pt-3 mb-0 pb-0">
              <i className="fa-solid fa-bolt-lightning me-2"></i>FlashSale
              <span className="mx-2 px-3 sale-remain bg-secondary-1 text-white">
                {saleRemain}
              </span>
            </h5>
            <div className="list-sale-product main-width py-3">
              <ul className="w-100 sale-list m-0">{flashSale}</ul>
            </div>
          </>
        ) : null}
        <h5 className="text-white main-width pt-3 mb-0 pb-0">
          <i className="fa-solid fa-ticket me-2"></i>Coupons
        </h5>
        <div className="list-coupons-container main-width py-2">
          <ul className="list-coupons w-100">{coupon}</ul>
        </div>
        <div className="footer p-4 text-center">
          <strong className="vmo text-white f-25">
            <span className="f-18">Fresher at</span>
            <strong className="text-secondary-1">V</strong>MO
          </strong>
          <div className="text-secondary-1">Author: D.Khanh</div>
          <div className="text-secondary-1">
            This site was created by JSX, reactJs
          </div>
          <div className="text-white">Hanoi, 15.09.2022</div>
        </div>
      </div>
    </>
  );
};

export default Home;
