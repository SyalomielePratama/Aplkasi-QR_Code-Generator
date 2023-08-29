document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generate");
    const resetButton = document.getElementById("reset");
    const textInput = document.getElementById("text");
    const downloadButton = document.getElementById("download");
    const qrcodeDiv = document.getElementById("qrcode");
    const qrcodeWrapper = document.querySelector(".qrcode-wrapper");
    let qrcodeInstance = null;

    generateButton.addEventListener("click", function () {
      const textInput = document.getElementById("text");
      const text = textInput.value;

      if (text.trim() === "") {
        alert("text atau link tidak ditemukan");
        return;
      }

      if (qrcodeInstance) {
        qrcodeInstance.clear(); // Clear previous QR Code if exists
      }

      textInput.value = "";
      qrcodeDiv.innerHTML = "";
      qrcodeInstance = new QRCode(qrcodeDiv, {
        text: text,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });

      resetButton.style.display = "block";
      downloadButton.style.display = "block";
      qrcodeWrapper.classList.add("qrcode-visible");
    });

    textInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          generateButton.click(); 
          event.preventDefault(); 
        }
      });

    resetButton.addEventListener("click", function () {
      qrcodeDiv.innerHTML = "";
      qrcodeInstance = null;
      document.getElementById("text").value = "";
      resetButton.style.display = "none";
      downloadButton.style.display = "none";
      qrcodeWrapper.classList.remove("qrcode-visible");
    });

    downloadButton.addEventListener("click", function () {
      if (!qrcodeInstance) {
        alert("Tidak ada Qr Code untuk di download");
        return;
      }

      const canvas = qrcodeDiv.querySelector("canvas");
      const imageDataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageDataURL;
      link.download = "qrcode.png";
      link.click();
    });
  });