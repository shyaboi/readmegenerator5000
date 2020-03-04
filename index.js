const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const questions = [
  {
    message: "Enter your GitHub username:",
    name: "username"
  },
  {
    message: "Which Licence does your project fall under?",
    name: "licence",
    type: "list",
    choices: ['Community', 'MIT', 'GNU GPLv3']
  },
  {
    message: "What is the title of your project?",
    name:'title'
  },
  {
    message: "Write a short description of your project",
    name:'description'
  }
]

// make 
function makeHTML(lic) {
  return `) # \n${lic}\n`
}
function makeTitle(tit){
  return `# ${tit} \n![](`
}
function makeDes(des){
  return `)${des}`
}



// inquirer---------------------------------------------------------------------------------------
inquirer
// prompt----------------
  .prompt(questions)
  .then(function(ans) {
    // ans functions--------------------------------------------------------------------------------
    const { username, licence, title, description } = ans
    // query url-------------------------------------------------------------------------------------
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=1`;
    // axios get for url-----------------------------------------------------------------------------
    axios.get(queryUrl).then(function(res) {
      // map repo data------------------------------------------
      const repoNames = res.data.map(function(repo, index) {
        // console.log(res.data);
        // console.log('res.data', res.data[index].owner)
        // console.log('repo', repo.owner);
        // avatar url--------------------------------------------------------------------------------
        return repo.owner.avatar_url;

      });
      const repoNamesStr = repoNames.join("\n");

      fs.writeFile("readme.md", makeTitle(title), function (err) {
        console.log(err);
      })

      fs.appendFile("readme.md", repoNamesStr, function(err) {
        if (err) {
          throw err;
        }
      });
      fs.appendFile("readme.md", makeHTML(licence), function (err) {
        console.log(err);
      })
      fs.appendFile("readme.md", makeDes(description), function (err) {
        console.log(err);
      })
    
    }
    );
  });