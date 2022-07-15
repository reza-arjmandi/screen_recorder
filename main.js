const { app, BrowserWindow, ipcMain, nativeTheme, desktopCapturer } = require('electron')
const path = require('path')

let win;
function createWindow () {
   win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // win.webContents.openDevTools();
  win.loadFile('index.html')

  ipcMain.handle('desktop-capture:toggle', () => {
    desktopCapturer.getSources({ types: ['screen'] }).then(async sources => {
        for (const source of sources) {
            win.webContents.send('SET_SOURCE', source.id)
            return
        }
      })

  })
}
  
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})