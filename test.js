const fs = require("fs");
const http = require("http");

const aBuffer = fs.readFileSync("audio.wav");

http
  .request(
    {
      hostname: "localhost",
      port: 28346,
      path: "/?beam_width=500&num_results=1&extended=true",
      method: "POST",
    },
    (res) => {
      let bufferList = [];
      res.on("data", (chunk) => {
        bufferList.push(chunk);
      });

      res.on("end", () => {
        const metadata = JSON.parse(Buffer.concat(bufferList).toString());
        console.log(JSON.stringify(metadata));
      });
    }
  )
  .end(aBuffer);
