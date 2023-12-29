/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { HomeModuleControllerUser } from "./home.controller";
import commentIcon from "../../../assets/comments.png";
import { useNavigate } from "react-router-dom";
import { ToastOptions, toast } from "react-toastify";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
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
    toast.success(
      "Bình luận đã được gửi về hệ thống. Chờ đội kiểm duyệt",
      toastConfigs
    );
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
                  <CardFeedBack feedback={feedback} />
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
                className="w-full outline-none h-10  rounded px-2"
              />
            </li>
            <li>
              <label className="font-4">Nội dung</label>
              <div className="overflow-auto font-sans">
                <CKEditor
                  editor={ClassicEditor}
                  data={payload.content}
                  onChange={(e, editor) => {
                    setPayload({ ...payload, content: editor.getData() });
                  }}
                />
              </div>
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
const CardFeedBack: React.FC<{ feedback: any }> = ({ feedback }) => {
  const obHtmlContent = { __html: feedback?.data?.content };
  return (
    <>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
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
    </>
  );
};
export default FeedBack;
