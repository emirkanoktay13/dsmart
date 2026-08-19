import { SonucIkon } from "../style/Icon";
import { Box, Typography } from "@mui/material";
import { descriptionStyle, titleStyle } from "../style/page";

function TimeFinishedStatus() {
  return (
    <Box sx={{ py: 3.5 }}>
      <SonucIkon tip="hata" />

      <Typography sx={titleStyle}>Süre Doldu!</Typography>

      <Typography sx={descriptionStyle}>
        Doğrulama Süresi Doldu. Lütfen Tekrar İşlem Sağlayınız.
      </Typography>
    </Box>
  );
}

export default TimeFinishedStatus;
