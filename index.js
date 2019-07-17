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
    $.get('./geter.json', function (res) {
        let geterObj = res;
        // option.dataset.source = geterObj.geter;
        let genderLabelObj = {
            1: 'male',
            2: 'female',
            3: 'notKnown'
        };
        let data = [];
        geterObj.geter.forEach(function (v, i) {
            data.push(v['o'].split(';').concat(1))

        });
        console.log(data);
        // myChart.setOption(option);
        option.series[0].data = data;
        myChart.setOption(option)
    });

    // console.log(JSON.stringify(genderObj));

}

function chartL1() {
    let geterObj, producerObj;
    let char1 = echarts.init($('.chart1')[0]);
    let char2 = echarts.init($('.chart2')[0]);
    let char3 = echarts.init($('.chart3')[0]);
    let char4 = echarts.init($('.chart4')[0]);

    let optionBar1 = {
        title: {
            text: '注册时长 ',
            x: 'center',
            y: 10,
            textStyle: {
                color: '#B4B4B4',
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
            y: 0,
            textStyle: {
                color: '#B4B4B4',
                fontSize: 16,
                fontWeight: 'normal',
            },

        },
        color: ['#213B7A', '#54FEFE', '#0097EE', '#3D4969', '#35CEBA'],

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
                }
            }
        }]
    };

    $.get('./data.json', function (res) {
        geterObj = res.geter;
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
    });

    $.get('./producer.json', function (res) {
        producerObj = res;
        myChart.setOption(option);
    });


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
                res[labelObj[i]] = res[i]
                delete res[i]
            }
        }
    }

    return res;
}

$(function () {
    mapChart();
    chartL1();
});