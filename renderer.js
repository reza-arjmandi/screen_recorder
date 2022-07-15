  
  document.getElementById('desktop-run-btn').addEventListener('click', async () => {
    await window.memnto.toggle()
  })
    
  document.getElementById('desktop-event-btn').addEventListener('click', async () => {
    await window.memnto.event()
  })