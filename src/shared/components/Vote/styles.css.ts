import { vars } from "@/shared/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const voteWrap = style({
  height: "3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: vars.border.large,
  backgroundColor: vars.color.gray_100,
});
export const iconWrap = style({
  width: "4rem",
  height: "3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: vars.border.large,
  backgroundColor: vars.color.gray_100,
});
export const voteCount = style({
  fontSize: vars.font.small,
});
export const button = style({
  cursor: "pointer",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.gray_200,
    },
  },
});