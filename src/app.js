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
                name:"Thin",
                value:"thin"
            },
            {
                id:1,
                name:"Normal",
                value:"normal"
            },
            {
                id:2,
                name:"Thick",
                value:"thick"
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
        this.clearCanvas = this.clearCanvas.bind(this);
    }
    changeType(value) {
        let selectedSubValue = DATA['subTypes'][value][0].value;
        this.setState({
            selectedType:value,
            selectedSubType:selectedSubValue,
        })
    }
    changeSubType(value) {
        this.setState({
            selectedSubType:value
        })
    }
    changeColor(value) {
        this.setState({
            color:value
        })
    }
    clearCanvas(){
        let canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    render() {
        return (
            <div>
                <CanvasComponent selectedType={this.state.selectedType} selectedSubType={this.state.selectedSubType} color={this.state.color}/>
                <div id="controlPanel">
                    <h3 id="controlPanelHeader">Control Panel</h3>
                    <Selector title="Drawing Type" options={DATA['drawingTypes']} changeOption={this.changeType} selected={this.state.selectedType}/>
                    <Selector title="Sub Title" options={DATA['subTypes'][this.state.selectedType]} changeOption={this.changeSubType} selected={this.state.selectedSubType} />
                    <Selector title="Color" options={DATA['colors']} changeOption={this.changeColor} selected={this.state.color}/>
                    <button onClick={this.clearCanvas}>Clear</button>
                </div>
            </div>
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
        this.otherAttributes = {
            'line':{
                clicked:false,
                firstDot: {
                    x:null,
                    y:null
                }
            }
        }
        this.state = {
            x:0,
            y:0
        }
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.drawStick = this.drawStick.bind(this);
        this.drawRectangle = this.drawRectangle.bind(this);
        this.drawCircle = this.drawCircle.bind(this);
        this.drawShape1 = this.drawShape1.bind(this);
        this.drawShape2 = this.drawShape2.bind(this);
        this.drawShape3 = this.drawShape3.bind(this);
        this.draw = this.draw.bind(this);
    }
    handleMouseMove(e) {
        this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }
    handleMouseUp() {
        this.draw();
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
    drawShape1(x, y, color) {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x+10, y+30);
        ctx.lineTo(x+30, y+30);
        ctx.closePath();
        ctx.lineWidth = 10;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
    }
    drawShape2(R, cX, cY, N, color) {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(cX + R,cY);
        for(var i = 1; i <= N * 2; i++) {
            if(i % 2 == 0){
                var theta = i * (Math.PI * 2) / (N * 2);
                var x = cX + (R * Math.cos(theta));
                var y = cY + (R * Math.sin(theta));
            } else {
                var theta = i * (Math.PI * 2) / (N * 2);
                var x = cX + ((R/2) * Math.cos(theta));
                var y = cY + ((R/2) * Math.sin(theta));
            }
            ctx.lineTo(x ,y);
        }
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.fill();
        ctx.stroke();
    }
    drawShape3(x, y, color) {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x+30, y);
        ctx.lineTo(x+60, y+30);
        ctx.lineTo(x, y+30);
        ctx.closePath();
        ctx.lineWidth = 10;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
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
        } else if(this.props.selectedType=="line") {
            if(this.otherAttributes['line'].clicked) {
                this.otherAttributes['line'].clicked = false;
                firstDot = this.otherAttributes['line'].firstDot;
                let width;
                if(this.props.selectedSubType=="thin") {
                    width = 1;
                } else if(this.props.selectedSubType=="normal") {
                    width = 3;
                } else if(this.props.selectedSubType=="thick") {
                    width = 5;
                }
                this.drawStick(firstDot.x, firstDot.y, this.state.x, this.state.y, width, this.props.color);
            } else {
                this.otherAttributes['line'].clicked = true;
                this.otherAttributes['line'].firstDot.x = this.state.x;
                this.otherAttributes['line'].firstDot.y = this.state.y;
            }
        } else if(this.props.selectedType=="shape") {
            if(this.props.selectedSubType=="type-1") {
                this.drawShape1(this.state.x, this.state.y, this.props.color);
            } else if(this.props.selectedSubType=="type-2") {
                this.drawShape2(10, this.state.x, this.state.y, 5, this.props.color);
            } else if(this.props.selectedSubType=="type-3") {
                this.drawShape3(this.state.x, this.state.y, this.props.color);
            }
        }
    }
    render() {
        return (
            <canvas id="canvas" ref="canvas" width={1000} height={600}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp}
            />
        );
    }
}

ReactDOM.render (
    <App />,
    document.getElementById("app")
);
