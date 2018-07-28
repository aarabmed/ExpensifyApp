//import electronGoogleOauth from 'electron-google-oauth';

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
var uuid = require('uuid');

const url = require('url');

// Module to control application life.
// Module to create native browser window.
const path = require('path');
const fs = require('fs');
const os = require('os');
const ipc = electron.ipcMain;
const shell = electron.shell;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let workerWindow;


/** This function will create the mainWindow */
function createWindow() {

  // Create the browser window.
  mainWindow = new BrowserWindow({ 
    titleBarStyle: 'hidden',
    width: 1000,
    height: 780,
    minHeight:700,
    minWidth: 1000,
    show: false,
    icon:path.join(__dirname,'./src/assets/icons/icon.ico'),
   });

  // and load the index.html of the app.
  //mainWindow.loadURL('http://localhost:3000/public/index.html');
  mainWindow.loadURL(`file://${__dirname}/public/index.html`);

  ////////////////////////////////////////// Invisible Window //////////
  workerWindow = new BrowserWindow({show:false});
    workerWindow.loadURL(`file://${__dirname}/worker.html`);
    workerWindow.hide();
    //workerWindow.webContents.openDevTools();
    workerWindow.on("closed", () => {
        workerWindow = undefined;
    });

  ///////////////////////////////////////////////////////////////


 
  if (process.env.NODE_ENV === 'development') {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer'); // eslint-disable-line
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));

    installExtension(REDUX_DEVTOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));
  }


  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
   // mainWindow.webContents.openDevTools();
  })

//////////////////////////////////////////////////////////////////////////////////////////////
}

ipc.on("printPDF",(event, content) => {
	workerWindow.webContents.send("printPDF", content);
});


// when worker window is ready
ipc.on("readyToPrintPDF", (event) => {
  const pdfPath = path.join(os.tmpdir(), `print${uuid().slice(0,4)}.pdf`);
  // Use default printing options
  workerWindow.webContents.printToPDF({}, function (error, data) {
      if (error) throw error
      fs.writeFile(pdfPath, data, function (error) {
          if (error) {
              throw error
          }
          shell.openItem(pdfPath)
          event.sender.send('wrote-pdf', pdfPath)
    
      })
  })

});
///////////////////////////////////////////////////////
ipc.on('print-to-pdf', function(event){
  const pdfPath = path.join(os.tmpdir(),'print.pdf');
  const win = BrowserWindow.fromWebContents(event.sender);
  win.webContents.printToPDF({},function(error,data){
    if(error) return console.log(error.message)
    fs.writeFile(pdfPath,data, function(err){
      if(err)return console.log(err.message);
      shell.openExternal('file://'+pdfPath);
      event.sender.send('wrote-pdf',pdfPath)
    })
  })
})
///////////////////////////////////////////////////////


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

