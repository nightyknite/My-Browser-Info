var app = new Vue({
  el: '#app',
  data: {
    user_agent : '',
    accept_language : '',
    platform : '',
    screen_width : '',
    public_ip : '',
    candidate : '',
    screen_height : '',
    os : '',
    browser : '',
    mobile_type : '',
    vendor_fragments : ''
  },
  created: function () {

	axios.get("https://api.ipify.org/?format=json")
    	.then(response => {this.public_ip = response.data.ip})

    this.user_agent = navigator.userAgent;

    this.accept_language = navigator.languages;
    
    this.platform = navigator.platform;

    this.screen_width = parent.screen.width;
    this.screen_height = parent.screen.height;


    var ua = navigator.userAgent.toLowerCase();

    // OS
    var os = "n/a";
    if (ua.indexOf("iphone") > 0) {
        os = "iPhone";
    } else if (ua.indexOf("ipad") > 0) {
        os = "iPad";
    } else if (ua.indexOf("ipod") > 0) {
        os = "iPod";
    } else if (ua.indexOf("android") > 0) {
        os = ua.match(/android [0-9.]*/gi)[0];
    } else if (ua.indexOf("windows nt 6.1") > 0) {
        os = "Windows7";
    } else if (ua.indexOf("windows nt 6.2") > 0) {
        os = "Windows8";
    } else if (ua.indexOf("windows nt 6.3") > 0) {
        os = "Windows8.1";
    } else if (ua.indexOf("windows nt 10.0") > 0) {
        os = "Windows10";
    } else if (ua.indexOf("windows") > 0) {
        os = "Windows";
    } else if ((ua.indexOf("mac os x 10_9") > 0) || (ua.indexOf("mac os x 10.9") > 0)) {
        os = "MacOS X 10.9 Mavericks";
    } else if ((ua.indexOf("mac os x 10_10") > 0) || (ua.indexOf("mac os x 10.10") > 0)) {
        os = "MacOS X 10.10 Yosemite";
    } else if ((ua.indexOf("mac os x 10_11") > 0) || (ua.indexOf("mac os x 10.11") > 0)) {
        os = "MacOS X 10.11 El Capitan";
    } else if ((ua.indexOf("mac os x 10_12") > 0) || (ua.indexOf("mac os x 10.12") > 0)) {
        os = "MacOS X 10.12 Sierra";
    } else if ((ua.indexOf("mac os x 10_13") > 0) || (ua.indexOf("mac os x 10.13") > 0)) {
        os = "MacOS X 10.13 High Sierra";
    } else if (ua.indexOf("mac") > 0) {
        os = "Mac";
    } else if (ua.indexOf("linux") > 0) {
        os = "Linux";
    }

    this.os = os;

    // Browser
    var browser = "n/a";

    if (ua.indexOf("iphone") > 0) {
        browser = "iPhone";
    } else if (ua.indexOf("ipad") > 0) {
        browser = "iPad";
    } else if (ua.indexOf("ipod") > 0) {
        browser = "iPod";        
    } else if (ua.indexOf("trident/7.0") > 0) {
        browser = "IE11";
    } else if (ua.indexOf("edge") > 0) {
        browser = "MicroSoft Edge";
    } else if (ua.indexOf("firefox") > 0) {
        browser = ua.match(/firefox\/[0-9.]*/gi)[0];        
    } else if (ua.indexOf("opr") > 0) {
        browser = "Opera";
    } else if (ua.indexOf("chrome") > 0) {
        browser = ua.match(/chrome\/[0-9.]*/gi)[0];
    } else if (ua.indexOf("safari") > 0) {
        browser = "Safari";
    }

    this.browser = browser;


    // mobile type 
    var mobile_type = "n/a";

    if (ua.indexOf('iphone') > 0 
        || ua.indexOf('ipod') > 0 
        || ua.indexOf('windows phone') > 0
        || ua.indexOf('blackberry') > 0
        || (ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0)
        ) {

       mobile_type = "スマートフォン";

    } else if (ua.indexOf('ipad') > 0
        || ua.indexOf('kindle') > 0
        || ua.indexOf('silk') > 0 
        || (ua.indexOf('android') > 0 && ua.indexOf('tablet') > 0)
        || (ua.indexOf('windows') > 0 && ua.indexOf('touch') > 0)
        ) {

        mobile_type = "タブレット";

    }

    this.mobile_type = mobile_type;

    // vendor_fragments

    axios.get("vendor_fragments.json")
        .then(response => {
            for (var item in response.data) {
                if (ua.indexOf(item.toLowerCase()) > 0) {
                  app.vendor_fragments = item + ':' + response.data[item].title;
                  break;
                }
            }
        }   
    )

    
    // Private IP
    // https://stackoverflow.com/questions/20194722/can-you-get-a-users-local-lan-ip-address-via-javascript
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
    var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
    pc.createDataChannel('');//create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
    pc.onicecandidate = function(ice)
    {
     if (ice && ice.candidate && ice.candidate.candidate)
     {
        console.log(ice);
        console.log(ice.candidate);
        console.log(ice.candidate.candidate);
        app.candidate = ice.candidate.candidate;
        pc.onicecandidate = noop;
     }
    };


  }

})

