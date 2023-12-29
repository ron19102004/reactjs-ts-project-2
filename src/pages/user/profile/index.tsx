/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Loading } from "../../admin/my-booking";
const MyProfileUser = React.lazy(() => import("./my-profile"));
const MyBookingUser = React.lazy(() => import("./my-booking"));
const ProfileUser: React.FC = () => {
  const userCurrent = useSelector(
    (state: any) => state.authReducer?.userCurrent
  );
  const token = useSelector((state: any) => state.authReducer?.accessToken);
  return (
    <article className="p-3 md:mt-0 pt-14 md:pt-3 space-y-3">
      <section>
        <Suspense fallback={<Loading />}>
          <MyProfileUser userCurrent={userCurrent} token={token} />
        </Suspense>
      </section>
      <section>
        <Suspense fallback={<Loading />}>
          <MyBookingUser user_id={userCurrent?.id} token={token} />
        </Suspense>
      </section>
    </article>
  );
};
export default ProfileUser;
