/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Skeleton, Stack } from "@chakra-ui/react";
const AllBooking = React.lazy(() => import("./all-my"));
const MyBookingAdmin: React.FC = () => {
  const userCurrent = useSelector(
    (state: any) => state.authReducer?.userCurrent
  );
  const token = useSelector((state: any) => state.authReducer?.accessToken);
  return (
    <article>
      <Suspense fallback={<Loading />}>
        <AllBooking admin_id={userCurrent?.id} token={token} />
      </Suspense>
    </article>
  );
};
export default MyBookingAdmin;
export const Loading: React.FC = () => {
  return (
    <section className="p-3">
      <Stack>
        <Skeleton height="30px" />
        <Skeleton height="30px" />
        <Skeleton height="30px" />
      </Stack>
    </section>
  );
};
