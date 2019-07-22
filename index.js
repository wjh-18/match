/*function mapChart() {
    let myChart = echarts.init($('.chart5')[0]);
    var mapName = 'china';
    var data = [
        {name: "北京", value: 199},
        {name: "天津", value: 42},
        {name: "河北", value: 102},
        {name: "山西", value: 81},
        {name: "内蒙古", value: 47},
        {name: "辽宁", value: 67},
        {name: "吉林", value: 82},
        {name: "黑龙江", value: 123},
        {name: "上海", value: 24},
        {name: "江苏", value: 92},
        {name: "浙江", value: 114},
        {name: "安徽", value: 109},
        {name: "福建", value: 116},
        {name: "江西", value: 91},
        {name: "山东", value: 119},
        {name: "河南", value: 137},
        {name: "湖北", value: 116},
        {name: "湖南", value: 114},
        {name: "重庆", value: 91},
        {name: "四川", value: 125},
        {name: "贵州", value: 62},
        {name: "云南", value: 83},
        {name: "西藏", value: 9},
        {name: "陕西", value: 80},
        {name: "甘肃", value: 56},
        {name: "青海", value: 10},
        {name: "宁夏", value: 18},
        {name: "新疆", value: 180},
        {name: "广东", value: 123},
        {name: "广西", value: 59},
        {name: "海南", value: 14},
    ];

    var geoCoordMap = {};

    /!*获取地图数据*!/
    myChart.showLoading();
    var mapFeatures = echarts.getMap(mapName).geoJson.features;
    myChart.hideLoading();
    mapFeatures.forEach(function (v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;

    });

    console.log(data)
    console.log(toolTipData)
    var max = 480,
        min = 9; // todo
    var maxSize4Pin = 100,
        minSize4Pin = 20;

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value),
                });
            }
        }
        return res;
    };
    option = {
        tooltip: {
            padding: 0,
            enterable: true,
            transitionDuration: 1,
            textStyle: {
                color: '#000',
                decoration: 'none',
            },
            // position: function (point, params, dom, rect, size) {
            //   return [point[0], point[1]];
            // },
            formatter: function (params) {
                // console.log(params)
                var tipHtml = '';
                tipHtml = '<div style="width:280px;height:180px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">'
                    + '<div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">' + '<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">' + '</i>'
                    + '<span style="margin-left:10px;color:#fff;font-size:16px;">' + params.name + '</span>' + '</div>'
                    + '<div style="padding:20px">'
                    + '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>'
                    + '单位总数：' + '<span style="color:#11ee7d;margin:0 6px;">' + toolTipData.length + '</span>' + '个' + '</p>'
                    + '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>'
                    + '总人数：' + '<span style="color:#f48225;margin:0 6px;">' + toolTipData.length + '</span>' + '个' + '</p>'
                    + '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>'
                    + '总人数：' + '<span style="color:#f4e925;margin:0 6px;">' + toolTipData.length + '</span>' + '个' + '</p>'
                    + '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>'
                    + '总人数：' + '<span style="color:#25f4f2;margin:0 6px;">' + toolTipData.length + '</span>' + '个' + '</p>'
                    + '</div>' + '</div>';
                setTimeout(function () {
                    tooltipCharts(params.name);
                }, 10);
                return tipHtml;
            }

        },

        visualMap: {
            show: true,
            min: 0,
            max: 200,
            left: '10%',
            top: 'bottom',
            calculable: true,
            seriesIndex: [1],
            inRange: {
                color: ['#04387b', '#467bc0'] // 蓝绿
            }
        },
        geo: {
            show: true,
            map: mapName,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: '#023677',
                    borderColor: '#1180c7',
                },
                emphasis: {
                    areaColor: '#4499d0',
                }
            }
        },
        series: [{
            name: '散点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#fff'
                }
            }
        },
            {
                type: 'map',
                map: mapName,
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                animation: false,
                data: data
            },
            {
                name: '点',
                type: 'scatter',
                coordinateSystem: 'geo',
                zlevel: 6,
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 10)),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'left',
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'yellow',
                        shadowBlur: 10,
                        shadowColor: 'yellow'
                    }
                },
                zlevel: 1
            },

        ]
    };

}*/
function mapChart() {
    let myChart = echarts.init($('.chart5')[0]);
    let option = {
        // backgroundColor: '#000',
        title: {
            text: '用户常驻城市',
            top: 10,
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        geo: {
            map: 'china',
            roam: true,
            label: {
                emphasis: {
                    show: false
                }
            },
            silent: true,
            itemStyle: {
                normal: {
                    areaColor: 'rgb(19, 91, 153)',
                    borderColor: 'rgb(9, 54, 95)'
                },
                emphasis: {
                    areaColor: 'rgb(10, 105, 187)'
                }
            }
        },
        series: [{
            name: '弱',
            type: 'scatterGL',
            progressive: 1e6,
            coordinateSystem: 'geo',
            symbolSize: 1,
            zoomScale: 0.2,
            blendMode: 'lighter',
            large: true,
            itemStyle: {
                color: 'rgb(20, 15, 2)'
            },
            postEffect: {
                enable: true
            },
            silent: true,
            dimensions: ['lng', 'lat'],
            data: new Float32Array()
        }]
    };
    $.get('./data/geter/geter.json', function (res) {
        let geterObj = res;
        let data = [];
        geterObj.data.forEach(function (v, i) {
            data.push(v['o'].split(';').concat(1))

        });
        option.series[0].data = data;
        myChart.setOption(option)
    });
    let myChart2 = echarts.init($('.chart10')[0]);
    $.get('./data/producer/producer.json', function (res) {
        let geterObj = res;
        let data = [];
        geterObj.data.forEach(function (v, i) {
            data.push(v['o'].split(';').concat(1))

        });
        let newOption = JSON.parse(JSON.stringify(option));
        newOption.series[0].data = data;
        myChart2.setOption(newOption)
    });
}


function chartL1() {
    let geterObj, producerObj;
    let char1 = echarts.init($('.chart1')[0]);
    let char2 = echarts.init($('.chart2')[0]);
    let char3 = echarts.init($('.chart3')[0]);
    let char4 = echarts.init($('.chart4')[0]);

    let char6 = echarts.init($('.chart6')[0]);
    let char7 = echarts.init($('.chart7')[0]);
    let char8 = echarts.init($('.chart8')[0]);
    let char9 = echarts.init($('.chart9')[0]);
    let char11 = echarts.init($('.chart11')[0]);

    let optionBar1 = {
        title: {
            text: '注册时长 ',
            x: 'center',
            y: 10,
            textStyle: {
                color: '#fff',
                fontSize: 16,
                fontWeight: 'normal',
            },

        },
        xAxis: {
            type: 'category',
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            axisLine: {
                lineStyle: {
                    color: '#B4B4B4'
                }
            },
            axisTick: {
                show: false,
            },
        },
        yAxis: {
            type: 'value',
            splitLine: {show: false},
            axisLine: {
                lineStyle: {
                    color: '#B4B4B4',
                },

                axisLabel: {
                    formatter: '{value} ',
                }
            },
        },
        // backgroundColor: '#191E40',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.1)',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true,
                    backgroundColor: '#7B7DDC'
                }
            },
            formatter: "{b}00:{c}"
        },
        series: [{
            // data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'bar',
            itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#956FD4'},
                            {offset: 1, color: '#3EACE5'}
                        ]
                    )
                }
            },
        }]
    };
    let optionPie1 = {
        title: {
            text: '用户学历 ',
            x: 'center',
            y: 10,
            textStyle: {
                color: '#fff',
                fontSize: 16,
                fontWeight: 'normal',
            },

        },
        // color: ['#213B7A', '#54FEFE', '#0097EE', '#3D4969', '#35CEBA'],
        color: ['#ad46f3', '#5045f6', '#4777f5', "#44aff0", "#45dbf7", "#f6d54a", "#f69846", "#ff4343", '#f845f1',],

        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [{
            name: '用户学历',
            // roseType: 'area',
            label: {
                normal: {
                    show: true,
                    formatter: '{b|{b}}\n{hr|}\n{d|占比{d}%}',
                    rich: {
                        b: {
                            fontSize: 12,
                            color: 'rgba(255,255,255,0.8)',
                            align: 'center',
                            padding: 3
                        },
                        hr: {
                            borderColor: '#0097EE',
                            width: '100%',
                            borderWidth: 1,
                            height: 0
                        },
                        d: {
                            fontSize: 12,
                            color: '#fff',
                            align: 'center',
                            padding: 3,
                        },
                    },
                    position: 'outside'
                },
                emphasis: {
                    show: true
                }
            },
            type: 'pie',
            radius: '55%',
            // center: ['40%', '50%'],
            // data: data.seriesData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                    shadowColor: 'rgba(0, 0, 0, 0.8)',
                    shadowBlur: 50,
                }
            },

        }]
    };

    $.get('./data/data.json', function (res) {
        initChart(res.geter, char1, char2, char3, char4);
        initChart(res.producer, char6, char7, char8, char9);


        optionPie1.title.text = "生产视频类型";
        optionPie1.series[0].roseType = 'radius';
        optionPie1.series[0].data = Object.keys(geterObj["type"]).map(function (key) {
            return {"name": key, value: geterObj["type"][key]};
        });
        char11.setOption(optionPie1);
    });

    function initChart(data, char1, char2, char3, char4) {
        geterObj = data;
        // option.xAxis.data = Object.keys(geterObj["register_time"]);
        optionBar1.series[0].data = Object.keys(geterObj["register_time_div100"]).map(function (key) {
            return [key, geterObj["register_time_div100"][key]];
        });
        char1.setOption(optionBar1);

        optionPie1.title.text = "使用时长";
        optionBar1.series[0].data = Object.keys(geterObj["play_time_div100"]).map(function (key) {
            return [key, Math.min(geterObj["play_time_div100"][key], 200)];
        });
        optionBar1.yAxis.max = 200;
        char3.setOption(optionBar1);

        optionPie1.title.text = "用户学历";
        optionPie1.series[0].data = Object.keys(geterObj["edu"]).map(function (key) {
            return {"name": key, value: geterObj["edu"][key]};
        });
        char2.setOption(optionPie1);

        optionPie1.title.text = "用户年龄";
        optionPie1.series[0].data = Object.keys(geterObj["age"]).map(function (key) {
            return {"name": key, value: geterObj["age"][key]};
        });
        char4.setOption(optionPie1);
    }
}

