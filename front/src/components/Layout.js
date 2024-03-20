import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Suspense } from "react";

export const Layout = () => {
  return (
    <div style={{ margin: "0 auto" }}>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
