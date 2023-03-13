console.log('hi from inject.js');
const containers = document.querySelectorAll('.container');
let tables = []

containers.forEach((container) => {
    let title = container.querySelector('h4');
    if(title){
        if(title.textContent == '學期成績'){
            let tmp = container.querySelectorAll('table');
            tmp.forEach((table) => {
                tables.push(table.outerHTML);
            })
        }
    }
})


chrome.runtime.sendMessage({tables: tables}, function(response) {
    console.log(response);
});