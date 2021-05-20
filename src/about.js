const electron = require('electron');
const path = require('path');
const remote = electron.remote;

const closeBtn = document.getElementById('cancel')

closeBtn.addEventListener('click', function(){
    var window = remote.getCurrentWindow();
    window.close()
})