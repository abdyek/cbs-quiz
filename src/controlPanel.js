const DATA = {
    drawingTypes : [
        {
            id:0,
            name:"Dot",
            value:"dot"
        },
        {
            id:1,
            name:"Line",
            value:"line"
        },
        {
            id:2,
            name:"Shape",
            value:"shape"
        }
    ],
    subTypes : {
        "dot": [
            {
                id:0,
                name:"Small",
                value:"small"
            },
            {
                id:1,
                name:"Normal",
                value:"normal"
            },
            {
                id:2,
                name:"Big",
                value:"big"
            }
        ],
        "line": [
            {
                id:0,
                name:"Solid",
                value:"solid"
            },
            {
                id:1,
                name:"Dotted",
                value:"dotted"
            },
            {
                id:2,
                name:"Dashed",
                value:"dashed"
            }
        ],
        "shape": [
            {
                id:0,
                name:"Type 1",
                value:"type-1"
            },
            {
                id:1,
                name:"Type 2",
                value:"type-2"
            },
            {
                id:2,
                name:"Type 3",
                value:"type-3"
            }
        ]
    },
    "colors": [
        {
            id:0,
            name:"Red",
            value:"red"
        },
        {
            id:1,
            name:"Green",
            value:"green"
        },
        {
            id:2,
            name:"Blue",
            value:"blue"
        },
        {
            id:3,
            name:"Purple",
            value:"purple"
        },
        {
            id:4,
            name:"White",
            value:"white"
        },
        {
            id:5,
            name:"Black",
            value:"black"
        },
        {
            id:6,
            name:"Yellow",
            value:"yellow"
        },
        {
            id:7,
            name:"Orange",
            value:"orange"
        },
    ]
}

class App extends React.Component {
    constructor(props) {
        super(props);
        let selectedValue = DATA['drawingTypes'][0].value;
        let selectedSubValue = DATA['subTypes'][selectedValue][0].value;
        let selectedColor = DATA['colors'][0].value;
        this.state = {
            selectedType:selectedValue,
            selectedSubType:selectedSubValue,
            color:selectedColor
        }
        this.changeType = this.changeType.bind(this);
        this.changeSubType = this.changeSubType.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }
    changeType(value) {
        console.log("üst");
        this.setState({
            selectedType:value
        })
    }
    changeSubType(value) {
        console.log("alt");
        this.setState({
            selectedSubType:value
        })
    }
    changeColor(value) {
        this.setState({
            color:value
        })
    }
    render() {
        return (
            <div>
                <CanvasComponent selectedType={this.state.selectedType} selectedSubType={this.state.selectedSubType} color={this.state.color}/>
                <Header />
                <div id="controlPanel">
                    <Selector title="Drawing Type" options={DATA['drawingTypes']} changeOption={this.changeType} selected={this.state.selectedType}/>
                    <Selector title="Sub Title" options={DATA['subTypes'][this.state.selectedType]} changeOption={this.changeSubType} selected={this.state.selectedSubType} />
                    <Selector title="Color" options={DATA['colors']} changeOption={this.changeColor} selected={this.state.color}/>
                    <Input title="Properties" />
                </div>
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <h3 id="controlPanelHeader">Control Panel</h3>
        )
    }
}


class Selector extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);;
    }
    handleChange(e) {
        this.props.changeOption(e.target.value);
    }
    render() {
        this.options = [];
        for(let i=0;i<this.props.options.length;i++) {
            this.options.push(
                <option key={this.props.options[i].key} value={this.props.options[i].value}>{this.props.options[i].name}</option>
            )
        }
        return (
            <div class="panelElement">
                <div class="title">{this.props.title}</div>
                <div id="select">
                    <select onChange={this.handleChange} value={this.props.selected}>
                        {this.options}
                    </select>
                </div>
            </div>
        )
    }
}

class Input extends React.Component {
    render() {
        return(
            <div className="panelElement">
                <div class="title">{this.props.title}</div>
                <input type="text" />
            </div>
        )
    }
}

class CanvasComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x:0,
            y:0
        }
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handOnClick = this.handleOnClick.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.updateCanvas = this.updateCanvas.bind(this);
        this.drawStick = this.drawStick.bind(this);
        this.drawRectangle = this.drawRectangle.bind(this);
        this.drawCircle = this.drawCircle.bind(this);
        this.draw = this.draw.bind(this);
    }
    handleMouseMove(e) {
        this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
        //console.log(this.state.x + "-" + this.state.y);
    }
    handleOnClick() {
        console.log("onClick");
    }
    handleMouseEnter() {
        console.log("MouseEnter");
    }
    handleMouseDown() {
        console.log("MouseDown");
    }
    handleMouseUp() {
        console.log("MouseUp");
        this.draw();
    }
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        this.context = this.refs.canvas.getContext('2d');
        //this.context.fillRect(0,0, 100, 100);
        //this.drawStick(100, 100, 500, 500, 5, 'red');
    }
    drawStick(x1, y1, x2, y2, width, color) {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    drawRectangle(x, y, width, height, color) {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x, y+(height/2));
        ctx.lineTo(x+width, y+(height/2));
        ctx.lineWidth = height;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    drawCircle(x, y, radius, color) {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    draw() {
        if(this.props.selectedType=="dot") {
            let radius;
            if(this.props.selectedSubType=="small") {
                radius = 1;
            } else if(this.props.selectedSubType=="normal") {
                radius = 3;
            } else if(this.props.selectedSubType=="big") {
                radius = 5;
            }
            this.drawCircle(this.state.x, this.state.y, radius, this.props.color);
        }
    }
    render() {
        return (
            <canvas id="canvas" ref="canvas" width={1000} height={600}
                onMouseEnter={this.handleMouseEnter}
                onMouseMove={this.handleMouseMove}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onClick={this.handleOnClick}
            />
        );
    }
}

ReactDOM.render (
    <App />,
    document.getElementById("app")
);
