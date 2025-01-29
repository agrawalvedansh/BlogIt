import React from "react";

import classNames from "classnames";
import { motion } from "framer-motion";

const ProgressBar = ({ progress }) => (
  <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200">
    <motion.div
      animate={{ width: `${progress}%` }}
      className="text-2xs tems-center flex h-4 justify-center rounded-full bg-green-500 font-medium leading-none"
      initial={{ width: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <span
        className={classNames("flex items-center justify-center", {
          "absolute left-1": progress <= 8,
        })}
      >
        {progress}%
      </span>
    </motion.div>
  </div>
);

export default ProgressBar;
