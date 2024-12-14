let availableKeywords = [
    'pwd', 
    'ls', 
    'cd',
    'cat',
    'echo',
    'clear',
    'help',
    'mkdir',
    'rmdir',
    'mv',
    'cp',
    'touch',
    'rm',
    'find',
    'grep',
    'wc',
    'sort',
    'uniq',
    'cut',
    'head',
    'tail',
    'sed',
    'awk',
    'diff',
    'top',
    'ps',
    'kill',
];

const resultBox = document.querySelector('.result-box');
const inputBox = document.getElementById('input-box');

inputBox.onkeyup = function() {
    let result = [];
    let input = inputBox.value; 
    if (input.lenght) {
        result= availableKeywords.filter((item) => {
            return item.includes(input);
        });
    }
}