const smartgrid = require('smart-grid');
/* It's principal settings in smart grid project */
const settings = {
  outputStyle: "scss" /* less || scss || sass || styl */,
  columns: 12 /* number of grid columns */,
  offset: "10px" /* gutter width px || % || rem */,
  mobileFirst: true /* mobileFirst ? 'min-width' : 'max-width' */,
  container: {
    maxWidth: "1220px",
    fields: "20px" /* side fields */,
  },
  breakPoints: {
    sm: {
      width: "576px",
    },
    md: {
      width: "768px",
    },
    lg: {
      width: "992px",
    },
    xl: {
      width: "1200px",
    },
    xxl: {
      width: "1400px",
    }
  },
};

smartgrid("./source/scss/adjustment", settings);
