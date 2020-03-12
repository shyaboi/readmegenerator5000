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
    choices: ["Community", "MIT", "GNU GPLv3"]
  },
  {
    message: "What is the title of your project?",
    name: "title"
  },
  {
    message: "Write a short description of your project",
    name: "description"
  },
  {
    message:'How many install steps are there?',
    type:"list",
    name:'install',
    choices: ["1", 
    "2 or mor"
  ]
  }
];
const secondQs = [
  {
    message:'And Then.......?',
    name:'installNum'
  }
]
// make
function makeHTML(lic) {
  return `--- \n # ${lic}licence\n ---`;
}
function makeTitle(tit) {
  return `# ${tit}\n`;
}
function makeDes(des) {
  return `--- \n # Description \n${des} \n---`;
}

function h2(stuf){
  return `\n# Installation:\n`;
}
function andThen(secondAns){
  return `\n* ${secondAns}`;

}
var url =''
var alt = 'oof'
// console.log(url);

function addPhoto(alt, url) {
  return `\n![${alt}](${url})\n`;
}
// console.log(url);
// inquirer---------------------------------------------------------------------------------------
inquirer
  // prompt----------------
  .prompt(questions)
  .then(function(ans) {
    // ans functions--------------------------------------------------------------------------------
    const { username, licence, title, description, install } = ans;

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
      var url = repo.owner.avatar_url;
      // console.log(url);
        return url
      });
      const url = repoNames.join("\n");
      const newTitle = makeTitle(title)
      const newIns = h2(install)
      // const newIns = h2(install)
      if (install==="2 or mor") {
        inquirer
        .prompt(secondQs)
        // .prompt(secondQs)
        .then(function(ans2){
          const { installNum } = ans2;
          const anDen = andThen(installNum)
          fs.appendFile("readme.md", newIns, function(err) {
            // console.log(err);
              fs.appendFile("readme.md", anDen, function(err) {
              });
            // console.log(stuf);
          });
          if (installNum!="") {
            inquirer
            .prompt(secondQs)
            .then(function(ans3){
              const { installNum } = ans3;
              const anDen = andThen(installNum)
              fs.appendFile("readme.md", anDen, function(err) {
              });
              if (installNum!="") {
                inquirer
                .prompt(secondQs)
                .then(function(ans4){
                  const { installNum } = ans4;
                  const anDen = andThen(installNum)
                  fs.appendFile("readme.md", anDen, function(err) {
                  });
                  if (installNum!="") {
                    inquirer
                    .prompt(secondQs)
                    .then(function(ans5){
                      const { installNum } = ans5;
                      const anDen = andThen(installNum)
                      fs.appendFile("readme.md", anDen, function(err) {
                      });
                      if (installNum!="") {
                        inquirer
                        .prompt(secondQs)
                        .then(function(ans7){
                          const { installNum } = ans7;
                          const anDen = andThen(installNum)
                          fs.appendFile("readme.md", anDen, function(err) {
                          });
                          if (installNum!="") {
                            inquirer
                            .prompt(secondQs)
                            .then(function(ans8){
                              const { installNum } = ans8;
                              const anDen = andThen(installNum)
                              fs.appendFile("readme.md", anDen, function(err) {
                              });
                              if (installNum!="") {
                                inquirer
                                .prompt(secondQs)
                                .then(function(ans9){
                                  const { installNum } = ans9;
                                  const anDen = andThen(installNum)
                                  fs.appendFile("readme.md", anDen, function(err) {
                                  });
                                  if (installNum!="") {
                                    inquirer
                                    .prompt(secondQs)
                                    .then(function(ans10){
                                      const { installNum } = ans10;
                                      const anDen = andThen(installNum)
                                      fs.appendFile("readme.md", anDen, function(err) {
                                      });
                                      if (installNum!="") {
                                        inquirer
                                        .prompt(secondQs)
                                        .then(function(ans11){
                                          const { installNum } = ans11;
                                          const anDen = andThen(installNum)
                                          fs.appendFile("readme.md", anDen, function(err) {
                                          });
                                        })  
                                      }
                                    })  
                                  }
                                })  
                              }
                            })  
                          }
                        })  
                      }
                    })  
                  }
                })  
              }
            })  
          }
           else {
            
            console.log("things are happening");
          }
        
        })
        // throw err;
      }
      fs.writeFile("readme.md", newTitle, function(err) {
        // console.log(err);
        fs.appendFile("readme.md", addPhoto(alt,url), function(err) {
          // console.log(url);
          fs.appendFile("readme.md", makeHTML(licence), function(err) {
            // console.log(err);
          });
              fs.appendFile("readme.md", makeDes(description), function(err) {
                // console.log(err);
              });
            });
      });

    });
  });

// const template = `
// # ${title}


// ![image](${imageUrl})
