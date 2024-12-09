import Layout from "@/app/component/common/Layout";
import Attendance from "@/app/component/staff/Attendance";

import React from "react";

const page = () => {
  return (
    <Layout>
      <div className="p-3">
        {/* <Tabs /> */}
        <Attendance />
      </div>
    </Layout>
  );
};

export default page;
