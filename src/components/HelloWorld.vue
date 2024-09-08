<template>
  <div id="viewer"></div>

</template>

<script setup>
import {onMounted, ref} from "vue";
import {Cache, utils, Viewer} from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';
import {AutorotatePlugin} from '@photo-sphere-viewer/autorotate-plugin';
import {GalleryPlugin} from '@photo-sphere-viewer/gallery-plugin';
import '@photo-sphere-viewer/gallery-plugin/index.css';
import {MapPlugin} from "@photo-sphere-viewer/map-plugin";
import '@photo-sphere-viewer/map-plugin/index.css'
import '@photo-sphere-viewer/plan-plugin/index.css'
import {MarkersPlugin} from "@photo-sphere-viewer/markers-plugin";
import '@photo-sphere-viewer/markers-plugin/index.css'
import {GyroscopePlugin} from "@photo-sphere-viewer/gyroscope-plugin";

onMounted(() => {
  init();

  Cache.enabled = false;
  Cache.ttl = 300;
  Cache.maxItems = 3;
});

const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/';

//定义热点坐标数据
const hotspots = ref([
  {
    x: 900,
    y: 1250,
    id: 'sphere',
    tooltip: 'ST02灯身预装线',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置
  },
  {
    x: 1100,
    y: 1250,
    id: 'spheretest',
    tooltip: 'ST02灯座预装线',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置
  },
  {
    x: 2200,
    y: 1200,
    id: 'keybiscayne',
    tooltip: 'ST03灯座预装线',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置
  },
  {
    x: 3000,
    y: 1250,
    id: 'keybiscayne1',
    tooltip: 'ST05灯座预装线',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置
  },
  {
    x: 1064,
    y: 1000,
    id: 'keybiscayne2',
    tooltip: 'ST07自动包装线',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置
  },
  {
    x: 550,
    y: 800,
    id: 'keybiscayne3',
    tooltip: 'A43机器人自动拆垛',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置
    yaw: -0.8,
    pitch: 0.3,
  }
]);


//定义热点坐标数据
const PlMaps = ref([
  {
    coordinates: [6.78677, 44.58241],
    id: 'sphere',
    tooltip: 'ST02灯身预装线',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置

  },
  {
    coordinates: [7.78677, 45.58241],
    id: 'spheretest',
    tooltip: 'ST02灯座预装线',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置
  },
  {
    coordinates: [8.78677, 46.58241],
    id: 'keybiscayne',
    tooltip: 'ST03灯座预装线',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置
  },
  {
    coordinates: [9.78677, 47.58241],
    id: 'keybiscayne1',
    tooltip: 'ST05灯座预装线',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置
  }
]);

const pxToRpx = (px) => {
  const screenWidth = window.innerWidth
  return (750 * px) / screenWidth
}

