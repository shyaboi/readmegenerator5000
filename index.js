const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const questions = [
  {
    message: "Enter your GitHub username:",
    name: "username"
  },
  {
    message: "What is your favorite color?",
    name: "favcolor",
    type: "list",
    choices: ['red', 'blue', 'green']
  },
  {
    message: "What is the title of your project?",
    name:'title'
  }
]

// make 
function makeHTML(color) {
  return `<p># ${color}</p>`
}
function makeTitle(tit){
  return `# ${tit} \n`
}



// inquirer---------------------------------------------------------------------------------------
inquirer
// prompt----------------
  .prompt(questions)
  .then(function(ans) {
    // ans functions--------------------------------------------------------------------------------
    const { username, favcolor, title } = ans
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
        console.log(`Saved ${repoNames.length} repos`);
      });
      fs.appendFile("readme.md", makeHTML(favcolor), function (err) {
        console.log(err);
      })
    
    }
    );
  });