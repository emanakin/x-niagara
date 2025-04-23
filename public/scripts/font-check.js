// Font loading check script
document.addEventListener("DOMContentLoaded", function () {
  const bodyFont = window.getComputedStyle(document.body).fontFamily;
  console.log("Current body font:", bodyFont);

  // Check if Poppins is in the computed font stack
  if (bodyFont.includes("Poppins")) {
    console.log("Poppins font is loaded correctly");
  } else {
    console.warn("Poppins font is NOT loaded, using fallback:", bodyFont);
  }
});
