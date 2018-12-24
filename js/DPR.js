/**
 * 根据window.devicePixelRatio获取像素比
 */
function DPR() {
    if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        return window.devicePixelRatio;
    }
    return 1;
}
/**
 *  将传入值转为整数
 */
function parseValue(value) {
    return parseInt(value, 10);
};
/**
 * 绘制canvas
 */
function drawCanvas(selector) {
    // 获取想要转换的 DOM 节点
    var dom = document.querySelector(selector);
    var box = window.getComputedStyle(dom);
    // DOM 节点计算后宽高
    var width = parseValue(box.width);
    var height = parseValue(box.height);
    // 获取像素比
    var scaleBy = DPR();
    // 创建自定义 canvas 元素
    var canvas = document.createElement('canvas');

    // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
    canvas.width = width * scaleBy;
    canvas.height = height * scaleBy;
    // 设定 canvas css宽高为 DOM 节点宽高
    canvas.style.width = width+'px';
    canvas.style.height = height+'px';
    document.body.appendChild(canvas);
    // 获取画笔
    const context = canvas.getContext('2d');

    // 将所有绘制内容放大像素比倍
    context.scale(scaleBy, scaleBy);

    // 将自定义 canvas 作为配置项传入，开始绘制
    return html2canvas(dom, {
        canvas:canvas,
        useCORS:true
    }).then(function(canvas){
        var url = canvas.toDataURL();
        console.log(url)
        $('#save').attr('src',url);
    });
}