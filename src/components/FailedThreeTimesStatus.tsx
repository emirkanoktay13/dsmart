import { SonucIkon } from "../style/Icon";
import { Box, Button, Typography } from "@mui/material";
import { descriptionStyle, titleStyle } from "../style/page";
import { retryButtonStyle } from "../style/buttonStyle";

function FailedThreeTimesStatus() {
  const handleTekrarDene = () => {
    window.location.reload();
  };

  return (
      <Box sx={{ py: 3.5 }}>
        <SonucIkon tip="hata" />

        <Typography sx={titleStyle}>İşlem Başarısız</Typography>

        <Typography
          sx={{
            ...descriptionStyle,
            mb: 3.5,
          }}
        >
          İşleminiz, çok fazla hatalı kod girişi yapıldığı için başarısız
          olmuştur. Lütfen bir süre bekleyip tekrar deneyiniz.
        </Typography>

        <Button fullWidth onClick={handleTekrarDene} sx={retryButtonStyle}>
          TEKRAR DENE
        </Button>
      </Box>
  );
}

export default FailedThreeTimesStatus;