function scatterChart() {
    let scatterChar = echarts.init($('.scatterChart')[0]);
    let data = [];

    $.ajax({
        url: './data/geter/parition.json',
        success: function (res) {
            res.data.forEach(function (v) {
                data.push([v["payment"], v["age"], v["play_time"], v["video_partition"]])
            });
            let option = {
                /*backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
                    offset: 0,
                    color: '#6298fa'
                }, {
                    offset: 1,
                    color: '#cdd0d5'
                }]),*/
                title: {
                    text: ''
                },

                xAxis: {
                    name: "用户花费",
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#aeaeae'
                        }
                    },
                    scale: true
                },
                yAxis: {
                    name: "用户平均年龄",
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#aeaeae'
                        }
                    },
                    scale: true
                },
                series: [{
                    name: 'ss',
                    data: data,
                    type: 'scatter',
                    symbolSize: function (data) {
                        return (data[2] - 80000) / 400;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return "分区" + param.data[3]
                                    + "\n热度：" + param.data[2]
                                    + "\n用户平均年龄：" + param.data[1].toFixed(3)
                                    + "\n用户花费：" + param.data[0]
                            },
                            position: 'top',
                            color: "#fff",
                            align: "left"
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(25, 100, 150, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: 'rgb(129, 227, 238)'
                            }, {
                                offset: 1,
                                color: 'rgb(25, 183, 207)'
                            }])
                        }
                    }
                }
                ]
            };
            console.log(option);
            scatterChar.setOption(option);
        },
        error: function (err) {
            console.log(err);
        }
    });
    /* var data = [
         [
             [28604, 77, 17096869, 'Australia', 1990], [31163, 77.4, 27662440, 'Canada', 1990], [1516, 68, 1154605773, 'China', 1990], [13670, 74.7, 10582082, 'Cuba', 1990], [28599, 75, 4986705, 'Finland', 1990], [29476, 77.1, 56943299, 'France', 1990], [31476, 75.4, 78958237, 'Germany', 1990], [28666, 78.1, 254830, 'Iceland', 1990], [1777, 57.7, 870601776, 'India', 1990], [29550, 79.1, 122249285, 'Japan', 1990], [2076, 67.9, 20194354, 'North Korea', 1990], [12087, 72, 42972254, 'South Korea', 1990], [24021, 75.4, 3397534, 'New Zealand', 1990], [43296, 76.8, 4240375, 'Norway', 1990], [10088, 70.8, 38195258, 'Poland', 1990], [19349, 69.6, 147568552, 'Russia', 1990], [10670, 67.3, 53994605, 'Turkey', 1990], [26424, 75.7, 57110117, 'United Kingdom', 1990], [37062, 75.4, 252847810, 'United States', 1990]],
         [
             [44056, 81.8, 23968973, 'Australia', 2015], [43294, 81.7, 35939927, 'Canada', 2015], [13334, 76.9, 1376048943, 'China', 2015], [21291, 78.5, 11389562, 'Cuba', 2015], [38923, 80.8, 5503457, 'Finland', 2015], [37599, 81.9, 64395345, 'France', 2015], [44053, 81.1, 80688545, 'Germany', 2015], [42182, 82.8, 329425, 'Iceland', 2015], [5903, 66.8, 1311050527, 'India', 2015], [36162, 83.5, 126573481, 'Japan', 2015], [1390, 71.4, 25155317, 'North Korea', 2015], [34644, 80.7, 50293439, 'South Korea', 2015], [34186, 80.6, 4528526, 'New Zealand', 2015], [64304, 81.6, 5210967, 'Norway', 2015], [24787, 77.3, 38611794, 'Poland', 2015], [23038, 73.13, 143456918, 'Russia', 2015], [19360, 76.5, 78665830, 'Turkey', 2015], [38225, 81.4, 64715810, 'United Kingdom', 2015], [53354, 79.1, 321773631, 'United States', 2015]]
     ];
 */


}

