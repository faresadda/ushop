import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    if (!window.googleTranslateLoaded) {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            includedLanguages: "en,fr,ar", // تحديد اللغات المطلوبة فقط
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      };
      window.googleTranslateLoaded = true;
    }
  }, []);

  return (
    <div id="google_translate_element"></div>
  );
};

export default GoogleTranslate;

