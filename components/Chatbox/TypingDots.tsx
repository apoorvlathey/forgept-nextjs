import { Box, keyframes, usePrefersReducedMotion } from "@chakra-ui/react";
import * as CSS from "csstype";

export default function TypingDots() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animation = prefersReducedMotion
    ? undefined
    : `${loadingFade} 0.6s infinite alternate`;

  return (
    <Box color="#5d5d5d">
      <Box
        style={{ ...dotStyle, animationDelay: "0s" }}
        animation={animation}
      />
      <Box
        style={{ ...dotStyle, animationDelay: "0.2s" }}
        animation={animation}
      />
      <Box
        style={{ ...dotStyle, animationDelay: "0.4s" }}
        animation={animation}
      />
    </Box>
  );
}

const loadingFade = keyframes`
  to {
    opacity: 0.2;
    transform: translateY(-5px);
  }
`;

const dotStyle = {
  width: "10px",
  height: "10px",
  borderRadius: "5px",
  backgroundColor: "#5d5d5d",
  color: "#5d5d5d",
  display: "inline-block",
  margin: "0 2px",
  animationDelay: "0s",
};