function radarChart() {
    let radarChart = echarts.init($('.radarChart')[0]);
    $.get('./data/data.json', function (res) {
        let avgArr = [], numArr = [], nameArr = [];
        res.geter.radar.forEach(function (v) {
            avgArr.push(v.avg);
            numArr.push(v.num);
            nameArr.push({text: v.name})
        });
        let option = {
            title: {
                text: '用户群体特征信息',
                left: 'center',
                top: '15',
                textStyle: {
                    color: '#fff'//统计图标题的文字颜色
                }
            },
            color: ['#ad46f3', '#5045f6'],
            tooltip: {},
            legend: {
                data: ['观看视频时长', '观看视频人数'],
                show: true, //是否显示图例
                icon: 'circle',//图例形状，示例为原型
                bottom: 15,//图例离底部的距离
                itemWidth: 14, // 图例标记的图形宽度。
                itemHeight: 14, // 图例标记的图形高度。
                itemGap: 20, // 图例每项之间的间隔。
                textStyle: {//图例文字的样式设置
                    fontSize: 14,
                    color: '#ade3ff'
                },
            },

            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        // backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: nameArr,
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: 'rgba(0, 0, 0, 0)'
                    }
                },
                axisLine: { //蛛网轴线上的颜色，由内向外发散的那条
                    lineStyle: {
                        color: '#153269'
                    }
                },
                splitLine: {//蛛网环形的线条颜色
                    lineStyle: {
                        color: '#113865', // 分隔线颜色
                        width: 1, // 分隔线线宽
                    }
                },
            },
            series: [
                {
                    name: '用户群体特征信息',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data: [
                        {
                            value: numArr,
                            name: '观看视频人数'
                        }
                    ],
                    areaStyle: {
                        normal: {
                            color: 'rgba(173, 70, 243, 0.64)'
                            //rgba(80, 69, 246, 0.67)
                        }
                    }

                },
                {
                    name: '用户群体特征信息',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data: [
                        {
                            value: avgArr,
                            name: '观看视频时长'
                        }
                    ],
                    areaStyle: {
                        normal: {
                            color: 'rgba(80, 69, 246, 0.8)'
                        }
                    }

                }]

        };
        console.log(option);
        radarChart.setOption(option)
    })

}

