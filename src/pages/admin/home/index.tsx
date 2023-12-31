/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Loading } from "../my-booking";
const ChartAnalyticsDate = React.lazy(() => import("./chart-date"));
const ChartAnalyticsMonth = React.lazy(() => import("./chart-month"));
const FeedBackAdmin = React.lazy(() => import("./feedback-ad"));
const HomeAdmin: React.FC = () => {
  const userCurrent = useSelector(
    (state: any) => state.authReducer?.userCurrent
  );
  const token = useSelector((state: any) => state.authReducer?.accessToken);
  useEffect(() => {}, []);
  return (
    <article className="p-3 pb-0">
      <main>
        <section className="grid gap-3 grid-cols-1 lg:grid-cols-2">
          <Suspense fallback={<Loading />}>
            <ChartAnalyticsDate admin_id={userCurrent?.id} token={token} />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <ChartAnalyticsMonth admin_id={userCurrent?.id} token={token} />
          </Suspense>
        </section>
        <section>
          <Suspense fallback={<Loading />}>
            <FeedBackAdmin admin_id={userCurrent?.id} token={token} />
          </Suspense>
        </section>
      </main>
    </article>
  );
};
export default HomeAdmin;
