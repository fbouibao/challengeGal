import React from "react";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import IconButton from "@mui/material/IconButton";

const RightLogin = () => {
  const starIcons = [];

  for (let i = 0; i < 5; i++) {
    starIcons.push(
      <StarIcon key={i} sx={{ color: "white", fontSize: "16px" }} />
    );
  }
  return (
    <div className="absolute bg-[rgba(255,255,255,0.3)] backdrop-blur-[6px] p-[15px] bottom-5 inset-x-5">
      <h1 className="text-2xl font-medium text-white">
        "We've been using Untitled to kick start every new project and can't
        imagine working without it."
      </h1>
      <div className="flex justify-between mt-6">
        <div>
          <h2 className="text-2xl font-medium text-white mb-3">Andi Lane</h2>
          <h4 className="text-xs font-bold text-white mb-2">
            Founder, Catalog
          </h4>
          <h6 className="text-xs font-light text-gray-100">
            Web Design Agency
          </h6>
        </div>
        <div>
          {starIcons}
          <div className="mt-6">
            <IconButton
              aria-label="back"
              size="small"
              sx={{
                border: "1px solid rgba(255,255,255,0.4)",
                padding: "10px",
                marginRight: "10px",
              }}
            >
              <ArrowBackOutlinedIcon
                sx={{ color: "white", fontSize: "0.9em" }}
              />
            </IconButton>
            <IconButton
              aria-label="forward"
              size="small"
              sx={{
                border: "1px solid rgba(255,255,255,0.4)",
                padding: "10px",
                marginLeft: "10px",
              }}
            >
              <ArrowForwardOutlinedIcon
                sx={{ color: "white", fontSize: "0.9em" }}
              />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightLogin;
