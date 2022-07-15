const { record_stream } = require('./record_stream')

function handle_stream(stream) {
    const videoTrack = stream.getVideoTracks()[0];
    const trackProcessor = new MediaStreamTrackProcessor({ track: videoTrack });
    const trackGenerator = new MediaStreamTrackGenerator({ kind: 'video' });

    const transformer = new TransformStream({
      async transform(videoFrame, controller) {
        // const barcodes = await detectBarcodes(videoFrame);
        // const newFrame = highlightBarcodes(videoFrame, barcodes);
        // videoFrame.close();
        controller.enqueue(videoFrame);
      },
    });

    trackProcessor.readable.pipeThrough(transformer).pipeTo(trackGenerator.writable);
    // const video = document.querySelector('video')
    const new_stream = new MediaStream([trackGenerator]);
    // video.srcObject = new_stream
    // video.onloadedmetadata = (e) => video.play()
    record_stream(new_stream)
}

module.exports = handle_stream;