import { Box, Typography } from "@mui/material";
import { SonucIkon } from "../style/Icon";
import { descriptionStyle, titleStyle } from "../style/page";

function RequestNotFound() {
  return (
    <Box sx={{ py: 3.5 }}>
      <SonucIkon tip="bulunamadi" />

      <Typography sx={titleStyle}>Kaydınız Bulunamadı!</Typography>

      <Typography sx={descriptionStyle}>
        Kaydınız bulunamadı. Lütfen daha sonra tekrar deneyiniz.
      </Typography>
    </Box>
  );
}

export default RequestNotFound;
