### 界面属性列表

    {
        title: 标题
        width: 界面宽度 px/%
        height: 界面高度 px/%
        top: 上边距 px
        bottom: 下边距 px
        left: 左边距 px
        right: 右边距 px
        background:{ 背景
            type: image/color/gradients
        }
        padding:  内边距 top/bottom/left/right
        grid: { grid布局
            col: 总列数
            row: 总行数
        }
    }


### 元素属性列表

    {
        id: id 系统随机生成
        index: 序号
        title: 标题
        type: echarts/text/colScroll/rowScroll/line
        layout:{ 布局配置集合
            size:{ 大小
                width: 宽
                height: 高
            }
            location:{ 定位
                type: absolute/grid
                top: absolute需提供
                left: absolute需提供
                col: grid需提供
                row: grid需提供
            }
            rotate:{ 旋转
                angle：角度
            }
            flex:{ 内部元素对齐方式
                justifyContent: 横向
                alignContent: 纵向
            }
        }
        font: { 字体配置集合
            size: 大小
            weight: 粗细
            italics: 倾斜
            underLine: 下划线
            overline: 上划线
            lineThrough: 删除线
            color: 颜色
            textAlign: 位置
        }
        style: { 其他样式集合
            background:{ 背景
                type: image/color/gradients
            }
            border: 边框
            shadow: 阴影
            custom: 其他自定义样式
        }
        tmplConfig:{
            具体模版配置项目
        }
    }