function getNumOfType(arr, type, labelObj) {
    let res = {};
    arr.forEach(function (v, i) {
        // let label = v[type] % 100;
        let label = v[type];
        if (res[label]) {
            res[label]++
        } else {
            res[label] = 1
        }
    });
    if (labelObj) {
        for (let i in res) {
            if (labelObj.hasOwnProperty(i)) {
                res[labelObj[i]] = res[i];
                delete res[i]
            }
        }
    }

    return res;
}


function loadData() {
    let geterData = {};
    let eduObj = {
        0: "高中及以下",
        1: "大专",
        2: "本科",
        3: "研究生及以上"
    };
    let ageObj = {
        1: "18以下",
        2: "18-24",
        3: "25-34",
        4: "35-44",
        5: "45-54",
        6: "55-64",
        7: "64以上"
    };
    let genderLabelObj = {
        1: 'male',
        2: 'female',
        3: 'unknown'
    };
    $.ajax({
        url: "./data/producer/producer.json",
        async: false,
        success: function (res) {
            geterData.data = res;
            geterData.edu = getNumOfType(res.data, "edu", eduObj);
            geterData.age = getNumOfType(res.data, "age", ageObj);
            geterData.gender = getNumOfType(res.data, "gender", genderLabelObj);
            geterData.play = getNumOfType(res.data, "play_time");
            console.log(JSON.stringify(geterData.play));
        }
    });
    return geterData;
}

// loadData();
/*$.ajax({
    url: "./data/geter/geter.json",
    async: false,
    success: function (response) {
        let res = [];
        response.data.forEach(function (v, i) {
            // let label = v[type] % 100;
            let label = v['love_type'];
            if (res[label]) {
                res[label].num++;
                res[label].playTime += v["play_time"];

            } else {
                res[label] = {num: 1, playTime: v["play_time"], name: v["love_type"]}
            }
        });

        res.forEach(function (v, i) {
            v["avg"] = v["playTime"] / v["num"]
        });
        console.log(JSON.stringify(res));
    }
});*/
$(function () {
    // let geterData = loadData();
    mapChart();
    chartL1();
    scatterChart();
    radarChart();
});