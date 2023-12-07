/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Loading } from "../my-booking";
import './style.scss'
const MyProfileAdmin = React.lazy(() => import("./my-profile"));

const ProfileAdmin: React.FC = () => {
  const userCurrent = useSelector(
    (state: any) => state.authReducer?.userCurrent
  );
  const token = useSelector((state: any) => state.authReducer?.accessToken);
  return (
    <article className="p-3">
      <section>
        <Suspense fallback={<Loading />}>
          <MyProfileAdmin userCurrent={userCurrent} token={token} />
        </Suspense>
      </section>
    </article>
  );
};
export default ProfileAdmin;
