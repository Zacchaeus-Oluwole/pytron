const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')

notifyBtn.addEventListener('click', createAddWindow)

function createAddWindow(){
    const modalPath = path.join('file://', __dirname, 'add.html')
    let addWindow = new BrowserWindow({
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        width:400,
        height:200,
        webPreferences:{
            nodeIntegration: true
        }
    })
    addWindow.on('close', function(){addWindow= null})
    addWindow.loadURL(modalPath)
    addWindow.show()
}

const pyBtn = document.getElementById('pyBtn')
pyBtn.addEventListener('click', function(){
    ipc.send('py-btn')
})

