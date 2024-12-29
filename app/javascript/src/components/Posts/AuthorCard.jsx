import React from "react";

import { User } from "@bigbinary/neeto-icons";
import { parseDate } from "src/utils/dateUtils";

const AuthorCard = ({ date, user }) => {
  const { day, monthName, year } = parseDate(date);

  return (
    <div className="-mt-4 ml-14 flex items-end gap-2">
      <User size={30} />
      <div>
        <p className="text-md font-semibold text-slate-700">{user.name}</p>
        <p className="text-xs text-slate-400">
          {day} {monthName} {year}
        </p>
      </div>
    </div>
  );
};

export default AuthorCard;
