import { BLUE, BLUE_HOVER, ORANGE, ORANGE_HOVER } from "../utils/colors";

export const verifyButtonStyle = {
  width: "100%",
  minHeight: 46,
  borderRadius: "9px",
  backgroundColor: ORANGE,
  color: "#fff",
  fontSize: 15,
  fontWeight: 700,
  textTransform: "uppercase",
  boxShadow: "none",
  "&:not(.Mui-disabled)": {
    cursor: "pointer",
  },
  "&:hover": {
    backgroundColor: ORANGE_HOVER,
    boxShadow: "none",
  },
};

export const retryButtonStyle = {
  width: "100%",
  minHeight: 44,
  borderRadius: "8px",
  color: BLUE,
  borderColor: BLUE,
  fontSize: 14.5,
  fontWeight: 600,
  textTransform: "uppercase",
  boxShadow: "none",
  "&:not(.Mui-disabled)": {
    cursor: "pointer",
  },
  "&:hover": {
    backgroundColor: "rgba(79,141,247,0.05)",
    borderColor: BLUE_HOVER,
    color: BLUE_HOVER,
  },
  "&.Mui-disabled": {
    color: BLUE,
    borderColor: BLUE,
    opacity: 0.65,
  },
};
