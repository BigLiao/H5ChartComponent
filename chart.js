//图表构造函数
var Chart = function(name, config){
    this.option = {
        type: 'pie',    //图表类型
        width: 'auto',   //宽度
        height: 'auto',  //高度
        data: [{    //展示的数据
            name: 'test',  //数据项目名称
            rate: 1,    //数据占比
            color: 'black'   //项目颜色
        }],
        style: {},  //组件的样式
    };

    if (config) {
        for (i in config) {
            this.option[i] = config[i]
        }
    } else {
        console.log('参数错误');
        return;
    }

    //总数
    this.total = this.option.data.reduce(function(a, b){
        return a + b.rate
    }, 0);

    this.chart = document.createElement('div');
    this.chart.className = 'chart chart_' + name + ' chart_' + this.option.type;

    this.chooseChart(this.option.type);

    return this.chart;
};


//选择图表类型
Chart.prototype.chooseChart = function (type) {
    switch (type) {
        case 'bar' :
            this.barChart();
            break;
        case 'bar_v' :
            this.barVChart();
            break;
        case 'pie' :
            this.pieChart();
            break;
        case 'line' :
            this.lineChart();
            break;
        case 'radar' :
            this.radarChart();
            break;
        case 'ring' :
            this.ringChart();
            break;
    }
};

//条形图（水平）
Chart.prototype.barChart = function () {
    var that = this;
    var chart = this.chart;
    var total = this.total;

    this.option.data.forEach(function (item) {

        var line = document.createElement('div');
        line.className = 'bar_line';
        var name = document.createElement('div');
        name.className = 'bar_name';
        var rate = document.createElement('div');
        rate.className = 'bar_rate';
        var rateBg = document.createElement('div');
        rateBg.className = 'bar_rate_bg';
        var per = document.createElement('div');
        per.className = 'bar_per';

        name.innerText = item.name;
        per.innerText = (item.rate /total * 100).toFixed(0) + '%';

        rate.appendChild(rateBg);
        rate.appendChild(per);

        if (item.color) {
            rateBg.style.backgroundColor = item.color;
        }
        rate.style.width = that.option.width;
        rateBg.style.width = (item.rate /total * 100).toFixed(0) + '%';

        chart.appendChild(line);
        line.appendChild(name);
        line.appendChild(rate);


        //载入动画
        if (that.option.animation) {
            rateBg.style.transition = 'all 2s';
            per.style.transition = 'all 1s 2s';
            rateBg.style.width = '0px';
            per.style.opacity = '0';
            chart.addEventListener('load', function () {
                rateBg.style.width = (item.rate /total * 100).toFixed(0) + '%';
                per.style.opacity = '1';
            }, false);
            chart.addEventListener('leave', function () {
                rateBg.style.width = '0px';
                per.style.opacity = '0';
            }, false);
        }

    });



};

//条形图（垂直）
Chart.prototype.barVChart = function () {
    var that = this;
    var chart = this.chart;
    var total = this.total;

    this.option.data.forEach(function (item) {

        var line = document.createElement('div');
        line.className = 'bar_v_line';
        var name = document.createElement('div');
        name.className = 'bar_v_name';
        var rate = document.createElement('div');
        rate.className = 'bar_v_rate';
        var rateBg = document.createElement('div');
        rateBg.className = 'bar_v_rate_bg';
        var per = document.createElement('div');
        per.className = 'bar_v_per';

        name.innerText = item.name;
        per.innerText = (item.rate /total * 100).toFixed(0) + '%';

        rate.appendChild(rateBg);
        rate.appendChild(per);

        if (item.color) {
            rateBg.style.backgroundColor = item.color;
        }

        line.style.width = that.option.width.slice(0, -2) / that.option.data.length + 'px';
        rate.style.height = that.option.height;
        rateBg.style.height = (item.rate /total * 100).toFixed(0) + '%';

        chart.appendChild(line);
        line.appendChild(rate);
        line.appendChild(name);


        //载入动画
        if (that.option.animation) {
            rateBg.style.transition = 'all 2s';
            per.style.transition = 'all 1s 2s';
            rateBg.style.height = '0px';
            per.style.opacity = '0';
            // document.body.offsetWidth;
            chart.addEventListener('load', function () {
                rateBg.style.height = (item.rate /total * 100).toFixed(0) + '%';
                per.style.opacity = '1';
            }, false);
            chart.addEventListener('leave', function () {
                rateBg.style.height = '0px';
                per.style.opacity = '0';
            }, false);
        } else {
            rateBg.style.height = (item.rate /total * 100).toFixed(0) + '%';
            per.style.opacity = '1';
        }

    });
};

