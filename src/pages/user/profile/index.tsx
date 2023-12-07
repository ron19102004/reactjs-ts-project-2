/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";

const ProfileUser: React.FC = () => {
    const userCurrent = useSelector(
        (state: any) => state.authReducer?.userCurrent
      );
      const token = useSelector((state: any) => state.authReducer?.accessToken);
  return (
    <article className="p-3">
hihi
    </article>
  );
};
export default ProfileUser;
