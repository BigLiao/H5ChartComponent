# H5ChartComponent
使用了canvas 、JavaScript 和 CSS3，可自定义数据生成图表。
## 支持
1. 水平柱状图
2. 垂直柱状图
3. 饼图
4. 雷达图
5. 折线图
6. 环形图

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
   
