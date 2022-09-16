const Notification = (props) => {
  const Success = (
    <i className="fa-solid fa-circle-check noti-icon noti-icon-success"></i>
  );
  const Failure = (
    <i className="fa-solid fa-circle-xmark noti-icon noti-icon-failure"></i>
  );
  const isSuccess = props.success;
  const content = props.content;
  return (
    <div className="noti px-2 py-2">
      {isSuccess ? (
        <>
          {Success}
          <div className="px-2 noti-icon-success">{content}</div>
        </>
      ) : (
        <>
          {Failure}
          <div className="px-2 noti-icon-failure">{content}</div>
        </>
      )}
    </div>
  );
};

export default Notification;
