require('./windowApp.less')

const App = {
    data() {
        return {
            startX: 0,
            startY: 0,
            startWidth: 0,
            startHeight: 0,
            startOffsetX: 0,
            startOffsetY: 0,
            enableDrag: false,
            windowIcon: '',
            windowTitle: 'Title',
            maximum: false,
            originSize: {},
            isResize: false,
            cursor: 'default',
            startCursor: 'default'
        }
    },
    mounted() {
        let windowapp = this.$refs.windowapp;
        windowapp.style.width = '800px';
        windowapp.style.height = '500px';
        windowapp.style.top = 0;
        windowapp.style.left = 0;
    },
    methods: {
        startDrag(event) {
            this.enableDrag = true;

            document.onmousemove = this.drag;
            document.onmouseup = this.stopDrag;
        }, 
        drag(event) {
            if(!this.enableDrag) return;
            let x = event.clientX - this.startX;
            let y = event.clientY - this.startY;
            if(Math.abs(x) > 10 || Math.abs(y) > 10) {
                this.$refs.windowapp.style.left = (this.startOffsetX + x) + 'px';
                this.$refs.windowapp.style.top = (this.startOffsetY + y) + 'px';
            }
        },
        stopDrag(event) {
            this.drag(event);
            this.enableDrag = false;
            document.onmousemove = null;
            document.onmouseup = null;
        },
        maximize() {
            let windowapp = this.$refs.windowapp;

            if(this.maximum) {
                windowapp.style.top = this.originSize.top;
                windowapp.style.bottom = 'unset';
                windowapp.style.left = this.originSize.left;
                windowapp.style.right = 'unset';
                windowapp.style.width = this.originSize.width;
                windowapp.style.height = this.originSize.height;
            } else {
                this.originSize = {
                    width: windowapp.style.width,
                    height: windowapp.style.height,
                    top: windowapp.style.top,
                    left: windowapp.style.left
                }

                windowapp.style.top = 0;
                windowapp.style.bottom = 0;
                windowapp.style.left = 0;
                windowapp.style.right = 0;
                windowapp.style.width = 'unset';
                windowapp.style.height = 'unset';
            }

            this.maximum = !this.maximum;
        },
        hover(event) {
            let windowapp = this.$refs.windowapp;
            let cursor = 'default';
            let leftMargin = event.clientX - windowapp.offsetLeft;
            let rightMargin = windowapp.offsetLeft + windowapp.offsetWidth - event.clientX;
            let topMargin = event.clientY - windowapp.offsetTop;
            let bottomMargin = windowapp.offsetTop + windowapp.offsetHeight - event.clientY;

            if(leftMargin < 5) {
                if(topMargin < 5) {
                    cursor = 'nw-resize';
                } else if(bottomMargin < 5) {
                    cursor = 'sw-resize';
                } else {
                    cursor = 'w-resize';
                }
            } else if(rightMargin < 5) {
                if(topMargin < 5) {
                    cursor = 'ne-resize';
                } else if(bottomMargin < 5) {
                    cursor = 'se-resize';
                } else {
                    cursor = 'e-resize';
                }
            } else if(topMargin < 5) {
                cursor = 'n-resize';
            } else if(bottomMargin < 5) {
                cursor = 's-resize';
            }

            this.isResize = cursor !== 'default';
            this.cursor = cursor;

            windowapp.style.cursor = cursor;
        },
        resize(event) {
            this.startCursor = this.cursor;
            document.onmousemove = this.resizemove;
            document.onmouseup = this.resizeend;
        },
        resizemove(event) {
            let windowapp = this.$refs.windowapp;
            let x = event.clientX - this.startX;
            let y = event.clientY - this.startY;
            let width = this.startWidth;
            let height = this.startHeight;

            switch(this.startCursor){
                case 'nw-resize':
                    windowapp.style.left = (this.startOffsetX + x) + 'px';
                    windowapp.style.width = (width - x) + 'px';
                    windowapp.style.top = (this.startOffsetY + y) + 'px';
                    windowapp.style.height = (height - y) + 'px';
                    break;
                case 'n-resize':
                    windowapp.style.top = (this.startOffsetY + y) + 'px';
                    windowapp.style.height = (height - y) + 'px';
                    break;
                case 'w-resize':
                    windowapp.style.left = (this.startOffsetX + x) + 'px';
                    windowapp.style.width = (width - x) + 'px';
                    break;
                case 'sw-resize':
                    windowapp.style.left = (this.startOffsetX + x) + 'px';
                    windowapp.style.width = (width - x) + 'px';
                    // windowapp.style.top = (this.startOffsetY + y) + 'px';
                    windowapp.style.height = (height + y) + 'px';
                    break;
                case 's-resize':
                    windowapp.style.height = (height + y) + 'px';
                    break;
                case 'se-resize':
                    windowapp.style.width = (width + x) + 'px';
                    windowapp.style.height = (height + y) + 'px';
                    break;
                case 'e-resize':
                    windowapp.style.width = (width + x) + 'px';
                    break;
                case 'ne-resize':
                    windowapp.style.width = (width + x) + 'px';
                    windowapp.style.top = (this.startOffsetY + y) + 'px';
                    windowapp.style.height = (height - y) + 'px';
                    break;
            }
        },
        resizeend(event) {
            this.resizemove(event);
            document.onmousemove = null;
            document.onmouseup = null;
        },
        mousedown(event) {
            this.startX = event.clientX;
            this.startY = event.clientY;
            this.startOffsetX = this.$refs.windowapp.offsetLeft;
            this.startOffsetY = this.$refs.windowapp.offsetTop;

            let windowapp = this.$refs.windowapp;
            let width = windowapp.style.width;
            if(width.includes('px')) {
                width = parseInt(width.slice(0, width.length - 2));
            } else {
                width = parseInt(width);
            }
            let height = windowapp.style.height;
            if(height.includes('px')) {
                height = parseInt(height.slice(0, height.length - 2));
            } else {
                height = parseInt(height);
            }
            this.startWidth = width;
            this.startHeight = height;

            if(this.isResize) {
                this.resize(event);
            } else {
                this.startDrag(event);
            }
        }
    },
    render() {
        return (
        <div className="window" ref="windowapp" onmousedown={this.mousedown} onmousemove={this.hover}>
            <div className="window-header" onmousedown={this.mousedown} ondblclick={this.maximize}>
                <div className="window-icon">
                    <i class="el-icon-picture"></i>
                </div>
                <div className="window-title">{this.windowTitle}</div>
                <div className="window-action">
                    <div className="window-action-button">
                        <i class="el-icon-question"></i>
                    </div>
                    <div className="window-action-button">
                        <i class="el-icon-minus"></i>
                    </div>
                    <div className="window-action-button" onclick={this.maximize}>
                        <i className={this.maximum ? "el-icon-copy-document" : "el-icon-full-screen"}></i>
                    </div>
                    <div className="window-action-button">
                        <i class="el-icon-close"></i>
                    </div>
                </div>
            </div>
            <div className="window-content"></div>
        </div>);
    },
};

export default App;