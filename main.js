function getMobileType(ua) {

    let mobile_type = "n/a";

    if (ua.indexOf('iphone') > 0 
        || ua.indexOf('ipod') > 0 
        || ua.indexOf('windows phone') > 0
        || ua.indexOf('blackberry') > 0
        || (ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0)
        ) {

       mobile_type = "Mobile";

    } else if (ua.indexOf('ipad') > 0
        || ua.indexOf('kindle') > 0
        || ua.indexOf('silk') > 0 
        || (ua.indexOf('android') > 0 && ua.indexOf('tablet') > 0)
        || (ua.indexOf('windows') > 0 && ua.indexOf('touch') > 0)
        ) {

        mobile_type = "Tablet";

    }
    return mobile_type;
}

function getBrowser(ua) {

  let browser = "n/a";

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

  return browser;
}

function getOS(ua) {

    let os = "n/a";
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
    } else if ((ua.indexOf("mac os x 10_14") > 0) || (ua.indexOf("mac os x 10.14") > 0)) {
        os = "MacOS X 10.14 Mojave";
    } else if ((ua.indexOf("mac os x 10_15") > 0) || (ua.indexOf("mac os x 10.15") > 0)) {
        os = "MacOS X 10.15 Catalina";
    } else if (ua.indexOf("mac") > 0) {
        os = "Mac";
    } else if (ua.indexOf("linux") > 0) {
        os = "Linux";
    }
    return os;
}

new Vue({
  el: '#app',
  data: {
    user_agent : '',
    accept_language : '',
    platform : '',
    appcodename : '',
    appname : '',
    appVersion : '',
    product : '',
    productsub : '',
    vendor : '',
    vendorsub : '',
    color_depth : '',
    screen_width : '',
    screen_height : '',
    browser_window_width : '',
    browser_window_height : '',
    public_ip : '',
    private_ip : '',
    candidate : '',
    os : '',
    browser : '',
    battery_level : '',
    connection_downlink : '',
    connection_downlinkMax : '',
    connection_effectiveType : '',
    connection_rtt : '',
    connection_saveData : '',
    connection_type : '',
    mobile_type : '',
    vendor_fragments : '',
    useragentdata_brands : '',
    useragentdata_mobile : '',
    useragentdata_highentropyvalues : '',
    cpu_core : '',
    device_memory : '',
    cookieEnabled : '',
    onLine : '',
    maxTouchPoints : '',
    ip_info : '',
    latitude : '',
    longitude : '',
    altitude : '',
    accuracy : '',
    altitudeaccuracy : '',
    heading : '',
    speed : ''
},
  created: function () {

    const self = this;
    self.user_agent = navigator.userAgent;
    self.accept_language = navigator.languages;  
    self.platform = navigator.platform;
    self.color_depth = screen.colorDepth;
    self.screen_width = parent.screen.width;
    self.screen_height = parent.screen.height;
    self.cpu_core = navigator.hardwareConcurrency;
    self.device_memory = navigator.deviceMemory;
    self.appcodename = navigator.appCodeName;
    self.appname = navigator.appName;
    self.appVersion = navigator.appVersion;
    self.product = navigator.product;
    self.productsub = navigator.productSub; 
    self.vendor = navigator.vendor;
    self.vendorsub = navigator.vendorSub;
    self.cookieEnabled = navigator.cookieEnabled;
    self.onLine = navigator.onLine;
    self.maxTouchPoints = navigator.maxTouchPoints;

    if (navigator.connection) {
        self.connection_downlink = navigator.connection.downlink;
        self.connection_downlinkMax = navigator.connection.downlinkMax;
        self.connection_effectiveType = navigator.connection.effectiveType;
        self.connection_rtt = navigator.connection.rtt;
        self.connection_saveData = navigator.connection.saveData;
        self.connection_type = navigator.connection.type;
    }

    const ua = navigator.userAgent.toLowerCase();
    self.os = getOS(ua);  
    self.browser = getBrowser(ua);
    self.mobile_type = getMobileType(ua);

    // vendor_fragments
    axios.get("vendor_fragments.json")
        .then(response => {
            for (var item in response.data) {
                if (ua.indexOf(item.toLowerCase()) > 0) {
                  self.vendor_fragments = item + ':' + response.data[item].title;
                  break;
                }
            }
        }   
    )
    
　　 if (navigator.userAgentData) {
        const uad = navigator.userAgentData;
        self.useragentdata_brands = JSON.stringify(uad.brands);
        self.useragentdata_mobile = uad.mobile;
        uad.getHighEntropyValues([
            "platform",
            "platformVersion",
            "architecture",
            "model",
            "uaFullVersion"
           ]).then(res => {
            self.useragentdata_highentropyvalues = JSON.stringify(res);
           }); 
    }
    
    // Private IP
    var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
    pc.createDataChannel('');
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);
    pc.onicecandidate = function(ice) {
      if (ice && ice.candidate) {
        const [ip, , , type] = ice.candidate.candidate.split(" ", 8).slice(4);
        self.private_ip = ip;
        pc.onicecandidate = noop;
      }
    };

    // Window
    self.browser_window_width = window.innerWidth;
    self.browser_window_height = window.innerHeight;
    window.addEventListener('resize', function() {
        self.browser_window_width = window.innerWidth;
        self.browser_window_height = window.innerHeight;
    }, false);

    if (navigator.getBattery) {
        navigator.getBattery().then(function(battery) {
            updateLevelInfo();
            battery.addEventListener('levelchange', function(){
            updateLevelInfo();
            });
            function updateLevelInfo() {
            self.battery_level = battery.level * 100 + "%";
            }
        });
    }

  },methods: {
    getPublicIP : function (event) {
        const self = this;
        const pc = new RTCPeerConnection({
            iceServers: [
              {
                urls: ["stun:stun.l.google.com:19302"]
              }
            ]
        });
        pc.onicecandidate = e => {
            if (e.candidate) {
                const [ip, , , type] = e.candidate.candidate.split(" ", 8).slice(4);
                if (type == "srflx") {
                self.public_ip = ip;
                }      
            }
        };
        pc.onnegotiationneeded = async () => {
        await pc.setLocalDescription(await pc.createOffer());
        };
        pc.createDataChannel("");

    }, getGeo : function (event) {
        const self = this;
        navigator.geolocation.getCurrentPosition((position) => {
            self.latitude = position.coords.latitude;
            self.longitude = position.coords.longitude;
            self.altitude = position.coords.altitude;
            self.accuracy = position.coords.accuracy;
            self.altitudeaccuracy = position.coords.altitudeAccuracy;
            self.heading = position.coords.heading;
            self.speed = position.coords.speed;
        });
    }
}
}) 
