/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { NotifyModuleControllerUser } from "./notify.controller";

interface INotifyProps {
  id_user: number;
  token: string;
  open: boolean;
  setOpen: () => void;
  quantityNotifySeenYet:number
}
const Notify: React.FC<INotifyProps> = ({
  id_user,
  token,
  open,
  setOpen,
  quantityNotifySeenYet
}) => {
  const [notifies, setNotifies] = useState<any[]>();
  const [limit, setLimit] = useState<{ take: number; skip: number }>({
    take: 5,
    skip: 0,
  });
  const init = async (get: { take: number; skip: number }) => {
    const notifies_re = await NotifyModuleControllerUser.getNotifications(
      id_user,
      get,
      token
    );
    if (notifies_re && notifies_re.status === 200) {
      const data = notifies_re.data;
      setNotifies(data.result);
      const listIdActMess = data.result.map((item: any) => item?.data?.id);
      await NotifyModuleControllerUser.actMess(id_user, listIdActMess, token);
    }
  };
  const moreMess = async () => {
    setLimit({ take: limit.take + 5, skip: 0 });
    await init(limit);
  };
  const allSeenYet = async () => {
    const notifies_re =
      await NotifyModuleControllerUser.getNotificationsSeenYet(id_user, token);
    if (notifies_re) {
      setNotifies(notifies_re.data);
      await NotifyModuleControllerUser.actMessAll(id_user, token);
    }
  };
  useEffect(() => {
    init(limit);
  }, []);
  return (
    <>
      <Dialog
        open={open}
        onClose={setOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <span className="font-7">
            Thông báo {`(${quantityNotifySeenYet} tin chưa đọc)`}
          </span>
        </DialogTitle>
        <DialogContent className="">
          <ul className="text-sm space-y-2">
            {notifies?.map((notify: any, index: number) => {
              return (
                <li
                  key={index}
                  className=" relative border rounded-lg bg-white text-color2 shadow-lg p-3"
                >
                  {!notify?.data?.seen && (
                    <span className="absolute top-0 right-0 md:left-0 w-3 h-3 bg-red-600 rounded-full"></span>
                  )}
                  <p className="text-xs md:text-sm">{notify?.data?.content}</p>
                  <span className="text-xs">
                    Thông báo vào lúc:{" "}
                    {new Date(notify?.data?.created_at + "").toUTCString()}
                  </span>
                </li>
              );
            })}
            {notifies?.length === 0 && (
              <li className="font-6 text-lg">Không có thông báo chưa đọc</li>
            )}
          </ul>
        </DialogContent>
        <DialogActions>
          <button
            onClick={allSeenYet}
            type="button"
            className="text-xs text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full px-5 py-1 text-center  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Xem tất cả thông báo chưa xem
          </button>

          <button
            onClick={moreMess}
            type="button"
            className="py-1 px-5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Xem thêm thông báo
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Notify;
