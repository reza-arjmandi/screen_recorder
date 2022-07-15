const { contextBridge, ipcRenderer } = require('electron')
const handle_stream = require('./handle_stream')
const download_record = require('./download_record')
const { latest_record } = require('./record_stream')

contextBridge.exposeInMainWorld('memnto', {
  toggle: () => ipcRenderer.invoke('desktop-capture:toggle'),
  event: () => download_record(latest_record()),
})

ipcRenderer.on('SET_SOURCE', async (event, sourceId) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sourceId,
          minWidth: 1280,
          maxWidth: 1280,
          minHeight: 720,
          maxHeight: 720
        }
      }
    })
    handle_stream(stream)
  } catch (e) {
    handleError(e)
  }
}) 

function handleError (e) {
  console.log(e)
}