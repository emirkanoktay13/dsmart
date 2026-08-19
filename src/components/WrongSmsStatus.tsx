import { SonucIkon } from "../style/Icon";
import { Box, Button, Typography } from "@mui/material";
import { descriptionStyle, titleStyle } from "../style/page";
import { retryButtonStyle } from "../style/buttonStyle";

function WrongSmsStatus() {
  const handleTekrarDene = () => {
    window.location.reload();
  };

  return (
    <Box sx={{ py: 3.5 }}>
      <SonucIkon tip="hata" />

      <Typography sx={titleStyle}>Sms Kodu Hatalı</Typography>

      <Typography
        sx={{
          ...descriptionStyle,
          mb: 3.5,
        }}
      >
        Girdiğiniz Kod Hatalı Lütfen Tekrar Deneyiniz.
      </Typography>

      <Button fullWidth onClick={handleTekrarDene} sx={retryButtonStyle}>
        TEKRAR DENE
      </Button>
    </Box>
  );
}

export default WrongSmsStatus;
