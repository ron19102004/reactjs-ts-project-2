/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { ToastOptions, toast } from "react-toastify";
import { HomeModuleControllerUser } from "../../user/home/home.controller";
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
const FeedBackAdmin: React.FC<{ token: string; admin_id: number }> = ({
  token,
  admin_id,
}) => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const init = async () => {
    const fbs: any[] = await HomeModuleControllerUser.getFeedbackForAdmin(
      admin_id,
      token
    );
    setFeedbacks(fbs);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <section className="px-3">
        <h1 className="font-semibold font-7 text-center md:text-start text-color2 text-2xl">
          Phản hồi của khách hàng
        </h1>
      </section>
      <section>
        <ul className="max-h-screen overflow-y-auto grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-3">
          {feedbacks.length > 0 &&
            feedbacks.map((feedback: any, index: number) => {
              return (
                <li key={index} className="">
                  <FeedBackCard
                  init={init}
                    admin_id={admin_id}
                    feedback={feedback}
                    token={token}
                  />
                </li>
              );
            })}
        </ul>
      </section>
    </>
  );
};
const FeedBackCard: React.FC<{
  feedback: any;
  token: string;
  admin_id: number;
  init:()=> Promise<void>
}> = ({ feedback, token, admin_id ,init}) => {
  const [confirm, setConfirm] = useState<boolean>(feedback?.data?.confirmed);
  const confirm$ = async () => {
    const re = await HomeModuleControllerUser.confirm(
      token,
      admin_id,
      feedback?.data?.id
    );
    if (!re) {
      toast.error("Xử lý duyệt bị lỗi", toastConfigs);
      return;
    }
    toast.success("Đã duyệt", toastConfigs);
    setConfirm(true);
  };
  const obHtmlContent = { __html: feedback?.data?.content };
  const deleteF = async () => {
    const re = await HomeModuleControllerUser.del(
      token,
      admin_id,
      feedback?.data?.id
    );
    if (!re) {
      toast.error("Xử lý duyệt bị lỗi", toastConfigs);
      return;
    }
    init()
    toast.success("Đã xóa", toastConfigs);
    setConfirm(true);
  };
  return (
    <>
      {" "}
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow relative">
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
        <div className="absolute top-1 right-1 flex justify-center items-center  space-x-1">
          {!confirm ? (
            <button
              type="button"
              onClick={confirm$}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
            >
              <span className="font-7">Duyệt</span>
            </button>
          ) : (
            ""
          )}
          <button
            onClick={deleteF}
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
          >
            <span className="font-7">Xóa</span>
          </button>
        </div>
      </div>
    </>
  );
};
export default FeedBackAdmin;
