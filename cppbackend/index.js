const express = require("express");

const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");
const { executeJava } = require("./executeJava");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/runcode", async (req, res) => {
    const { language, code } = req.body;

    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body!" });
    }
    try {
        // need to generate a c++ file with content from the request
        const filepath = await generateFile(language, code);
        // run the file and send the response
        let output;
        if (language === "cpp") {
            output = await executeCpp(filepath);
        } 
        else if (language === "py") {
            output = await executePy(filepath);
        }
        else if (language === "java") {
            output = await executeJava(filepath);
        }

        return res.json({ message: true, output});
    }
    catch (err) {
        res.status(500).json({ err })
    }

});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});
