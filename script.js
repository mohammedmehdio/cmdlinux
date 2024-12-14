let availableKeywords = [
    'pwd', 'ls', 'cd', 'mkdir', 'rmdir', 'rm', 'cp', 'mv', 'touch', 'cat', 
    'find', 'locate', 'grep', 'awk', 'sed', 'cut', 'ps', 'top', 'htop', 'kill', 
    'jobs', 'nice', 'df', 'du', 'free', 'uptime', 'ping', 'ifconfig', 'ip', 'wget', 
    'curl', 'useradd', 'usermod', 'passwd', 'groups', 'su'
];

// Mapping commands to their directories
let commandDirectories = {
    'pwd': 'FDO1', 'ls': 'FDO1', 'cd': 'FDO1', 'mkdir': 'FDO1', 'rmdir': 'FDO1',
    'rm': 'FDO1', 'cp': 'FDO1', 'mv': 'FDO1', 'touch': 'FDO1', 'cat': 'FDO1',
    'find': 'FSTP2', 'locate': 'FSTP2', 'grep': 'FSTP2', 'awk': 'FSTP2', 'sed': 'FSTP2',
    'cut': 'FSTP2', 'ps': 'PM3', 'top': 'PM3', 'htop': 'PM3', 'kill': 'PM3',
    'jobs': 'PM3', 'nice': 'PM3', 'df': 'SM4', 'du': 'SM4', 'free': 'SM4', 'uptime': 'SM4',
    'ping': 'NM5', 'ifconfig': 'NM5', 'ip': 'NM5', 'wget': 'NM5', 'curl': 'NM5',
    'useradd': 'UGM6', 'usermod': 'UGM6', 'passwd': 'UGM6', 'groups': 'UGM6', 'su': 'UGM6'
};

const resultBox = document.querySelector('.result-box');
const inputBox = document.getElementById('input-box');
let currentIndex = -1;  // Keeps track of the currently selected suggestion

// Automatically focus on the search bar when the page loads
window.onload = function() {
    inputBox.focus();
};

// Event listener to show suggestions
inputBox.onkeyup = function(event) {
    let result = [];
    let input = inputBox.value.trim();
    
    if (input.length > 0) {
        result = availableKeywords.filter((item) => {
            return item.toLowerCase().startsWith(input.toLowerCase());
        });
    }

    // Clear previous results
    resultBox.innerHTML = '';

    // Show filtered results
    result.forEach((item, index) => {
        let div = document.createElement('div');
        div.classList.add('result-item');
        div.textContent = item;
        resultBox.appendChild(div);
        
        // Add click event to each result item
        div.onclick = function() {
            navigateToCommand(item);
        };

        // Highlight the current selection using arrow keys
        div.onmouseover = function() {
            currentIndex = index;
            highlightCurrentSelection();
        };
    });

    // Handle the "Enter" key event to redirect to the command's page
    if (event.key === 'Enter' && result.length > 0) {
        navigateToCommand(result[currentIndex === -1 ? 0 : currentIndex]);
    }

    // Arrow key navigation
    if (event.key === 'ArrowDown') {
        if (currentIndex < result.length - 1) {
            currentIndex++;
            highlightCurrentSelection();
        }
    } else if (event.key === 'ArrowUp') {
        if (currentIndex > 0) {
            currentIndex--;
            highlightCurrentSelection();
        }
    }
};

// Navigate to the command page
function navigateToCommand(command) {
    let directory = commandDirectories[command];
    window.location.href = `${directory}/${command}/index.html`;  // Redirect to the command's page
}

// Highlight the selected suggestion
function highlightCurrentSelection() {
    let items = document.querySelectorAll('.result-item');
    items.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('highlighted');
        } else {
            item.classList.remove('highlighted');
        }
    });
}

// Hide suggestions when clicking outside of the search box
document.addEventListener('click', function(event) {
    if (!event.target.closest('.search-box')) {
        resultBox.innerHTML = '';
    }
});

// Show suggestions again when clicking in the search bar
inputBox.addEventListener('click', function() {
    if (inputBox.value.trim() !== '') {
        let input = inputBox.value.trim();
        let result = availableKeywords.filter((item) => {
            return item.toLowerCase().startsWith(input.toLowerCase());
        });

        resultBox.innerHTML = '';
        result.forEach((item, index) => {
            let div = document.createElement('div');
            div.classList.add('result-item');
            div.textContent = item;
            resultBox.appendChild(div);

            div.onclick = function() {
                navigateToCommand(item);
            };

            div.onmouseover = function() {
                currentIndex = index;
                highlightCurrentSelection();
            };
        });
    }
});
