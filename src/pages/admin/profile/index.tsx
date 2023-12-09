/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Loading } from "../my-booking";
import "./style.scss";
import { Role } from "../../../redux/reducers/auth.reducer";
const MyProfileAdmin = React.lazy(() => import("./my-profile"));
const AccountsAdmin = React.lazy(() => import("./accounts-admin"));
const AccountsUser = React.lazy(() => import("./accounts-user"));
const ProfileAdmin: React.FC = () => {
  const userCurrent = useSelector(
    (state: any) => state.authReducer?.userCurrent
  );
  const token = useSelector((state: any) => state.authReducer?.accessToken);
  return (
    <article className="p-3 space-y-3">
      <section>
        <Suspense fallback={<Loading />}>
          <MyProfileAdmin userCurrent={userCurrent} token={token} />
        </Suspense>
      </section>
      {userCurrent?.role === Role.master && (
        <>
          <section>
            <Suspense fallback={<Loading />}>
              <AccountsAdmin admin_id={userCurrent?.id} token={token} />
            </Suspense>
          </section>
          <section>
            <Suspense fallback={<Loading />}>
              <AccountsUser admin_id={userCurrent?.id} token={token} />
            </Suspense>
          </section>
        </>
      )}
    </article>
  );
};
export default ProfileAdmin;