//插件
const markMap = {
  keybiscayne3: [
    {
      "id": "keybiscayne3",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 5.77,
        "pitch": -0.095
      },
      "size": {
        "width": 120,
        "height": 120
      },
      "tooltip": {
        "content": "A43机器人自动拆垛",

        "position": "top center",
      }
    },
    {
      "id": "sphere",

      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 0.978,
        "pitch": -0.032
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "ST02灯身预装线",
        "position": "top center",
      }
    },
    {
      "id": "spheretest",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 0.62,
        "pitch": -0.040
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "ST02灯座预装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "keybiscayne2",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 0.314,
        "pitch": -0.088
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "ST07自动包装线",
        "position": "top center",
      }
    },
    {
      "id": "keybiscayne",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 0.45,
        "pitch": -0.025
      },
      "size": {
        "width": "40",
        "height": "40"
      },
      "tooltip": {
        "content": "ST03灯座预装线",
        "position": "top center",
      }
    },
  ],
  keybiscayne2: [
    {
      "id": "keybiscayne2",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 0.087,
        "pitch": -0.656
      },
      "size": {
        "width": "200",
        "height": "200"
      },
      "tooltip": {
        "content": "ST07自动包装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "keybiscayne3",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 5.338,
        "pitch": 0.152
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "A43机器人自动拆垛",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "sphere",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 3.258,
        "pitch": -0.061
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "ST02灯身预装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "spheretest",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 2.375,
        "pitch": -0.04
      },
      "size": {
        "width": "40",
        "height": "40"
      },
      "anchor": "center right",
      "tooltip": {
        "content": "ST02灯座预装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "keybiscayne",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 1.921,
        "pitch": -0.001
      },
      "size": {
        "width": "30",
        "height": "30"
      },
      "tooltip": {
        "content": "ST03灯座预装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "keybiscayne1",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 1.78,
        "pitch": 0.049
      },
      "size": {
        "width": "30",
        "height": "30"
      },
      "tooltip": {
        "content": "ST05灯座预装线",
        "position": "top center",
        "trigger": "hover"
      }
    }
  ],
  sphere: [
    {
      "id": "sphere",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 6.023,
        "pitch": -0.015
      },
      "size": {
        "width": 120,
        "height": 120
      },
      "tooltip": {
        "content": "ST02灯身预装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "spheretest",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 5.096,
        "pitch": 0.002
      },
      "size": {
        "width": "50",
        "height": "50"
      },
      "tooltip": {
        "content": "ST02灯座预装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "keybiscayne3",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 2.685,
        "pitch": 0.134
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "A43机器人自动拆垛",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "keybiscayne2",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 3.577,
        "pitch": -0.215
      },
      "size": {
        "width": "80",
        "height": "80"
      },
      "tooltip": {
        "content": "ST07自动包装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "keybiscayne",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 4.822,
        "pitch": -0.028
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "ST03灯座预装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "keybiscayne1",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 4.726,
        "pitch": -0.006
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "ST05灯座预装线",
        "position": "top center",
        "trigger": "hover"
      }
    }
  ],
  spheretest: [
    {
      "id": "sphere",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 0.602,
        "pitch": 0.023
      },
      "size": {
        "width": 120,
        "height": 120
      },
      "tooltip": {
        "content": "ST02灯身预装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "spheretest",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 5.393,
        "pitch": -0.033
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "ST02灯座预装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "keybiscayne2",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 2.57,
        "pitch": -0.165
      },
      "size": {
        "width": "80",
        "height": "80"
      },
      "tooltip": {
        "content": "ST07自动包装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "keybiscayne3",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 2.366,
        "pitch": 0.122
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "A43机器人自动拆垛",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "keybiscayne",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 4.833,
        "pitch": -0.037
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "ST03灯座预装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "keybiscayne1",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 4.704,
        "pitch": 0
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "ST05灯座预装",
        "position": "top center",
        "trigger": "hover"
      }
    }
  ],
  keybiscayne: [
    {
      "id": "keybiscayne",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 6.194,
        "pitch": 0.065
      },
      "size": {
        "width": 120,
        "height": 120
      },
      "tooltip": {
        "content": "ST03灯座预装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "keybiscayne1",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 4.717,
        "pitch": 0.025
      },
      "size": {
        "width": "70",
        "height": "70"
      },
      "tooltip": {
        "content": "ST05灯座预装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "spheretest",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 1.327,
        "pitch": 0.005
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "ST02灯座预装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "sphere",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 1.385,
        "pitch": 0.019
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "ST02灯身预装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "keybiscayne2",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 1.772,
        "pitch": 0.005
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "ST07自动包装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "keybiscayne3",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 1.832,
        "pitch": 0.071
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "A43机器人自动拆垛",
        "position": "top center",
        "trigger": "hover"
      }
    }
  ],
  keybiscayne1: [{
    "id": "keybiscayne1",
    "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
    "position": {
      "yaw": 0.386,
      "pitch": 0.059
    },
    "size": {
      "width": 120,
      "height": 120
    },
    "tooltip": {
      "content": "ST05灯座预装线",
      "position": "top center",
      "trigger": "hover"
    }
  },
    {
      "id": "keybiscayne",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 1.514,
        "pitch": -0.166
      },
      "size": {
        "width": 120,
        "height": 120
      },
      "orientation": "horizontal",
      "tooltip": {
        "content": "ST03灯座预装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "spheretest",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 1.427,
        "pitch": 0.027
      },
      "size": {
        "width": "50",
        "height": "50"
      },
      "tooltip": {
        "content": "ST02灯座预装线",
        "position": "top center",
        "trigger": "hover"
      }
    },
    {
      "id": "keybiscayne2",
      "imageLayer": "https://vr-demo.oss-cn-beijing.aliyuncs.com/target.png?Expires=1725824285&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=osYkI2x77xLInR1TpXATLTzTmgw%3D",
      "position": {
        "yaw": 1.7,
        "pitch": 0.014
      },
      "size": {
        "width": "60",
        "height": "60"
      },
      "tooltip": {
        "content": "ST07自动包装线",
        "position": "top center",
        "trigger": "hover"
      }
    }]
}


