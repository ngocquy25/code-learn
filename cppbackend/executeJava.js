const { exec } = require("child_process");

const executeJava = (filepath) => {
  return new Promise((resolve, reject) => {
    exec(
      `java ${filepath}`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeJava,
};

// Test:
// 
// {
//   "language": "java",
//   "code": "class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println(\"Hello, World!\"); \n\t}\n}"
// }