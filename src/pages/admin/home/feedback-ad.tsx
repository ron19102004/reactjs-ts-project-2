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
        <h1 className="font-semibold font-3 text-center md:text-start text-color2 text-2xl">
          Phản hồi của khách hàng
        </h1>
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
                  <FeedBackCard
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
}> = ({ feedback, token, admin_id }) => {
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
        <h1 className="text-color2">
          <span className="font-3">Tiêu đề: </span>
          <span className="font-1">{feedback?.data.subject}</span>
        </h1>
        <h1 className="text-color2">
          <span className="font-3">Nội dung: </span>
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
      {!confirm ? (
        <button
          className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded-lg"
          onClick={confirm$}
        >
          Duyệt
        </button>
      ) : (
        ""
      )}
    </>
  );
};
export default FeedBackAdmin;
