var recordedChunks = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
};

var cur = 0;
var latest_cur = 0;

function increment_cur()
{
    cur++;
    if(cur === 5) cur = 0;
}

function handle_data_available(event) {
    if (event.data.size > 0) {
      recordedChunks[cur] = [];
      recordedChunks[cur].push(event.data);
      latest_cur = cur;
      increment_cur();
    } else {
      // ...
    }
}

function latest_record() {
    return recordedChunks[latest_cur];
}

function record_stream(stream){
    var options = { mimeType: "video/webm; codecs=vp9" };
    mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = handle_data_available;
    mediaRecorder.start(5000);

    setTimeout(event => {
      mediaRecorder.stop();
      record_stream(stream);
    }, 5000);
}

module.exports = { record_stream, latest_record };