import { Box } from "@mui/material";
import { RED } from "../utils/colors";

export function SonucIkon({
  tip,
}: {
  tip: "basarili" | "hata" | "bulunamadi";
}) {
  if (tip === "basarili") {
    return (
      <Box
        sx={{
          fontSize: 38,
          mb: 1.75,
          lineHeight: 1,
        }}
      >
        ✅
      </Box>
    );
  }

  if (tip === "bulunamadi") {
    return (
      <Box
        sx={{
          fontSize: 34,
          mb: 1.75,
          lineHeight: 1,
        }}
      >
        ⚠️
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: 58,
        height: 58,

        borderRadius: "50%",

        backgroundColor: "rgba(229,22,53,0.1)",

        color: RED,

        display: "inline-flex",

        alignItems: "center",

        justifyContent: "center",

        fontSize: 29,

        fontWeight: 700,

        mb: 2.25,
      }}
    >
      !
    </Box>
  );
}
