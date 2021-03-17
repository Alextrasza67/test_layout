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
  export default {
    name: "aliveCheck",
    data() {
      return {
        recordMemo:'',
        localStream: null,
        buff: null,
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
      },
      recordVideo(){
        var options = {
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 2500000,
          mimeType:'video/webm;codecs=vp8'
        };
        if(!MediaRecorder.isTypeSupported(options.mimeType)){
          console.log('不支持'+options.mimeType);
          alert('不支持'+options.mimeType)
          return;
        }
        this.buffer = [];
        let mediaRecoder = new MediaRecorder(this.localStream, options);
        var _this = this;
        mediaRecoder.ondataavailable = function (e) {
          _this.handleDataAvailable(e);
        };
        mediaRecoder.start(10);
        let count = 5;
        let timer = setInterval(function () {
          _this.recordMemo = '录制剩余时间'+count+'秒'
          if(count<=0){
            clearInterval(timer);
            _this.recordMemo = '正在保存视频'
            _this.saveRecordVideo();
            _this.recordMemo = ''
          }
          count--;
        },1000);
      },
      handleDataAvailable(e){
        if (e && e.data && e.data.size>0) {
          this.buffer.push(e.data);
        }
      },
      saveRecordVideo(){
        var blob = new Blob(this.buffer, {type: 'video/webm;codecs=vp8'});
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        //文件名 通过方法传进来 检测是否合法？
        a.download = 'test.webm';
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);
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