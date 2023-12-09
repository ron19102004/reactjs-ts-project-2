/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Loading } from "../../admin/my-booking";
const ListAdmin = React.lazy(() => import("./list-admin"));
const BookingUser: React.FC = () => {
  const userCurrent = useSelector(
    (state: any) => state.authReducer?.userCurrent
  );
  const token = useSelector((state: any) => state.authReducer?.accessToken);
  return (
    <article className="p-3 top-0 pt-14 md:pt-5">
      <section>
        <Suspense fallback={<Loading />}>
          <ListAdmin token={token} user_id={userCurrent?.id} />
        </Suspense>
      </section>
    </article>
  );
};
export default BookingUser;
