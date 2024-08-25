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
import {PlanPlugin} from "@photo-sphere-viewer/plan-plugin";
import '@photo-sphere-viewer/plan-plugin/index.css'
import {TileLayer} from 'leaflet';

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
    id: 'sphere-test',
    tooltip: 'ST02灯座预装线',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置
  },
  {
    x: 2200,
    y: 1200,
    id: 'key-biscayne',
    tooltip: 'ST03灯座预装线',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置
  },
  {
    x: 3000,
    y: 1250,
    id: 'key-biscayne1',
    tooltip: 'ST05灯座预装线',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置
  },
  {
    x: 1064,
    y: 1000,
    id: 'key-biscayne2',
    tooltip: 'ST07自动包装线',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置
  },
  {
    x: 550,
    y: 800,
    id: 'key-biscayne3',
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
    id: 'sphere-test',
    tooltip: 'ST02灯座预装线',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置
  },
  {
    coordinates: [8.78677, 46.58241],
    id: 'key-biscayne',
    tooltip: 'ST03灯座预装线',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置
  },
  {
    coordinates: [9.78677, 47.58241],
    id: 'key-biscayne1',
    tooltip: 'ST05灯座预装线',
    defaultZoom: 5, // 默认缩放级别下的位置
    maximizedZoom: 20, // 放大状态下的位置
  }
]);

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
    panorama: '../../static/images/6.jpg',
    sphereCorrection: {tilt: 0.1},
    defaultPitch: animatedValues.pitch.start,
    defaultYaw: animatedValues.yaw.start,
    defaultZoomLvl: animatedValues.zoom.start,
    maxFov: animatedValues.maxFov.start,
    loadingImg: baseUrl + 'loader.gif',
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
      description: 'Description',
      download: 'Download',
      fullscreen: 'Fullscreen',
      loading: 'Loading...',
      menu: 'Menu',
      close: 'Close',
      twoFingers: 'Use two fingers to navigate',
      ctrlZoom: 'Use ctrl + scroll to zoom the image',
      loadError: 'The panorama cannot be loaded',
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
        id:'map',
        imageUrl: '../../static/images/panoramic.jpg',
        center: {x: 2000, y: 1000},
        shape: 'square',
        position: 'top right',
        static: true,
        defaultZoom: 5,
        minZoom: 5,
        maxZoom: 50,
        rotation: '0deg',
        hotspots: getHotspotsForZoom(5),
        spotStyle: {
          size: 13,
        }
      }],
      [PlanPlugin, {
        defaultZoom: 14,
        coordinates: [2.78677, 44.58241],
        // center: {x: 200, y: 1000},
        // size: {
        //   width: 200,
        //   height: 200,
        // },
        configureLeaflet:(map)=> {
          console.log(map);
        },
        layers: [
          {
            name: 'OpenStreetMap',
            urlTemplate: '../../static/images/panoramic.jpg',
            attribution: '&copy; OpenStreetMap',
          },

          // {
          //   name: 'OpenTopoMap',
          //   layer: new TileLayer('../../static/images/panoramic.jpg', {
          //     subdomains: ['a', 'b', 'c'],
          //     maxZoom: 17,
          //   }),
          //   attribution: '&copy; OpenTopoMap',
          // },
        ],
        hotspots: PlMaps.value,
      }],
    ],
  });

  //图库插件
  const gallery = viewer.getPlugin(GalleryPlugin);

  //定义数组数据
  const imageItems = [
    {
      id: 'sphere',
      panorama: '../../static/images/1.jpg',
      thumbnail: '../../static/images/1.jpg',
      name: "ST02灯身预装线",
      options: {},
    },
    {
      id: 'sphere-test',
      panorama: '../../static/images/2.jpg',
      thumbnail: '../../static/images/2.jpg',
      name: 'ST02灯座预装线',
    },
    {
      id: 'key-biscayne',
      panorama: '../../static/images/3.jpg',
      thumbnail: '../../static/images/3.jpg',
      name: 'ST03灯座预装线',
      options: {},
    },
    {
      id: 'key-biscayne1',
      panorama: '../../static/images/4.jpg',
      thumbnail: '../../static/images/4.jpg',
      name: 'ST05灯座预装线',
      options: {},
    },
    {
      id: 'key-biscayne2',
      panorama: '../../static/images/5.jpg',
      thumbnail: '../../static/images/5.jpg',
      name: 'ST07自动包装线',
      options: {},
    },
    {
      id: 'key-biscayne3',
      panorama: '../../static/images/6.jpg',
      thumbnail: '../../static/images/6.jpg',
      name: 'A43机器人自动拆垛',
      options: {},
    },
    // {
    //   id: 'key-biscayne4',
    //   panorama: '../../static/images/panoramic.jpg',
    //   thumbnail: '../../static/images/panoramic.jpg',
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
    options: item.caption ? {caption: item.caption} : {}, // 如果有 caption 则添加
  }));

  // 设置图片项目
  gallery.setItems(items);

  //
  const PlanPlugins = viewer.getPlugin(PlanPlugin);

  //监听用户是否点击了 热点
  PlanPlugins.addEventListener('select-hotspot', ({hotspotId}) => {
    //根据热点id来进行切换场景
    const targetItem = PlMaps.value.filter(item=>{
        return item.id === hotspotId;
    })
    console.log(targetItem)

    if (targetItem) {
      PlanPlugins.setOptions({
        coordinates:targetItem[0].coordinates,
      })
    }
  });

  //地图插件
  const MapPlugins = viewer.getPlugin(MapPlugin);

  // 监听 MapPlugin 改变事件
  MapPlugins.addEventListener('view-changed', (e) => {
    const zoom = e.view === 'maximized' ? 40 : 5;
    const size = e.view === 'maximized' ? 18 : 13;
    MapPlugins.setOptions({
      hotspots: getHotspotsForZoom(zoom),
      spotStyle: {
        size
      }
    });
    MapPlugins.setZoom(zoom);
  })

  //监听用户是否点击了 热点
  MapPlugins.addEventListener('select-hotspot', ({hotspotId}) => {
    //根据热点id来进行切换场景
    const targetItem = items.find(item => item.id === hotspotId);
    console.log(hotspotId)
    if (targetItem) {
      viewer.setPanorama(targetItem.panorama).then(() => {
        const items = getHotspotsForZoom(5);
        MapPlugins.setHotspots(items);

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

  & .psv-gallery-item-title {
    top: unset;
    bottom: 0;
  }
}


</style>