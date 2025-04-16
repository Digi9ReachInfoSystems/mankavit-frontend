const theme = {
    colors: {
      primary: "#007bfe",
     test:"#6d6e75",
     secondary: "#fdfdfd",
     grey:"#dedede",
     backgrounGrey:"#f3f3f3",
     black:"#0c0d19",
    },
    fonts: {
      body: "'DM Sans', sans-serif",
      heading: "'Montserrat', sans-serif",
      monospace: "'Source Sans 3', monospace",
      accent: "'Nunito', sans-serif",
      display: "'Outfit', sans-serif",
    },
    breakpoints: {
      mobile: "480px",
      tablet: "768px",
      desktop: "1024px",
    },
    spacing: (factor) => `${factor * 8}px`,
  };
  
  export default theme;
  