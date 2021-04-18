require('./windowApp.less')

const App = {
    data() {
        return {
            startX: 0,
            startY: 0,
            startOffsetX: 0,
            startOffsetY: 0,
            enableDrag: false,
            windowIcon: '',
            windowTitle: 'Title',
            maximum: false,
            originSize: {}
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
            this.startX = event.clientX;
            this.startY = event.clientY;
            this.startOffsetX = this.$refs.windowapp.offsetLeft;
            this.startOffsetY = this.$refs.windowapp.offsetTop;
            this.enableDrag = true;
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
        },
        maximize() {
            console.log('maximize');
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
        }
    },
    render() {
        return (
        <div className="window" ref="windowapp">
            <div className="window-header" onmousedown={this.startDrag} onmousemove={this.drag} onmouseup={this.stopDrag}>
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