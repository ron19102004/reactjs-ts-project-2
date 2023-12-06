/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Loading } from "../my-booking";
import "./style.scss";

const EditBranches = React.lazy(() => import("./branches"));
const EditDepartment = React.lazy(() => import("./department"));
const EditService = React.lazy(() => import("./services"));

const EditInfoAdmin: React.FC = () => {
  const userCurrent = useSelector(
    (state: any) => state.authReducer?.userCurrent
  );
  const token = useSelector((state: any) => state.authReducer?.accessToken);
  return (
    <article className="p-3 space-y-3">
      <section>
        <Suspense fallback={<Loading />}>
          <EditBranches admin_id={userCurrent?.id} token={token} />
        </Suspense>
      </section>
      <section>
        <Suspense fallback={<Loading />}>
          <EditDepartment admin_id={userCurrent?.id} token={token} />
        </Suspense>
      </section>
      <section>
        <Suspense fallback={<Loading />}>
          <EditService admin_id={userCurrent?.id} token={token} />
        </Suspense>
      </section>
    </article>
  );
};
export default EditInfoAdmin;
