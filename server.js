
const http = require("http");

const PORT = process.env.PORT || 7000;

const manifest = {
  id: "community.custom.movies",
  version: "1.0.0",
  name: "My Movies & TV",
  description: "Custom movie and television addon",
  resources: ["stream"],
  types: ["movie", "series"],
  idPrefixes: ["tt"]
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  const path = decodeURIComponent(req.url.split("?")[0]);

  if (path === "/manifest.json") {
    return res.end(JSON.stringify(manifest));
  }

  if (
    path.startsWith("/stream/movie/") ||
    path.startsWith("/stream/series/")
  ) {
    return res.end(JSON.stringify({ streams: [] }));
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("Stremio addon running on port " + PORT);
});
