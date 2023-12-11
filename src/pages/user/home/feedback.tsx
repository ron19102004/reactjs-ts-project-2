/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { HomeModuleControllerUser } from "./home.controller";
import commentIcon from "../../../assets/comments.png";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastOptions, toast } from "react-toastify";
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
    const re = await HomeModuleControllerUser.addFb(
      payload,
      token,
      userCurrent?.id
    );
    if (!re) {
      toast.error("Lỗi khi thêm bình luận.Vui lòng thử lại", toastConfigs);
      return;
    }
    toast.success("Bình luận đã được gửi về hệ thống. Chờ đội kiểm duyệt", toastConfigs);
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
  }
  return (
    <>
      <section className="px-3">
        <h1 className="font-semibold font-3 text-center md:text-start text-color2 text-2xl">
          Phản hồi của khách hàng
        </h1>
      </section>
      <section className="px-3">
        <button
          className="flex space-x-1 items-center bg-blue-500 text-white px-2 rounded-md py-1"
          onClick={addFb}
        >
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
                <h1 className="font-3 text-color6">
                  {userCurrent?.firstName} {userCurrent?.lastName}
                </h1>
              </div>
            </li>
            <li className="">
              <label>Tiêu đề</label>
              <input
                type="text"
                onChange={(e) => {
                  setPayload({ ...payload, subject: e.target.value });
                }}
                className="w-full outline-none h-10 border-2 rounded px-2"
              />
            </li>
            <li>
              <label>Nội dung</label>
              <ReactQuill
                theme="snow"
                value={payload.content}
                onChange={(e) => {
                  setPayload({ ...payload, content: e });
                }}
              />
            </li>
            <li className="space-x-2">
              <button
                className="bg-color5 hover:bg-color4 px-2 rounded py-1"
                onClick={add}
              >
                Thêm
              </button>
              <button
                className="bg-red-400 hover:bg-red-500 text-cyan-100 px-2 rounded py-1"
                onClick={cancel}
              >
                Hủy
              </button>
            </li>
          </ul>
        ) : (
          ""
        )}
      </section>
      <section>
        <ul className="max-h-screen overflow-y-auto grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-3">
          {feedbacks.length > 0 &&
            feedbacks.map((feedback: any, index: number) => {
              return (
                <li
                  key={index}
                  className="bg-slate-100 p-2 rounded-xl shadow-xl hover:shadow-2xl"
                >
                  <CardFeedBack feedback={feedback} />
                </li>
              );
            })}
        </ul>
      </section>
    </>
  );
};
const CardFeedBack: React.FC<{ feedback: any }> = ({ feedback }) => {
  const obHtmlContent = { __html: feedback?.data?.content };
  return (
    <>
      <div className="flex space-x-1 text-gray-900 items-end">
        <div className="w-10 h-10">
          <img
            src={feedback?.user?.avatar}
            alt="avtar-user"
            className="w-10 h-10 rounded-md object-cover"
          />
        </div>
        <h1 className="font-3 text-color6">
          {feedback?.user?.firstName} {feedback?.user?.lastName}
        </h1>
      </div>
      <div>
        <h1 className="text-color2 inline-block">
          Tiêu đề:{" "}
          <span className="font-1 inline-block">{feedback?.data.subject}</span>
        </h1>
        <h1 className="text-color2">
          Nội dung:{" "}
          <span
            className="font-1"
            dangerouslySetInnerHTML={obHtmlContent}
          ></span>
        </h1>
      </div>
      <div className="font-sans text-xs">
        <span>
          Time: {new Date(feedback?.data.created_at + "").toUTCString()}
        </span>
      </div>
    </>
  );
};
export default FeedBack;
