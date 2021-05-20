const electron = require('electron');
const path = require('path');
const remote = electron.remote;
const ipc = electron.ipcRenderer

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function(){
    var window = remote.getCurrentWindow();
    window.close()
})


const tronpyBtn = document.getElementById('tronpyBtn')

tronpyBtn.addEventListener('click', function(){
    ipc.send('tronpy')

    var window = remote.getCurrentWindow();
    window.close()
})