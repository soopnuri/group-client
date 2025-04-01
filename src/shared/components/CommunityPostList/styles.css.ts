import { vars } from "@/shared/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  // padding: "2rem",
  paddingTop: "2rem",
  width: "100%",
});

export const subTitle = style({
  display: "flex",
  justifyContent: "space-between",
  fontSize: vars.font.small,
  color: vars.color.gray_400,
  borderRadius: vars.border.normal,
  cursor: "pointer",
  width: "100%",
  letterSpacing: "0.2rem",
  padding: "1rem",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.gray_100,
    },
  },
});
export const postWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.4rem",
  padding: "1rem 0",
});
export const postBox = style({
  display: "flex",
  gap: "1.4rem",
  padding: "1rem 0",
  // backgroundColor: vars.color.gray_100,
});
export const postImage = style({});
export const postItem = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
});

export const postSlug = style({
  fontSize: vars.font.small,
  color: vars.color.gray_400,
});

export const postTitle = style({
  fontWeight: vars.weight.bold,
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
export const reverseIcon = style({
  rotate: "90deg",
});
export const button = style({
  cursor: "pointer",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.gray_200,
    },
  },
});
export const postContent = style({
  lineHeight: vars.lineheight.l_160,
});