//饼图
Chart.prototype.pieChart = function () {
    var chart = this.chart;
    var total = this.total;
    var config = this.option;

    chart.style.width = this.option.width;
    chart.style.height = this.option.height;

    var caption = document.createElement('div');
    caption.className = 'caption';
    chart.append(caption);

    var w = this.option.width.slice(0,-2) * 2;
    var h = this.option.height.slice(0,-2) * 2;
    var r = w / 2 - 50;
    var PI = Math.PI;
    var sin = Math.sin;
    var cos = Math.cos;
    var step = this.option.data.length;
    var colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink', 'yellow'];

    //绘制背景层
    var cvs = document.createElement('canvas');
    var ctx = cvs.getContext('2d');
    cvs.setAttribute('id', 'bgCanvas');
    cvs.width = ctx.width = w;
    cvs.height = ctx.height = h;
    chart.append(cvs);

    ctx.beginPath();
    ctx.fillStyle = '#ececec';
    ctx.strokeStyle = '#ececec';
    ctx.lineWidth = 1;
    ctx.arc(w/2, h/2, r, 0, 2*PI);
    ctx.fill();
    ctx.stroke();


    //绘制文字层
    var cvs = document.createElement('canvas');
    cvs.setAttribute('id', 'textCanvas');
    var ctx = cvs.getContext('2d');
    cvs.width = ctx.width = w;
    cvs.height = ctx.height = h;
    chart.appendChild(cvs);

    var sAngel = 0;
    var eAngel = 0;
    var mAngel = 0;
    //保存文字的位置，用于计算是否重叠
    var textPos = [];
    for (var i = 0; i< step; i++) {
        var item = config.data[i];
        var rate = item.rate / total;

        var name =document.createElement('div');
        name.className = 'name';
        name.innerText = item.name;
        var per =document.createElement('div');
        per.className = 'per';
        per.innerText = (item.rate / total * 100).toFixed(0) + '%';
        name.appendChild(per);
        caption.appendChild(name);

        ctx.beginPath();
        sAngel = eAngel;
        eAngel = sAngel + 2*PI * rate;
        mAngel = sAngel + PI * rate;
        var x = w/2 + r * cos(mAngel);
        var y = h/2 + r * sin(mAngel);
        var dx1, dx2, dy1, dy2;
        // 需要偏移的位置
        // var moveX = 0;
        //有很大缺陷，放弃修改
        var moveheight = 40;
        var moveWidth = 80;
        var moveY = function (currentX, currentY) {
            if (i === 0) return 0;
            var prevX = textPos[i-1].x;
            var prevY = textPos[i-1].y;
            //在下方重叠
            if (currentY > prevY && currentY < prevY + moveheight && (currentX < prevX && currentX > prevX - moveWidth || currentX > prevX && currentX < prevX + moveWidth)) {
                console.log(i+ '下方');
                return -moveheight;
            }
            // 在上方重叠
            if (currentY < prevY && currentY > prevY - moveheight && (currentX < prevX && currentX > prevX - moveWidth || currentX > prevX && currentX < prevX + moveWidth)) {
                console.log(i+ '上方');
                return -moveheight;
            }
            return 0;
        };
        if (x < w/2) {
            dx1 = -20;
            dx2 = -40;
            name.style.right = (w - x - dx2 + 10) / 2 + 'px';
        } else {
            dx1 = 20;
            dx2 = 40;
            name.style.left = (x + dx2 + 10) / 2 + 'px';
        }
        if (y < h/2) {
            dy1 = dy2 = -30;
            dy1 = dy2 += moveY(x+dx2,y+dy2);
            name.style.bottom = (h - y - dy2 - 40) / 2 + 'px';
        } else {
            dy1 = dy2 = 30;
            dy1 = dy2 += moveY(x+dx2,y+dy2);
            name.style.top = (y + dy2 - 20) / 2 + 'px';
        }

        textPos.push({x: x+dx2, y:y+dy2});
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx1, y + dy1);
        ctx.lineTo(x + dx2, y + dy2);
        ctx.strokeStyle = item.color || colors.pop();
        ctx.stroke();

    }


    // 数据层
    var cvs = document.createElement('canvas');
    var ctx = cvs.getContext('2d');
    cvs.width = ctx.width = w;
    cvs.height = ctx.height = h;
    chart.appendChild(cvs);





    var draw = function (per) {
        ctx.clearRect(0, 0, w, h);
        var sAngel = 0;
        var eAngel = 0;
        for (var i = 0; i< step; i++) {
            var item = config.data[i];
            var rate = item.rate / total;
            ctx.beginPath();
            ctx.moveTo(w/2, h/2);
            sAngel = eAngel;
            eAngel = sAngel + 2*PI * rate * per;
            ctx.arc(w/2, h/2, r, sAngel, eAngel);
            ctx.closePath();
            ctx.fillStyle = item.color || colors.pop();
            ctx.fill();
        }
    };

    // draw(1);
    //支持动画
    if (this.option.animation) {
        chart.className += ' chart_pie_leave';
        chart.addEventListener('load', function () {
            chart.className = chart.className.replace('chart_pie_leave', 'chart_pie_load');
            var s = 0;
            for (var i = 0; i < 100; i++) {
                setTimeout(function () {
                    s += 0.01;
                    if (s > 0.99) s = 1;
                    draw(s);
                }, 10 * i + 500);
            }
        }, false);

        chart.addEventListener('leave', function () {
            chart.className = chart.className.replace('chart_pie_load', 'chart_pie_leave');
            var s = 1;
            for (var i = 0; i < 100; i++) {
                setTimeout(function () {
                    s -= 0.01;
                    if (s < 0.01) s = 0;
                    draw(s);
                }, 5 * i);
            }
        }, false);
    } else {
        draw(1);
    }
};

