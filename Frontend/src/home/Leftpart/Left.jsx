import React from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";
import Translater from "../../components/Translater";
function Left() {
  return (
    <div className="w-full  bg-gray text-gray-300">
      <Search />
      <div
        className=" flex-1  overflow-y-auto"
        style={{ minHeight: "calc(84vh - 10vh)" }}
      >
        <Users />
      </div>
      <Translater />
      <Logout />
    </div>
  );
}

export default Left;
