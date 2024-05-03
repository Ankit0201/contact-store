import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AddContact from "./AddContact";

const ViewContact = lazy(() => import("./ViewContact"));

const ComponentRoutes = () => {
  return (
    <div>
      <main>
        <Suspense fallback={<>Loadig....</>}>
          <Routes>
            <Route path="/" element={<AddContact />} />
            <Route path="/view-contacts" element={<ViewContact />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default ComponentRoutes;
