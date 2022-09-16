const PageNotFound = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center full-height bg-main text-center ">
      <img
        className="h-50"
        src="../images/404 not found.png"
        alt="Page not found"
      />
      <div className="text-start">
        <p className="text-white">
          Somethings went wrong because your require resource:{" "}
          <span className="text-secondary-1">{window.location.href}</span> is
          not found
        </p>
        <p className="text-white">Make sure that your url is correct</p>
        <p className="text-white">
          Or your can go to
          <span
            className="text-secondary-1 f-22 link"
            onClick={() => window.location.replace("http://localhost:3000")}
          >
            HOME
          </span>{" "}
          page
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
