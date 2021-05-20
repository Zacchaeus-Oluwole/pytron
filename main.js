const { app, BrowserWindow, Menu } = require('electron')
const path = require('path');
const shell = require('electron').shell
const ipc = require('electron').ipcMain



// SET ENV. 'production' for devtools disable
process.env.NODE_ENV = 'production';

// keep a global reference of the windows object, if you don't, the window will
// be closed automatically when the Javascript object is garbage collected.
let mainWindow 

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    
    webPreferences: {
      nodeIntegration: true
    }
  })


  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file',
    slashes: true
}))


  // Open the DevTools.
/*  mainWindow.webContents.openDevTools() */
//Quit add window when the main window is quiit
  mainWindow.on('closed', function(){
    app.quit()
  })
  // Emitted when the window is closed
  mainWindow.on('closed', () => {
      //Dereference the window object, usually you woild store windows
      // in an array if your app support multi windows, this is the time
      // when you should delete the corresponding element
      mainWindow = null
  })


  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate) 
  Menu.setApplicationMenu(mainMenu);
}


function createAboutWindow () {
  // Create the browser window.
  aboutWindow = new BrowserWindow({
    frame: false,
    width: 500, height: 370,
    webPreferences: {
      nodeIntegration: true
    }
  })


  // and load the index.html of the app.
  aboutWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/about.html'),
    protocol: 'file',
    slashes: true
}))

 
  aboutWindow.on('closed', () => {
      aboutWindow = null
  })

}


const mainMenuTemplate = [
  {
    label: 'Menu',
    submenu: [
        {
          label: 'Exit',
          click(){
            app.quit()
          }
        }
      ]
    },
    {
      role: 'reload'
    },
    {
      label: 'About',
      click(){
        createAboutWindow();
      }
    }
]

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// If mac, add empty object to the menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
      label: 'Developer Tools',
      submenu:[
          {
              label: 'Toggle DevTools',
              accelerator: process.platform == 'darwin'? 'Command+I' :
              'Ctrl+I',
              click(item, focusedWindow){
                  focusedWindow.toggleDevTools();
              }
          },
          {
              role: 'reload'
          }
      ]
  });
}

ipc.on('tronpy', function(event, arg){
  tronPy()
})

ipc.on('py-btn', function(event, arg){
  pyTron()
})

function tronPy(){
  var python = require('child_process').spawn('python', ['./src/tronpy.py']);
  python.stdout.on('data',function(data){
      console.log("data: ",data.toString('utf8'));
  });
}
function pyTron(){
  var python = require('child_process').spawn('python', ['./src/pytron.py']);
  python.stdout.on('data',function(data){
      console.log("data: ",data.toString('utf8'));
  });
}