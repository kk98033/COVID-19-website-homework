const TaiwanMap = new Vue({
    el: '#app',
    data: {
      h1: '縣市中文',
      h2: '縣市英文'
    },
    methods: {
      async getTaiwanMap() {
        const width = (this.$refs.map.offsetWidth).toFixed(),
              height = (this.$refs.map.offsetHeight).toFixed();
  
        // 判斷螢幕寬度，給不同放大值
        let mercatorScale, w = window.screen.width;
        if(w > 1366) {
          mercatorScale = 11000;
        }
        else if(w <= 1366 && w > 480) {
          mercatorScale = 9000;
        }
        else {
          mercatorScale = 6000;
        }
  
        // d3：svg path 產生器
        var path = await d3.geo.path().projection(
          // !important 座標變換函式
          d3.geo
            .mercator()
            .center([121,24])
            .scale(mercatorScale)
            .translate([width/2, height/2.5])
        );
        
        // 讓d3抓svg，並寫入寬高
        var svg = await d3.select('#svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`);
        
        // 讓d3抓GeoJSON檔，並寫入path的路徑
        var url = 'TW_map/taiwan.geojson';
        await d3.json(url, (error, geometry) => {
          if (error) throw error;
  
          svg
            .selectAll('path')
            .data(geometry.features)
            .enter().append('path')
            .attr('d', path)
            .attr({
              // 設定id，為了click時加class用
              id: (d) => 'city' + d.properties.COUNTYCODE,
            })
            // Fill whith color
            .attr("fill", d => {
              var twDic = JSON.parse(localStorage.getItem("twDic")); // get tw data
              var cases = twDic[d.properties.COUNTYNAME];
              cases = parseInt(cases, 10);
              /* 
              #ea0000
              #f9331d
              #ff593f
              #ff7963
              #92d2f5
              #66a5df
              #3c7ac4
              #0051a6
              */
              if(cases >= 3000){
                // document.getElementById('city' + d.properties.COUNTYCODE).style.fill = "rgba(112,0,25,255)";
                document.getElementById('city' + d.properties.COUNTYCODE).style.fill = "#ea00008C";
              }else if(cases >= 700){
                // document.getElementById('city' + d.properties.COUNTYCODE).style.fill = "rgba(193,0,21,255)";
                document.getElementById('city' + d.properties.COUNTYCODE).style.fill = "#f9331d8C";
              }else if(cases >= 500){
                // document.getElementById('city' + d.properties.COUNTYCODE).style.fill = "rgba(228,86,62,255)";
                document.getElementById('city' + d.properties.COUNTYCODE).style.fill = "#ff593f8C";
              }else if(cases >= 200){
                // document.getElementById('city' + d.properties.COUNTYCODE).style.fill = "rgba(255,162,119,255)";
                document.getElementById('city' + d.properties.COUNTYCODE).style.fill = "#ff79638C";
              }else if(cases >= 100){
                // document.getElementById('city' + d.properties.COUNTYCODE).style.fill = "rgba(254,219,199,255)";
                document.getElementById('city' + d.properties.COUNTYCODE).style.fill = "#92d2f58C";
              }else if(cases >= 50){
                document.getElementById('city' + d.properties.COUNTYCODE).style.fill = "#66a5df8C";
                // document.getElementById('city' + d.properties.COUNTYCODE).style.fill = "rgba(205,228,243,255)";
              }else if(cases >= 25){
                document.getElementById('city' + d.properties.COUNTYCODE).style.fill = "#3c7ac48C";
                // document.getElementById('city' + d.properties.COUNTYCODE).style.fill = "rgba(205,228,243,255)";
              }else{
                document.getElementById('city' + d.properties.COUNTYCODE).style.fill = "#0051a68C";
                // document.getElementById('city' + d.properties.COUNTYCODE).style.fill = "rgba(137,197,228,255)";
              }
            })
            .on('click', d => {
              var twDic = JSON.parse(localStorage.getItem("twDic")); // get tw data
              console.log(twDic);
              console.log(twDic[d.properties.COUNTYNAME]);

              this.h1 = d.properties.COUNTYNAME + twDic[d.properties.COUNTYNAME]; // 換中文名
              this.h2 = d.properties.COUNTYENG; // 換英文名
              // 有 .active 存在，就移除 .active
              if(document.querySelector('.active')) {
                document.querySelector('.active').classList.remove('active');
              }
              // 被點擊的縣市加上 .active
              document.getElementById('city' + d.properties.COUNTYCODE).classList.add('active');
            });
        });
        return svg;
      },
    },
    mounted() {
  
      this.getTaiwanMap();
  
    }
  })