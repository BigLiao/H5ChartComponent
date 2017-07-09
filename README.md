# H5ChartComponent
使用了canvas 、JavaScript 和 CSS3，可自定义数据生成图表。
## 支持
1. 水平柱状图（bar）
2. 垂直柱状图（bar_v）
3. 饼图（pie）
4. 雷达图（radar）
5. 折线图（line）
6. 环形图（ring）

## 使用方法
```
var chart1 = new Chart('bar', {
        type: 'bar',
        width: '300px',
        height: '100px',
        animation: true,
        data: [{
            name: 'JavaScript',
            rate: 0.4,
            color: 'green'
        }, {
            name: 'CSS',
            rate: 0.2,
            color: 'yellow',
        }, {
            name: 'HTML',
            rate: 0.6,
            color: 'red',
        },{
            name: 'Bootstrap',
            rate: 0.7,
            color: '#432453',
        },{
            name: 'AngularJS',
            rate: 1,
            color: 'blue',
        }],
        style: {}
    });
    var demo1 = document.getElementsByClassName('demo1')[0];
    demo1.appendChild(chart1);
```
## 参数
```
type: 'pie',    //图表类型
width: 'auto',   //宽度
height: 'auto',  //高度
data: [{    //展示的数据
    name: 'test',  //数据项目名称
    rate: 1,    //数据占比
    color: 'black'   //项目颜色
}]
```
