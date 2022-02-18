# Getting Started with Code Learn Project

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

### `npm run build`

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## Call API

### GET /
*Get all question*

### GET /:id
*Get question {id}*

### POST /runcode

{<br />
    "questionID" : 31,<br />
    "codeData": "n = int(input())\nansnwer = 0\nfor i in range(1, n + 1):\n\tanswer += i\nprint(answer)"<br />
}

#### _Result_ 

[<br />
    {<br />
        "id": 1,<br />
        "input": "5",<br />
        "actualOutput": "",<br />
        "expectedOutput": "15",<br />
        "Message": "name 'answer' is not defined",<br />
    },<br />
    {<br />
        "id": 2,<br />
        "input": "7",<br />
        "actualOutput": "",<br />
        "expectedOutput": "28",<br />
        "Message": "name 'answer' is not defined",<br />
    }<br />
]<br />

### Deploy Heroku

heroku login
heroku create codelearnapi
heroku git:remote -a codelearnapi

psql -h hostname -d databasename -U username


