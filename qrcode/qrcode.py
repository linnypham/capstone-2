import segno

qrcode = segno.make_qr("http://192.168.1.171:8501")
qrcode.save(
    "pypanther.png",
    scale=5,
    dark="blue",
)