//处理坐标问题
const getHotspotsForZoom = (zoom) => {
  return hotspots.value.map(hotspot => ({
    ...hotspot,
  }));
};


const init = () => {
  //添加开场动画
  const animatedValues = {
    pitch: {start: -Math.PI / 2, end: 0.2},
    yaw: {start: Math.PI / 2, end: 0},
    zoom: {start: 0, end: 3},
    maxFov: {start: 90, end: 130}, //视角
    fisheye: {start: 2, end: 0},
  };

  //初始化配置项
  const viewer = new Viewer({
    container: 'viewer',
    panorama: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/6.jpg?Expires=1725824173&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=mMYcxT9Z1XPAYATMzRoUQ%2B%2FnLlY%3D',
    sphereCorrection: {tilt: 0.1},
    defaultPitch: animatedValues.pitch.start,
    defaultYaw: animatedValues.yaw.start,
    defaultZoomLvl: animatedValues.zoom.start,
    maxFov: animatedValues.maxFov.start,
    loadingImg: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/loader.gif?Expires=1725824213&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=hujaxlg5zrOWsC1H0nL73r5jPFc%3D',
    moveInertia: true,
    // fisheye: animatedValues.fisheye.start,
    // adapter: [EquirectangularAdapter,{interpolateBackground:true}],
    lang: {
      zoom: 'Zoom',
      zoomOut: 'Zoom out',
      zoomIn: 'Zoom in',
      moveUp: 'Move up',
      moveDown: 'Move down',
      moveLeft: 'Move left',
      moveRight: 'Move right',
      description: '全景介绍',
      download: 'Download',
      fullscreen: 'Fullscreen',
      loading: 'Loading...',
      menu: 'Menu',
      close: 'Close',
      twoFingers: 'Use two fingers to navigate',
      ctrlZoom: 'Use ctrl + scroll to zoom the image',
      loadError: '图片加载失败',
      webglError: 'Your browser does not seem to support WebGL',
    },
    size: {
      width: '100%',
      height: "97vh"
    },

    panoData: (image, xmpData) => ({
      fullWidth: image.width,
      fullHeight: Math.round(image.width / 2),
      croppedWidth: image.width,
      croppedHeight: image.height,
      croppedX: 0,
      croppedY: Math.round((image.width / 2 - image.height) / 2),
    }),
    plugins: [
      [AutorotatePlugin, {
        autostartDelay: null,
        autostartOnIdle: false,
        autorotatePitch: 0,
      }],
      [GalleryPlugin, {
        visibleOnLoad: false,
        hideOnClick: true,
      }],
      [MapPlugin, {
        id: 'map',
        imageUrl: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/panoramic.jpg?Expires=1725824277&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=A1TgoEGg%2B0i5PGpQYhP6rLADqb8%3D',
        center: {x: 2000, y: 1000},
        shape: 'square',
        position: 'top right',
        static: true,
        defaultZoom: 5,
        minZoom: 5,
        maxZoom: 50,
        rotation: '0deg',
        pinSize: 0,
        coneSize: 0,
        hotspots: getHotspotsForZoom(5),
        size: 150 + 'px',
        spotStyle: {
          size: 13,
        },

      }],
      // [PlanPlugin, {
      //   defaultZoom: 14,
      //   coordinates: [2.78677, 44.58241],
      //   // center: {x: 200, y: 1000},
      //   // size: {
      //   //   width: 200,
      //   //   height: 200,
      //   // },
      //   configureLeaflet: (map) => {
      //     console.log(map)
      //   },
      //   layers: [
      //     {
      //       name: 'OpenStreetMap',
      //       urlTemplate: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/panoramic.jpg?Expires=1725824277&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=A1TgoEGg%2B0i5PGpQYhP6rLADqb8%3D',
      //       attribution: '&copy; OpenStreetMap',
      //     },
      //
      //     // {
      //     //   name: 'OpenTopoMap',
      //     //   layer: new TileLayer('https://vr-demo.oss-cn-beijing.aliyuncs.com/panoramic.jpg?Expires=1725824277&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=A1TgoEGg%2B0i5PGpQYhP6rLADqb8%3D', {
      //     //     subdomains: ['a', 'b', 'c'],
      //     //     maxZoom: 17,
      //     //   }),
      //     //   attribution: '&copy; OpenTopoMap',
      //     // },
      //   ],
      //   hotspots: PlMaps.value,
      // }],
      [MarkersPlugin, {}],
      [GyroscopePlugin]
    ],
  });

  const MarkersPlugins = viewer.getPlugin(MarkersPlugin);
  MarkersPlugins.showAllTooltips();


  MarkersPlugins.addEventListener('select-marker', ({marker}) => {
    console.log(marker.id);
    const targetItem = items.find(item => item.id === marker.id);
    console.log(targetItem)
    if (targetItem) {
      console.log(targetItem.id);
      viewer.setPanorama(targetItem.panorama).then(() => {
        //Todo 切换全景的标记
        const NewtargetItem = updateMarkers(targetItem.id);
        MarkersPlugins.updateMarker(NewtargetItem);
      });
    }
  });

  //更新插件坐标点 通过每张图片id来进行更新
  function updateMarkers(sceneId) {
    const markersData = markMap[sceneId] || [];


    // // // 清除当前所有的标记
    MarkersPlugins.clearMarkers();
    //
    // // 添加新的标记

    markersData.forEach((marker, index) => {
      console.log(index)
      MarkersPlugins.addMarker({
        id: marker.id,
        imageLayer: marker.imageLayer,
        position: marker.position,
        size: marker.size,
        tooltip: {
          ...marker.tooltip,
        },
      });
    });
  }

  // updateMarkers('keybiscayne3');

  //图库插件
  const gallery = viewer.getPlugin(GalleryPlugin);
  viewer.addEventListener('panorama-loaded', (e) => {
    updateMarkers(gallery.currentId);
    MapPlugins.setActiveHotspot(gallery.currentId);
    const TargetDescription = items.find(item => item.id === gallery.currentId);
    console.log(items)
    e.target.config.description = `132`;
  })
  //定义数组数据
  const imageItems = [
    {
      id: 'sphere',
      panorama: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/1.jpg?Expires=1725824091&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=spwnDQre%2Fj6TVTfKlESqs5LR954%3D',
      thumbnail: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/1.jpg?Expires=1725824091&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=spwnDQre%2Fj6TVTfKlESqs5LR954%3D',
      name: "ST02灯身预装线",
      description: '这是ST02灯身预装线产线',
      options: {
        caption: 'ST02灯身预装线'
      },
    },
    {
      id: 'spheretest',
      panorama: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/2.jpg?Expires=1725824110&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=H2tkTsFGQqomn51vbzgII%2FQQ%2FT4%3D',
      thumbnail: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/2.jpg?Expires=1725824110&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=H2tkTsFGQqomn51vbzgII%2FQQ%2FT4%3D',
      name: 'ST02灯座预装线',
      description: '这是ST02灯座预装线产线',
      options: {
        caption: 'ST02灯身预装线'
      },
    },
    {
      id: 'keybiscayne',
      panorama: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/3.jpg?Expires=1725824127&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=XaIMy9WUq65PzeFOuUwRKt0ZUj8%3D',
      thumbnail: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/3.jpg?Expires=1725824127&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=XaIMy9WUq65PzeFOuUwRKt0ZUj8%3D',
      name: 'ST03灯座预装线',
      options: {
        caption: 'ST02灯身预装线'
      },
      description: '这是ST03灯座预装线产线',
    },
    {
      id: 'keybiscayne1',
      panorama: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/4.jpg?Expires=1725824141&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=%2Ffk9td29Z8AWdMXg3vFDhqE99VQ%3D',
      thumbnail: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/4.jpg?Expires=1725824141&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=%2Ffk9td29Z8AWdMXg3vFDhqE99VQ%3D',
      name: 'ST05灯座预装线',
      options: {},
      description: '这是ST05灯座预装线产线',
    },
    {
      id: 'keybiscayne2',
      panorama: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/5.jpg?Expires=1725824156&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=IcLmvPuewfXjbeoAPy3Q4XOPp94%3D',
      thumbnail: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/5.jpg?Expires=1725824156&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=IcLmvPuewfXjbeoAPy3Q4XOPp94%3D',
      name: 'ST07自动包装线',
      description: '这是ST07自动包装线产线',
      options: {},
    },
    {
      id: 'keybiscayne3',
      panorama: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/6.jpg?Expires=1725824173&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=mMYcxT9Z1XPAYATMzRoUQ%2B%2FnLlY%3D',
      thumbnail: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/6.jpg?Expires=1725824173&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=mMYcxT9Z1XPAYATMzRoUQ%2B%2FnLlY%3D',
      name: 'A43机器人自动拆垛',
      description: '这是A43机器人自动拆垛产线',
      options: {},
    },
    // {
    //   id: 'keybiscayne4',
    //   panorama: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/panoramic.jpg?Expires=1725824277&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=A1TgoEGg%2B0i5PGpQYhP6rLADqb8%3D',
    //   thumbnail: 'https://vr-demo.oss-cn-beijing.aliyuncs.com/panoramic.jpg?Expires=1725824277&OSSAccessKeyId=TMP.3KhMER5m7UpXgHY3tmWXmyHJNB3kdQq5iAL1SK8yHa4qqBaS2YkavTNiamws5WjgkamwUqtqm7eLoebP1gPDZQMwzjWcPf&Signature=A1TgoEGg%2B0i5PGpQYhP6rLADqb8%3D',
    //   name: '俯瞰全景',
    //   options: {},
    // },
  ]
  // 使用 map 循环生成 items
  const items = imageItems.map(item => ({
    id: item.id,
    panorama: item.panorama,
    thumbnail: item.thumbnail,
    name: item.name,
    description: item.description,
    // options: item.caption ? {caption: item.caption} : {}, // 如果有 caption 则添加
  }));

  // 设置图片项目
  gallery.setItems(items);

  //
  // const PlanPlugins = viewer.getPlugin(PlanPlugin);
  //
  // //监听用户是否点击了 热点
  // PlanPlugins.addEventListener('select-hotspot', ({hotspotId}) => {
  //   //根据热点id来进行切换场景
  //   const targetItem = PlMaps.value.filter(item => {
  //     return item.id === hotspotId;
  //   })
  //   console.log(targetItem)
  //
  //   if (targetItem) {
  //     PlanPlugins.setOptions({
  //       coordinates: targetItem[0].coordinates,
  //     })
  //   }
  // });


  //地图插件
  const MapPlugins = viewer.getPlugin(MapPlugin);

  // 监听 MapPlugin 改变事件
  MapPlugins.addEventListener('view-changed', (e) => {
    console.log(e)
    if (e.view === 'maximized') {
      MarkersPlugins.hideAllTooltips();
    } else {
      MarkersPlugins.showAllTooltips();
    }
    const zoom = e.view === 'maximized' ? 10 : 5;
    const size = e.view === 'maximized' ? 18 : 13;
    MapPlugins.setOptions({
      hotspots: getHotspotsForZoom(zoom),
      spotStyle: {
        size,
      },
    });
    MapPlugins.setZoom(zoom);
  })
  //监听用户是否点击了 热点
  MapPlugins.addEventListener('select-hotspot', ({hotspotId}) => {

    console.log(456)
    //根据热点id来进行切换场景
    const targetItem = items.find(item => item.id === hotspotId);
    console.log(targetItem)
    if (targetItem) {

      viewer.setPanorama(targetItem.panorama).then(() => {


        const items = getHotspotsForZoom(5);
        MapPlugins.setHotspots(items);
        const NewtargetItem = updateMarkers(targetItem.id);
        MarkersPlugins.updateMarker(NewtargetItem);
        // 更新当前点击的热点的颜
      });
    }
  });

  //监听用户是否点击了 热点
  MapPlugins.addEventListener('click', ({hotspotId}) => {
    console.log(456)
    //根据热点id来进行切换场景
    const targetItem = items.find(item => item.id === hotspotId);
    console.log(targetItem)
    if (targetItem) {
      console.log(targetItem.id);
      viewer.setPanorama(targetItem.panorama).then(() => {
        const items = getHotspotsForZoom(5);
        MapPlugins.setHotspots(items);
        const NewtargetItem = updateMarkers(targetItem.id);
        MarkersPlugins.updateMarker(NewtargetItem);
        // MapPlugins.setActiveHotspot(String(targetItem.id));
      });
    }
  });

  // 双击事件监听
  MapPlugins.component.container.addEventListener('dblclick', () => {
    MapPlugins.maximize()
  });

  // //静止移动小视图
  // MapPlugins.component.container.addEventListener('mousemove', (e) => {
  //  // e.preventDefault();
  //  // e.stopPropagation();
  // });

  //旋转插件
  const autorotate = viewer.getPlugin(AutorotatePlugin);
  let isInit = true;
  viewer.addEventListener('ready', () => {
    viewer.navbar.hide();
    setTimeout(() => {
      if (isInit) {
        intro(animatedValues.pitch.end, animatedValues.pitch.end);
      }
    }, 1500);
  }, {once: true});


  viewer.addEventListener('click', ({data}) => {
    if (isInit) {
      intro(data.pitch, data.yaw);
    }
  });


  function intro(pitch, yaw) {
    isInit = false;
    autorotate.stop();
    viewer.navbar.hide();
    new utils.Animation({
      properties: {
        ...animatedValues,
        pitch: {start: animatedValues.pitch.start, end: pitch},
        yaw: {start: animatedValues.yaw.start, end: yaw},
      },
      duration: 2500,
      easing: 'inOutQuad',
      onTick: (properties) => {
        viewer.setOptions({
          fisheye: properties.fisheye,
          maxFov: properties.maxFov,
        });
        viewer.rotate({yaw: properties.yaw, pitch: properties.pitch});
        viewer.zoom(properties.zoom);
      },
    }).then(() => {
      viewer.navbar.show();
      viewer.setOptions({
        mousemove: true,
        mousewheel: true,
      });
      autorotate.start();
    });
  }


};
</script>

<style scoped lang="scss">

:deep(.psv-gallery-container) {
  justify-content: center;
  background-size: 200%;

  & .psv-gallery-item-title {
    top: unset;
    bottom: 0;
  }
}

:deep(.psv-container) {
  @container psv-container (max-width: 500px) {
    .psv-gallery {
      top: unset;
    }
  }
}


</style>