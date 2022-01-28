const express = require('express')
const app = express()

//set up
app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

// getQuestionList
app.get("/", async (req, res) => {
    try {
        const question = await pool.query('SELECT * FROM problem');
        res.status(200).json(question.rows);
    } catch(error) {
        res.status(500).send(error);
    }
})

// getQuestion
app.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const question_id = await pool.query('SELECT * FROM problem WHERE question_id = $1', [id]);
        res.status(200).json(question_id.rows);
    } catch(error) {
        res.status(500).send(error);
    }
})

// run code
const axios = require('axios')
app.post("/runcode", async (req, res) => {
    try {
        const codeData = req.body.codeData;
        const questionID = req.body.questionID;

        let input = [], expectedOutput = [];
        let questionDetail = await pool.query('SELECT * FROM problem WHERE question_id = $1', [questionID]);
        questionDetail = questionDetail.rows[0];
        input.push(questionDetail["testcase_input_1"]);
        input.push(questionDetail["testcase_input_2"]);
        expectedOutput.push(questionDetail["testcase_output_1"]);
        expectedOutput.push(questionDetail["testcase_output_2"]);

        let originInput = input //input in string
        let numParam = originInput[0].split(",").length
        input = [];

        originInput.forEach(element => {
            let count = element.split(",")
            input.push(count)
        });

        let output = [];
        let actualOutput = "", actualMessage = "";

        for (let i = 0; i < 2; i++) {
            let codeNewData = codeData
            for (let j = 0; j < numParam; j++) {
                if (codeNewData.includes("input()")) {
                    if (typeof input[i][j] !== 'string') codeNewData = codeNewData.replace("input()", input[i][j]);
                    else codeNewData = codeNewData.replace("input()", '\"' + input[i][j] + '\"')
                }
                else break;
            }
            // call api python compiler
            let postData = JSON.stringify({ "code": codeNewData});
            postData = JSON.parse(postData)
            await axios.post('https://pythoncompiler9.herokuapp.com/python/', postData)
            .then(response => {
                if (response.data["message"] == "Success") actualOutput = response.data["output"];
                else actualMessage = response.data["output"];
            })
            .catch(error => {
                res.status(500).send(error);
            })
            actualOutput = actualOutput.slice(0, -1)
            // if (actualOutput === expectedOutput[i]) actualMessage = "Right answer"
            if (actualOutput === expectedOutput[i].split('\\n').join('\n')) actualMessage = "Right answer"  
            else if (actualMessage === "") actualMessage = "Wrong answer"
            // save
            let outputSmall = await JSON.stringify({ 
                "id":  i + 1,
                "input": originInput[i],
                "actualOutput": actualOutput,
                "expectedOutput": expectedOutput[i],
                "Message": actualMessage,
                "LeeKimMinSoCool": codeNewData,
            });

            outputSmall = JSON.parse(outputSmall)
            output.push(outputSmall)
        }

        res.status(200).send(output);
    } catch (err) {
        console.log(err);
    }
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});  