//折线图
Chart.prototype.lineChart = function () {
    var that = this;
    var chart = this.chart;
    var total = this.total;
    var config = this.option;

    var caption = document.createElement('div');
    caption.className = 'caption';
    chart.appendChild(caption);

    chart.style.width = this.option.width;
    chart.style.height = this.option.height;

    var w = this.option.width.slice(0,-2) * 2;
    var h = this.option.height.slice(0,-2) * 2;

    //创建画布，制作网格线背景
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.heighr = h;

    // 水平网格线 10份
    var step = 10;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#888';

    for (var i = 0; i < step + 1; i++) {
        var y = h / step * i;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
    //垂直网格线, 根据项目个数
    step = this.option.data.length + 1;
    var row_w = w / step;
    for (var i = 0; i < step + 1; i++) {
        var x = row_w * i;
        var item = this.option.data[i];
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        //创建水平轴文字
        var name = document.createElement('div');
        name.className = 'name';
        if (item && item.name) {
            name.innerText = item.name;
            name.style.width = row_w / 2 + 'px';
            caption.appendChild(name);
        }
    }
    ctx.closePath();
    ctx.stroke();
    chart.appendChild(canvas);

    //加入画布 数据层
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.heighr = h;
    chart.append(canvas);

    var draw = function (per) {
        //清空画布
        ctx.clearRect(0,0,w,h);

        //画线
        ctx.beginPath();
        ctx.moveTo(w / step, h - h * config.data[0].rate / total * per);
        for (var i = 0; i < config.data.length; i++) {
            var item = config.data[i];
            x = row_w * (i + 1);
            y = h - h * item.rate / total * per;
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#ff6587';
        ctx.lineWidth = 1;
        ctx.stroke();

        //绘制阴影
        ctx.lineTo(x, h);
        ctx.lineTo(row_w, h);
        ctx.fillStyle = 'rgba(255, 130, 100, 0.2)';
        ctx.fill();

        //画数据点
        var x = 0, y = 0;
        step = config.data.length + 1;
        for (var i = 0; i < config.data.length; i++) {
            ctx.beginPath();
            var item = config.data[i];
            x = row_w * (i + 1);
            y = h - h * item.rate / total * per;
            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = '#fff';
            ctx.strokeStyle = '#ff6587';
            ctx.stroke();
            ctx.fill();

            //加文字
            var text = (item.rate / total * 100).toFixed(0) + '%';
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.font = 'normal 20px sans-serif';
            if (item.color) {
                ctx.fillStyle = item.color;
            }
            ctx.fillStyle = '#ff6587';
            ctx.fillText(text, x - 10, y - 25);


        }

        ctx.stroke();
    };

    //支持动画
    if (config.animation) {
        chart.className += ' chart_line_leave';
        chart.addEventListener('load', function () {
            chart.className = chart.className.replace('chart_line_leave', 'chart_line_load');
            var s = 0;
            for (var i = 0; i < 100; i++) {
                setTimeout(function () {
                    s += 0.01;
                    draw(s);
                }, 10*i + 500);
            }
        }, false);

        chart.addEventListener('leave', function () {
            chart.className = chart.className.replace('chart_line_leave', 'chart_line_load');
            var s = 1;
            for (var i = 0; i < 100; i++) {
                setTimeout(function () {
                    s -= 0.01;
                    draw(s);
                }, 10*i);
            }
        }, false);

    } else {
        draw(1);
    }
};

//雷达图
Chart.prototype.radarChart = function () {
    var chart = this.chart;
    var total = this.total;
    var config = this.option;

    chart.style.width = this.option.width;
    chart.style.height = this.option.height;

    var caption = document.createElement('div');
    caption.className = 'caption';
    chart.append(caption);

    var w = this.option.width.slice(0,-2) * 2;
    var h = this.option.height.slice(0,-2) * 2;
    var r = w / 2 - 50;
    var PI = Math.PI;
    var sin = Math.sin;
    var cos = Math.cos;
    var step = this.option.data.length;
    var n = config.data.length;
    var deg =2 * PI / n;

    //绘制背景层
    var cvs = document.createElement('canvas');
    var ctx = cvs.getContext('2d');
    cvs.width = ctx.width = w;
    cvs.height = ctx.height = h;
    chart.append(cvs);

    //设置圆心为坐标原点
    ctx.translate(w/2,h/2);

    //绘制多边形;
    var drawPolygon = function (n, r) {
        ctx.beginPath();
        ctx.moveTo(0, -r);
        for (var i = 0; i < n; i++) {
            ctx.lineTo(r * cos(PI / 2 - deg * (i + 1)), -r * sin(PI / 2 - deg * (i + 1)));
        }
        ctx.closePath();
        ctx.fill();
    };

    var isBlue = false;
    for (var i = 5; i > 0; i--) {
        ctx.fillStyle = !isBlue ? '#BFDDFA' : '#DBF3FD';
        isBlue = !isBlue;
        drawPolygon(n, r*i/5);
    }

    // 绘制伞骨
    ctx.beginPath();
    for (var i = 0; i < n; i++) {
        ctx.moveTo(0,0);
        var x = r * cos(PI / 2 - deg * i);
        var y = -r * sin(PI / 2 - deg * i);
        ctx.lineTo(x, y);

        //增加标题文字
        var name = document.createElement('div');
        name.className = 'name';
        name.innerText = config.data[i].name
        caption.appendChild(name);
        if (x > 0) {
            name.style.left = x/2 + w/4 + 'px';
        } else {
            name.style.right = w/2 - x/2 - w/4 + 'px';
        }
        if (y > 0) {
            name.style.top = y/2 + h/4 + 'px';
        } else {
            name.style.bottom = h/2 - y/2 - h/4 + 'px';
        }
    }
    ctx.closePath();
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    //写数据文字
    for (var i = 0; i < n; i++) {
        var item = config.data[i];
        var rate = (config.data[i].rate / total);
        x = r * rate * cos(PI / 2 - deg * (i));
        y =  -r * rate * sin(PI / 2 - deg * (i));
        var per = document.createElement('div');
        per.className = 'rate';
        per.innerText = (item.rate / total * 100).toFixed(1) + '%';
        caption.appendChild(per);
        //位置判断 根据不同位置设置不同对齐
        if (x > 0) {
            per.style.left = x/2 + w/4 + 'px';
        } else {
            per.style.right =  w/2 - x/2 - w/4 + 'px';
        }
        if (y > 0) {
            per.style.top = y/2 + h/4 + 'px';
        } else {
            per.style.bottom = h/2 - y/2 - h/4 + 'px';
        }
    }


    //数据层
    var cvs = document.createElement('canvas');
    var ctx = cvs.getContext('2d');
    cvs.width = ctx.width = w;
    cvs.height = ctx.height = h;
    chart.append(cvs);
    ctx.translate(w/2,h/2);

    var draw = function (per) {
        //清空画布
        ctx.clearRect(w/(-2), h/(-2) , w , h );

        //划线
        ctx.beginPath();
        for (var i = 0; i < n; i++) {
            var rate = (config.data[i].rate / total) * per;
            var x = r * rate * cos(PI / 2 - deg * (i));
            var y =  -r * rate * sin(PI / 2 - deg * (i));
            ctx.lineTo(x, y);
        }
        ctx.lineTo(0, -r * (config.data[0].rate / total) * per);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#f96754';
        ctx.stroke();
        ctx.fillStyle = 'rgba(299,96,46,0.2)';
        ctx.fill();
        ctx.closePath();

        //画点
        for (var i = 0; i < n; i++) {
            var rate = (config.data[i].rate / total) * per;
            var x = r * rate * cos(PI / 2 - deg * (i));
            var y =  -r * rate * sin(PI / 2 - deg * (i));
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2*PI);
            ctx.fillStyle = '#f96754';
            ctx.fill();
            ctx.closePath();
        }
    };

    if (this.option.animation) {
        chart.className += ' chart_radar_leave';
        chart.addEventListener('load', function () {
            chart.className = chart.className.replace('chart_radar_leave', 'chart_radar_load');
            var s = 0;
            for (var i = 0; i < 100; i++) {
                setTimeout(function () {
                    s += 0.01;
                    if (s > 0.99) s = 1;
                    draw(s);
                }, 10 * i + 500);
            }
        }, false);

        chart.addEventListener('leave', function () {
            chart.className = chart.className.replace('chart_radar_load', 'chart_radar_leave');
            var s = 1;
            for (var i = 0; i < 100; i++) {
                setTimeout(function () {
                    s -= 0.01;
                    if (s < 0.01) s = 0;
                    draw(s);
                }, 5 * i);
            }
        }, false);
    } else {
        draw(1);
    }
};

//环形图
Chart.prototype.ringChart = function () {
    var chart = this.chart;
    var config = this.option;

    chart.style.width = this.option.width;
    chart.style.height = this.option.height;

    var caption = document.createElement('div');
    caption.className = 'caption';
    chart.append(caption);

    var w = this.option.width.slice(0,-2) * 2;
    var h = this.option.height.slice(0,-2) * 2;
    var r = w / 2 - 50;
    var PI = Math.PI;

    //绘制背景层
    var cvs = document.createElement('canvas');
    var ctx = cvs.getContext('2d');
    cvs.width = ctx.width = w;
    cvs.height = ctx.height = h;
    chart.appendChild(cvs);
    cvs.style.zIndex = 1;

    ctx.beginPath();
    ctx.fillStyle = '#c9e3f7';
    ctx.strokeStyle = '#c9e3f7';
    ctx.lineWidth = 1;
    ctx.arc(w/2, h/2, r, 0, 2*PI);
    ctx.fill();
    ctx.stroke();

    //绘制遮罩层
    var cvs = document.createElement('canvas');
    var ctx = cvs.getContext('2d');
    cvs.width = ctx.width = w;
    cvs.height = ctx.height = h;
    chart.appendChild(cvs);
    cvs.style.zIndex = 3;

    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#ffffff';
    ctx.arc(w/2, h/2, r * 0.8, 0, 2*PI);
    ctx.fill();
    ctx.stroke();

    var name = document.createElement('div');
    name.className = 'name';
    name.innerText = config.data[0].name;
    caption.appendChild(name);
    var per =document.createElement('div');
    per.className = 'per';
    per.innerText = (config.data[0].rate * 100).toFixed(0) + '%';
    caption.appendChild(per);

    // 数据层
    var cvs = document.createElement('canvas');
    var ctx = cvs.getContext('2d');
    cvs.width = ctx.width = w;
    cvs.height = ctx.height = h;
    chart.appendChild(cvs);
    cvs.style.zIndex = 2;

    var rate = config.data[0].rate;
    var draw = function (per) {
        ctx.clearRect(0, 0, w, h);
        var sAngel = -PI / 2;
        var rAngel = sAngel + PI * rate * per;
        var lAngel = sAngel - PI * rate * per;
        ctx.beginPath();
        ctx.moveTo(w/2, h/2);
        ctx.arc(w/2, h/2, r, sAngel, lAngel, true);
        ctx.moveTo(w/2, h/2);
        ctx.arc(w/2, h/2, r, sAngel, rAngel);
        ctx.closePath();
        ctx.fillStyle = '#ff7676';
        ctx.fill();
    };
    if (this.option.animation) {
        chart.className += ' chart_ring_leave';
        chart.addEventListener('load', function () {
            chart.className = chart.className.replace('chart_ring_leave', 'chart_ring_load');
            var s = 0;
            for (var i = 0; i < 100; i++) {
                setTimeout(function () {
                    s += 0.01;
                    if (s > 0.99) s = 1;
                    draw(s);
                }, 10 * i + 500);
            }
        }, false);

        chart.addEventListener('leave', function () {
            chart.className = chart.className.replace('chart_ring_load', 'chart_ring_leave');
            var s = 1;
            for (var i = 0; i < 100; i++) {
                setTimeout(function () {
                    s -= 0.01;
                    if (s < 0.01) s = 0;
                    draw(s);
                }, 5 * i);
            }
        }, false);
    } else {
        draw(1);
    }
};
