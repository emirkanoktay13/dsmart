import { Box, Typography } from "@mui/material";
import { SonucIkon } from "../style/Icon";
import { descriptionStyle, titleStyle } from "../style/page";

function SuccesStatus() {
  return (
    <Box sx={{ py: 3.5 }}>
      <SonucIkon tip="basarili" />

      <Typography sx={titleStyle}>İşlem Başarılı</Typography>

      <Typography sx={descriptionStyle}>
        Doğrulamanız tamamlandı, işleminiz onaylandı.
      </Typography>
    </Box>
  );
}

export default SuccesStatus;
