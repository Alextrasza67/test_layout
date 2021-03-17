<template>
  <div class="main">
      <div class="window">
        <video id="localVideo" autoplay playsinline muted></video>
        <div class="mask"></div>
      </div>
      <div>
        测试测试测试测试测试测试测试测试测试测试测试测试
      </div>
      <div>
        <button id="recordBtn" @click="recordVideo" class="recordBtn">record</button>
      </div>
      <div>
        {{recordMemo}}
      </div>
  </div>
</template>

<script>
  import RecordRTC from 'recordrtc'
  import Recorder from 'js-audio-recorder'
  // import MediaStreamRecorder from 'recordrtc'
  // import WebAssemblyRecorder from 'recordrtc'
  // import StereoAudioRecorder from 'recordrtc'
  export default {
    name: "aliveCheck",
    data() {
      return {
        recordMemo:'',
        localStream: null,
        audioContext: null,
        buff: null,
        blob: null,
      }
    },
    created() {
      this.initMedia()
    },
    methods:{
      initMedia(){
        const mediaStreamConstraints = {
          video: true,
          audio: true,
        };
        var _this = this;
        navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
          .then(function (mediaStream) {
            document.getElementById("localVideo").srcObject = mediaStream;
            console.log('Received local stream.', mediaStream);
            _this.localStream = mediaStream;
          }).catch(function(error) {
            console.log(`navigator.getUserMedia error: ${error.toString()}.`);
          });
        console.log('Requesting local stream.');

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext;
      },
      recordVideo(){
        this.buffer = [];
        //init video record
        let record = RecordRTC(this.localStream, {
          type: 'gif',
        });
        //init audio record
        let recorder = new Recorder({
          sampleBits: 16,                 // 采样位数，支持 8 或 16，默认是16
          sampleRate: 16000,              // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
          numChannels: 1,                 // 声道，支持 1 或 2， 默认是1
          // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
        });

        //start record
        record.startRecording();
        recorder.start()

        var _this = this;
        let count = 5;
        let timer = setInterval(function () {
          _this.recordMemo = '录制剩余时间'+count+'秒'
          if(count<=0){
            clearInterval(timer);
            _this.recordMemo = '正在保存视频'
            record.stopRecording(function() {
              // _this.saveRecordVideo(record.getBlob())
              _this.saveVideoAndAudit(record, recorder);
            });
            // recorder.stop()
            // recorder.getWAV()
            _this.recordMemo = ''
          }
          count--;
        },1000);
      },
      saveRecordVideo(blob){
        // var blob = new Blob(this.buffer, {type: 'video/webm;codecs=vp8'});
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        //文件名 通过方法传进来 检测是否合法？
        a.download = 'test.mp4';
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);
      },
      saveVideoAndAudit(record, recorder){
        var workerPath = 'https://archive.org/download/ffmpeg_asm/ffmpeg_asm.js';
        var vab;
        var aab;
        var buffersReady;
        var workerReady;
        var posted = false;
        var worker;
        var _this = this;

        var fileReader1 = new FileReader();
        fileReader1.onload = function() {
          vab = this.result;

          if (aab) buffersReady = true;

          if (buffersReady && workerReady && !posted) postMessage();
        };
        var fileReader2 = new FileReader();
        fileReader2.onload = function() {
          aab = this.result;

          if (vab) buffersReady = true;

          if (buffersReady && workerReady && !posted) postMessage();
        };

        fileReader1.readAsArrayBuffer(record.getBlob());
        fileReader2.readAsArrayBuffer(recorder.getWAVBlob());

        if (!worker) {
          var blob = URL.createObjectURL(new Blob(['importScripts("' + workerPath + '");var now = Date.now;function print(text) {postMessage({"type" : "stdout","data" : text});};onmessage = function(event) {var message = event.data;if (message.type === "command") {var Module = {print: print,printErr: print,files: message.files || [],arguments: message.arguments || [],TOTAL_MEMORY: 268435456};postMessage({"type" : "start","data" : Module.arguments.join(" ")});postMessage({"type" : "stdout","data" : "Received command: " +Module.arguments.join(" ") +((Module.TOTAL_MEMORY) ? ".  Processing with " + Module.TOTAL_MEMORY + " bits." : "")});var time = now();var result = ffmpeg_run(Module);var totalTime = now() - time;postMessage({"type" : "stdout","data" : "Finished processing (took " + totalTime + "ms)"});postMessage({"type" : "done","data" : result,"time" : totalTime});}};postMessage({"type" : "ready"});'], {
            type: 'application/javascript'
          }));

          worker = new Worker(blob);
        }

        worker.onmessage = function(event) {
          var message = event.data;
          if (message.type == "ready") {
            console.log('<a href="'+ workerPath +'" download="ffmpeg-asm.js">ffmpeg-asm.js</a> file has been loaded.');
            workerReady = true;
            if (buffersReady)
              postMessage();
          } else if (message.type == "stdout") {
            console.log(message.data);
          } else if (message.type == "start") {
            console.log('<a href="'+ workerPath +'" download="ffmpeg-asm.js">ffmpeg-asm.js</a> file received ffmpeg command.');
          } else if (message.type == "done") {
            console.log(JSON.stringify(message));

            var result = message.data[0];
            console.log(JSON.stringify(result));

            var blob = new Blob([result.data], {
              type: 'video/mp4'
            });

            console.log(JSON.stringify(blob));

            _this.saveRecordVideo(blob);
          }
        };
        var postMessage = function() {
          posted = true;

          /*
            [
                      '-i', 'video.webm',
                      '-i', 'audio.wav',
              '-s', '1280x720',
                      '-c:v', 'mpeg4',
                      '-c:a', 'aac',
                      '-b:v', '1450k',
                      '-b:a', '96k',
              '-bf', '2',
              '-g', '90',
              '-sc_threshold', '0',
              '-ar', '32000',
                      '-strict', 'experimental', 'output.mp4'
                  ]
          */

          worker.postMessage({
            type: 'command',
            arguments: [
              '-i', 'video.webm',
              '-i', 'audio.wav',
              '-c:v', 'mpeg4',
              '-c:a', 'vorbis', // or aac
              '-b:v', '6400k',  // or 1450k
              '-b:a', '4800k',  // or 96k
              '-strict', 'experimental', 'output.mp4'
            ],
            files: [
              {
                data: new Uint8Array(vab),
                name: 'video.webm'
              },
              {
                data: new Uint8Array(aab),
                name: "audio.wav"
              }
            ]
          });
        };
      }
    }
  }
</script>

<style lang="scss" scoped>
.main {

  .window {
      height: 500px;

    #localVideo {
      width: 400px;
      height: 400px;
      margin: 0 auto;
      transform: rotateY(180deg);
    }

    .mask{
      width: 300px;
      height: 300px;
      position: relative;
      top: -506px;
      left: calc(100%/2 - 300px);
      margin: 0 auto;
      border: 150px solid;
      border-radius: 50%;
      border-color: #fff;
    }

  }
}
</style>