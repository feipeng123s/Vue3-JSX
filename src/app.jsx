require('./app.less')
import WindowApp from './windowApp.jsx';

// const App = () => <div>Vue 3.0</div>;
const App = {
    methods: {
        dragover(event) {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move'
        }
    },
    render() {
        return <div className="root">
            <WindowApp></WindowApp>
        </div>;
    },
};

export default App;