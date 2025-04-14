import { vars } from "@/shared/styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
});

export const profileBox = style({
  display: "flex",
  gap: "1rem",
});
export const contentBox = style({});
export const commentBox = style({});

export const authorBox = style({
  display: "flex",
  gap: "1rem",
});
export const authorSlugTime = style({
  display: "flex",
  fontSize: vars.font.small,
  gap: "0.4rem",
});
export const authorText = style({
  fontSize: vars.font.small,
});
export const b = style({
  fontWeight: vars.weight.bold,
});
export const authorInfo = style({
  display: "flex",
  flexDirection: "column",
});

export const iconWrap = style({
  width: "3.4rem",
  height: "3.4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: vars.border.circle,
  backgroundColor: vars.color.gray_100,
});

export const button = style({
  cursor: "pointer",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.gray_200,
    },
  },
});

export const postTitle = style({
  fontSize: vars.font.subTitle,
  fontWeight: vars.weight.bold,
  lineHeight: vars.lineheight.l_180,
  padding: "1rem 0rem 2rem 0",
});

export const postContent = style({
  lineHeight: vars.lineheight.l_160,
});

globalStyle(`${postContent} p:empty`, {
  height: "1.8rem",
});
globalStyle(`${postContent} p`, {
  lineHeight: vars.lineheight.l_160,
});
globalStyle(`${postContent} strong`, {
  fontWeight: vars.weight.bold,
});
export const voteWrap = style({
  // width: "8rem",
  height: "3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: vars.border.large,
  backgroundColor: vars.color.gray_100,
});
