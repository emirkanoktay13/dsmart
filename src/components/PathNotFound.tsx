import { Box, Typography } from "@mui/material";
import { SonucIkon } from "../style/Icon";
import { descriptionStyle, titleStyle } from "../style/page";

function PathNotFound() {
  return (
    <Box sx={{ py: 3.5 }}>
      <SonucIkon tip="bulunamadi" />

      <Typography sx={titleStyle}>İlgili Yol Bulunamadı!</Typography>

      <Typography sx={descriptionStyle}>
        İlgili yol bulunamadı. Lütfen daha sonra tekrar deneyiniz.
      </Typography>
    </Box>
  );
}

export default PathNotFound;
