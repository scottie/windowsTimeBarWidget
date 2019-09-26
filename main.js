// 🦄 🎏
const electron = require('electron');
var io = require('socket.io').listen(8899); 
const { app, BrowserWindow } = electron
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Grab display's dimensions
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  // lets get 10% of height
  var percent = 8;
  var tenPercentOfHeight = Math.trunc((height * percent) / 100); //not really 10% anymore tweaked a bit 
  console.log(tenPercentOfHeight);
  // Create the browser window. 
  // Now our gui is dymanic to the monitor display
  win = new BrowserWindow({
    x: 0, // Put gui to top of display
    y:0, // Put gui to top of display
    alwaysOnTop: true, // Insure gui window is always on top
    frame: false, // This removes the menubar but also the buttons for close and title bar
    resizable:false,// Disable ability to resize window
    closable: true, // Allow window to be closed
    width: width,
    height: tenPercentOfHeight,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  //win.setMenu(null); //This removes the menubar but keeps close buttons and title bar
  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

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
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

io.sockets.on('connection', function (socket) {// WebSocket Connection  
 
    socket.on('close-button', function(data) { //get close button event
      console.log("Cya Mate !!");  
      win.close(); //close window
      app.quit();  //close app
    }); 

    //https://www.ibm.com/support/knowledgecenter/en/SSAW57_8.5.5/com.ibm.websphere.nd.multiplatform.doc/ae/rrun_svr_timezones.html
    socket.on('getTime', function(count) { //get close button event
      if(count){
        var localtz = Intl.DateTimeFormat().resolvedOptions().timeZone        
        socket.emit('Local', new Date().toLocaleString("en-US", {timeZone: localtz})); //
        socket.emit('Romaina', new Date().toLocaleString("en-US", {timeZone: "Europe/Bucharest"})); //
        socket.emit('Nigeria', new Date().toLocaleString("en-US", {timeZone: "Africa/Lagos"})); //
        socket.emit('Newyork', new Date().toLocaleString("en-US", {timeZone: "America/New_York"})); //

        socket.emit('LocalNightDay', (new Date().toLocaleString("en-US", {timeZone: localtz}).split(" ")[2] == "AM") ? "🌙" : "☀️"); //
        socket.emit('RomainaNightDay', (new Date().toLocaleString("en-US", {timeZone: "Europe/Bucharest"}).split(" ")[2] == "AM") ? "🌙" : "☀️"); //
        socket.emit('NigeriaNightDay', (new Date().toLocaleString("en-US", {timeZone: "Africa/Lagos"}).split(" ")[2] == "AM") ? "🌙" : "☀️"); //
        socket.emit('NewyorkNightDay', (new Date().toLocaleString("en-US", {timeZone: "America/New_York"}).split(" ")[2] == "AM") ? "🌙" : "☀️"); //

      }
    });  
});