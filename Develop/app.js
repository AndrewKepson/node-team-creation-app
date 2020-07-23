const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");
const teamMembers = [];

const employeeType = [
    { type: 'list', name: 'employeeType', message: 'What type of employee would you like to add?', choices: ["Engineer","Intern","None"] }
]

const managerQuestions = [
    { type: 'input', name: 'name', message: 'What is your name?' }, 
    { type: 'input', name: 'email', message: 'What is your email?' }, 
    { type: 'input', name: 'id', message: 'What is your ID?' }, 
    { type:'input', name: 'officeNumber', message: 'What is your office number?'}
]

const engineerQuestions = [
    { type: 'input', name: 'name', message: 'What is your name?' }, 
    { type: 'input', name: 'email', message: 'What is your email?' }, 
    { type: 'input', name: 'id', message: 'What is your ID?' }, 
    { type: 'input', name: 'githubUser', message: 'What is your GitHub username?' }
]

const internQuestions = [
    { type: 'input', name: 'name', message: 'What is your name?' }, 
    { type: 'input', name: 'email', message: 'What is your email?' }, 
    { type: 'input', name: 'id', message: 'What is your ID?' }, 
    { type: 'input', name: 'schoolName', message: 'What school do you attend?' }
]

const createManager = () => {
    inquirer.prompt(managerQuestions) 
    .then(response => {
        const manager = new Manager(response.name, response.email, response.id, response.officeNumber)
        teamMembers.push(manager)
        createTeam();
        //Call create team function
    })
}

const createEngineer = () => {
    inquirer.prompt(engineerQuestions)
    .then(response => {
        const engineer = new Engineer(response.name, response.email, response.id, response.githubUser)
        teamMembers.push(engineer)
        createTeam();
    });

}
const createIntern = () => {
    inquirer.prompt(internQuestions)
    .then(response => {
        const intern = new Intern(response.name, response.email, response.id, response.schoolName)
        teamMembers.push(intern)
        createTeam();
    });

}

function createTeam() {
    inquirer.prompt(employeeType)
    .then(response => {
        switch(response.employeeType) {
            case "Engineer":
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            default:
                buildTeam();
                break;
        }
    })
}

function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
}

createManager();
