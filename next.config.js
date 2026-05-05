const withPWA = require("next-pwa")({
  dest: "public",
});


<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#000000" />

module.exports = withPWA({});