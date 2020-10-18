const FontFaceObserver = require("fontfaceobserver");

const Fonts = () => {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap";
  link.rel = "stylesheet";

  document.head.appendChild(link);

  const lato = new FontFaceObserver("Lato");

  lato.load().then(() => {
    document.documentElement.classList.add("lato");
  });
};

export default Fonts;
