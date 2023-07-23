const http = require("http");
const Ds = require("deepspeech");
const model = new Ds.Model("deepspeech.pbmm");

const validBeamWidth = (aBeamWidth) =>
  typeof aBeamWidth === "number" && aBeamWidth !== NaN && aBeamWidth > 0;

const validNumResults = (aNumResults) =>
  typeof aNumResults === "number" && aNumResults !== NaN && aNumResults > 0;

http
  .createServer((req, res) => {
    if (req.method === "POST") {
      const query = new URL(req.url, `http://${req.headers.host}`).searchParams;

      const aBeamWidth = parseInt(query.get("beam_width"));
      const aNumResults = parseInt(query.get("num_results"));
      const extended = query.get("extended") === "true";

      model.setBeamWidth(validBeamWidth(aBeamWidth) ? aBeamWidth : 500);

      let bufferList = [];
      req.on("data", (chunk) => {
        bufferList.push(chunk);
      });

      req.on("end", () => {
        const aBuffer = Buffer.concat(bufferList);

        if (extended) {
          const metadata = model.sttWithMetadata(
            aBuffer,
            validNumResults(aNumResults) ? aNumResults : 1
          );

          res.end(JSON.stringify(metadata));
          Ds.FreeMetadata(metadata);
        } else {
          const result = model.stt(aBuffer);
          res.end(result);
        }
      });
    }
  })
  .listen(28346);
