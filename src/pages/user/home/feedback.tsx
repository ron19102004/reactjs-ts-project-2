/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { HomeModuleControllerUser } from "./home.controller";
import commentIcon from "../../../assets/comments.png";
import { useNavigate } from "react-router-dom";
import { ToastOptions, toast } from "react-toastify";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Role } from "../../../redux/reducers/auth.reducer";
const toastConfigs: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};
const FeedBack: React.FC<{ token: string; userCurrent: any }> = ({
  token,
  userCurrent,
}) => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [openAddFb, setOpenAddFb] = useState<boolean>(false);
  const [payload, setPayload] = useState<{ subject: string; content: string }>({
    content: "",
    subject: "",
  });
  const navigate = useNavigate();
  const init = async () => {
    const fbs: any[] = await HomeModuleControllerUser.getFeedback();
    setFeedbacks(fbs);
  };
  const addFb = () => {
    if (!token || token.length === 0) {
      navigate("/auth/login");
      return;
    }
    setOpenAddFb(true);
  };
  useEffect(() => {
    init();
  }, []);
  const add = async () => {
    if (payload.subject.length === 0 || payload.content.length === 0) {
      toast.warning("Vui lòng nhập đầy đủ thông tin", toastConfigs);
      return;
    }
    const re = await HomeModuleControllerUser.addFeedback(
      payload,
      token,
      userCurrent?.id
    );
    if (!re) {
      toast.error("Lỗi khi thêm bình luận.Vui lòng thử lại", toastConfigs);
      return;
    }
    if (re?.status !== 200) {
      toast.error(re?.message, toastConfigs);
      return;
    }
    toast.success(re?.message, toastConfigs);
    setPayload({
      content: "",
      subject: "",
    });
    init();
    setOpenAddFb(false);
  };
  const cancel = () => {
    setOpenAddFb(false);
    setPayload({
      content: "",
      subject: "",
    });
  };
  return (
    <>
      <section className="px-3">
        <h1 className="font-semibold font-3 text-center md:text-start text-color2 text-2xl">
          Phản hồi của khách hàng
        </h1>
      </section>

      <section>
        <ul className="max-h-screen overflow-y-auto grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-3">
          {feedbacks.length > 0 &&
            feedbacks.map((feedback: any, index: number) => {
              return (
                <li key={index} className="">
                  <CardFeedBack
                    feedback={feedback}
                    token={token}
                    id_user={userCurrent?.id}
                  />
                </li>
              );
            })}
        </ul>
      </section>
      <section className="p-3">
        <button
          onClick={addFb}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full w-full md:w-auto text-sm px-5 py-2.5 text-center flex space-x-1 items-center justify-center"
        >
          {" "}
          <div>
            <img src={commentIcon} alt="comment" className="w-5 h-5" />
          </div>
          <span className="font-sans ">Thêm bình luận</span>
        </button>
        {openAddFb ? (
          <ul className="text-color2 space-y-2">
            <li className="pt-2">
              <div className="flex space-x-1 text-gray-900 items-end">
                <div className="w-10 h-10">
                  <img
                    src={userCurrent?.avatar}
                    alt="avtar-user"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </div>
                <h1 className="font-7 text-color6">
                  {userCurrent?.firstName} {userCurrent?.lastName}
                </h1>
              </div>
            </li>
            <li className="">
              <label className="font-4">Tiêu đề</label>
              <input
                type="text"
                onChange={(e) => {
                  setPayload({ ...payload, subject: e.target.value });
                }}
                className="w-full outline-none h-10  px-2"
              />
            </li>
            <li>
              <label className="font-4">Nội dung</label>
              <textarea
                className="w-full h-40 px-2"
                value={payload.content}
                onChange={(e) => {
                  setPayload({ ...payload, content: e.target.value });
                }}
              ></textarea>
            </li>
            <li className="space-x-2">
              <button
                onClick={cancel}
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
              >
                <span className="font-7">Hủy</span>
              </button>

              <button
                type="button"
                onClick={add}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
              >
                <span className="font-7">Thêm</span>
              </button>
            </li>
          </ul>
        ) : (
          ""
        )}
      </section>
    </>
  );
};
 const CardFeedBack: React.FC<{
  feedback: any;
  token: string;
  id_user: number;
}> = ({ feedback, id_user, token }) => {
  const obHtmlContent = { __html: feedback?.data?.content };
  const [openFocusFeedback, setOpenFocusFeedback] = useState<boolean>(false);
  const changeStatusFocus = () => {
    setOpenFocusFeedback(!openFocusFeedback);
  };
  return (
    <>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between h-full space-y-2 ">
        <div>
          <div className="flex space-x-1 text-gray-900 items-end">
            <div className="w-10 h-10">
              <img
                src={feedback?.user?.avatar}
                alt="avtar-user"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>

            <h1 className="font-7 text-color6">
              {feedback?.user?.firstName} {feedback?.user?.lastName}
            </h1>
          </div>
          <p className="font-sans text-xs">
            Time: {new Date(feedback?.data.created_at + "").toUTCString()}
          </p>
          <div>
            <h1 className="font-4  inline-block">
              Tiêu đề:{` `}
              <span className="font-6 text-sm inline-block">
                {feedback?.data.subject}
              </span>
            </h1>
            <h1 className="font-4">
              Nội dung:
              <div
                className="font-6 text-sm border p-1 rounded"
                dangerouslySetInnerHTML={obHtmlContent}
              ></div>
            </h1>
          </div>
        </div>
        <div className="">
          <button
            onClick={changeStatusFocus}
            type="button"
            className="float-right font-6 py-1 px-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Xem phản hồi
          </button>
        </div>
        {openFocusFeedback ? (
          <FocusFeedBack
            id_user={id_user}
            token={token}
            feedback={feedback}
            open={openFocusFeedback}
            setOpen={changeStatusFocus}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};
 const FocusFeedBack: React.FC<{
  open: boolean;
  setOpen: () => void;
  feedback: any;
  token: string;
  id_user: number;
}> = ({ open, setOpen, feedback, id_user, token }) => {
  const handleClickOpen = () => {
    setOpen();
  };
  const [nameUserBeReply, setNameUserBeReply] = useState<string>("");
  const [userBeReplyId, setUserBeReplyId] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [listComment, setListCommet] = useState<any[]>([]);
  const init = async () => {
    const res = await HomeModuleControllerUser.getFeedbackReply(
      feedback?.data?.id
    );
    setListCommet(res);
  };
  const changeUserReply = (id: number, name: string) => {
    setUserBeReplyId(id);
    setNameUserBeReply(name);
  };
  const reply = async () => {
    if (content.length === 0) {
      toast.warning("Vui lòng nhập nội dung", toastConfigs);
      return;
    }
    if (userBeReplyId === 0) {
      toast.warning("Vui lòng chọn đối tượng phản hồi", toastConfigs);
      return;
    }
    const re = await HomeModuleControllerUser.addFeedbackReply(
      content,
      token,
      id_user,
      feedback?.data?.id,
      userBeReplyId
    );
    if (!re) {
      toast.error("Lỗi khi thêm bình luận.Vui lòng thử lại", toastConfigs);
      return;
    }
    if (re?.status !== 200) {
      toast.error(re?.message, toastConfigs);
      return;
    }
    toast.success(re?.message, toastConfigs);
    setContent("");
    setUserBeReplyId(0);
    await init();
  };
  useEffect(() => {
    init();
    setInterval(() => {
      init();
    }, 15000);
  }, []);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClickOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <span className="text-color2 font-7">
            Tiêu đề: {feedback?.data?.subject}
          </span>
        </DialogTitle>
        <DialogContent>
          <div className="w-full h-[0.01rem] bg-slate-400" />
          <div className="flex justify-center relative pt-2 ">
            <div className="relative grid grid-cols-1 gap-4 p-4 border rounded-lg bg-color2 text-white shadow-lg">
              <div className="flex items-center space-x-1">
                <img
                  src={feedback?.user?.avatar}
                  className="rounded-full  bg-white border h-14 w-14 object-cover"
                  alt=""
                  loading="lazy"
                />
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <p className="relative font-7  whitespace-nowrap truncate overflow-hidden">
                      {feedback?.user?.firstName} {feedback?.user?.lastName}
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {new Date(feedback?.data?.created_at + "").toUTCString()}
                  </p>
                </div>
              </div>
              <p className="-mt-4 text-gray-200 pt-1">
                <div
                  className="font-2 text-sm border p-1 rounded"
                  dangerouslySetInnerHTML={{ __html: feedback?.data?.content }}
                ></div>
              </p>
              <div className="w-full">
                <button
                  onClick={() => {
                    const name =
                      feedback?.user?.firstName +
                      " " +
                      feedback?.user?.lastName;
                    changeUserReply(feedback?.user?.id, name);
                  }}
                  className="flex items-center text-xs font-4 float-right hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  <span>Phản hồi</span>
                </button>
              </div>
            </div>
          </div>
          <div className="pb-3">
            <ul className="space-y-2 max-h-96 overflow-auto py-3">
              {listComment &&
                listComment.map((comment: any, index: number) => {
                  return (
                    <li
                      key={index}
                      className="border rounded-lg bg-color3 text-white shadow-lg p-3"
                    >
                      <h1 className="flex items-center space-x-1 font-6  text-sm">
                        <span>
                          {comment?.user?.role !== Role.user ? (
                            "Admin"
                          ) : (
                            <>
                              {comment?.user?.id === id_user ? (
                                "Tôi"
                              ) : (
                                <>
                                  {comment?.userBeReply?.id ===
                                  comment?.user?.id ? (
                                    "Tác giả"
                                  ) : (
                                    <>
                                      {comment?.user?.firstName}{" "}
                                      {comment?.user?.lastName}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </span>
                        <div className="-rotate-90">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </div>
                        <span>
                          {comment?.userBeReply?.role !== Role.user ? (
                            "Admin"
                          ) : (
                            <>
                              {comment?.userBeReply?.id === comment?.user?.id &&
                              comment?.userBeReply?.id === id_user ? (
                                "Tôi"
                              ) : (
                                <>
                                  {comment?.userBeReply?.id ===
                                    comment?.user?.id && "Tác giả"}
                                  {comment?.userBeReply?.id === id_user &&
                                    "Tôi"}
                                </>
                              )}
                              {comment?.userBeReply?.id !== comment?.user?.id &&
                              comment?.userBeReply?.id !== id_user ? (
                                <>
                                  {comment?.userBeReply?.firstName}{" "}
                                  {comment?.userBeReply?.lastName}
                                </>
                              ) : (
                                ""
                              )}
                            </>
                          )}
                        </span>
                      </h1>
                      <span className="text-xs">
                        {new Date(comment?.data?.created_at + "").toUTCString()}
                      </span>
                      <div
                        className="font-2 text-gray-200 text-sm border p-1 rounded"
                        dangerouslySetInnerHTML={{
                          __html: comment?.data?.content,
                        }}
                      ></div>
                      <div className="w-full pt-2 flex justify-between">
                        <div>
                          {index === 0 && (
                            <h1 className="text-xs font-4 flex items-center text-red-600 animate-pulse">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                                />
                              </svg>
                              <span>Mới nhất</span>
                            </h1>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            const name =
                              comment?.user?.firstName +
                              " " +
                              comment?.user?.lastName;
                            changeUserReply(comment?.user?.id, name);
                          }}
                          className="flex items-center text-xs font-4 hover:underline"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                            />
                          </svg>
                          <span>Phản hồi</span>
                        </button>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="w-full h-[0.01rem] bg-slate-400" />
          <div className="pt-2">
            {userBeReplyId !== 0 && (
              <div className="pl-3 flex items-center space-x-1">
                <div className="rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                  </svg>
                </div>
                <h1 className="font-6 text-sm text-ellipsis line-clamp-1">
                  Phản hồi bình luận của{" "}
                  <span className="font-3">{nameUserBeReply}</span>
                </h1>
              </div>
            )}
            <div className="relative pt-1">
              <input
                placeholder="Nhập bình luận phản hồi"
                type="text"
                className="min-w-full rounded-3xl h-10 pl-2 pt-2 pr-10 font-6 text-sm"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
              <button
                onClick={reply}
                className="absolute top-2 right-1 outline-none border-hidden ring-0 rounded-3xl p-1 px-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default FeedBack;
