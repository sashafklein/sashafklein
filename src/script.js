const fs = require("fs");
const request = require("request");

const images = [];

const files = fs.readdirSync("src/redux/data/markdown/portfolio");
files.forEach(fileName => {
  const file = fs.readFileSync(`src/redux/data/markdown/portfolio/${fileName}`);
  const regex = /\(([^)]+)\)/g;
  const finds = (file.toString().match(regex) || []).filter(s =>
    s.includes("dl.dropbox")
  );

  finds.forEach(s => images.push(s.replace(/[(|)]/g, "")));
});

const download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);

    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on("close", callback);
  });
};

images.forEach(imageName => {
  const name = imageName
    .split("/")
    [imageName.split("/").length - 1].split("?")[0];
  download(imageName, name, () => console.log("NAME", name));
});
