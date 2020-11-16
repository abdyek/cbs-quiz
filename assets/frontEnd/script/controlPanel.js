var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DATA = {
    drawingTypes: [{
        id: 0,
        name: "Dot",
        value: "dot"
    }, {
        id: 1,
        name: "Line",
        value: "line"
    }, {
        id: 2,
        name: "Shape",
        value: "shape"
    }],
    subTypes: {
        "dot": [{
            id: 0,
            name: "Small",
            value: "small"
        }, {
            id: 1,
            name: "Normal",
            value: "normal"
        }, {
            id: 2,
            name: "Big",
            value: "big"
        }],
        "line": [{
            id: 0,
            name: "Solid",
            value: "solid"
        }, {
            id: 1,
            name: "Dotted",
            value: "dotted"
        }, {
            id: 2,
            name: "Dashed",
            value: "dashed"
        }],
        "shape": [{
            id: 0,
            name: "Type 1",
            value: "type-1"
        }, {
            id: 1,
            name: "Type 2",
            value: "type-2"
        }, {
            id: 2,
            name: "Type 3",
            value: "type-3"
        }]
    },
    "colors": [{
        id: 0,
        name: "Red",
        value: "red"
    }, {
        id: 1,
        name: "Green",
        value: "green"
    }, {
        id: 2,
        name: "Blue",
        value: "blue"
    }, {
        id: 3,
        name: "Purple",
        value: "purple"
    }, {
        id: 4,
        name: "White",
        value: "white"
    }, {
        id: 5,
        name: "Black",
        value: "black"
    }, {
        id: 6,
        name: "Yellow",
        value: "yellow"
    }, {
        id: 7,
        name: "Orange",
        value: "orange"
    }]
};

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        var selectedValue = DATA['drawingTypes'][0].value;
        var selectedSubValue = DATA['subTypes'][selectedValue][0].value;
        var selectedColor = DATA['colors'][0].value;
        _this.state = {
            selectedType: selectedValue,
            selectedSubType: selectedSubValue,
            color: selectedColor
        };
        _this.changeType = _this.changeType.bind(_this);
        _this.changeSubType = _this.changeSubType.bind(_this);
        _this.changeColor = _this.changeColor.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: "changeType",
        value: function changeType(value) {
            console.log("üst");
            this.setState({
                selectedType: value
            });
        }
    }, {
        key: "changeSubType",
        value: function changeSubType(value) {
            console.log("alt");
            this.setState({
                selectedSubType: value
            });
        }
    }, {
        key: "changeColor",
        value: function changeColor(value) {
            this.setState({
                color: value
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(CanvasComponent, { selectedType: this.state.selectedType, selectedSubType: this.state.selectedSubType, color: this.state.color }),
                React.createElement(Header, null),
                React.createElement(
                    "div",
                    { id: "controlPanel" },
                    React.createElement(Selector, { title: "Drawing Type", options: DATA['drawingTypes'], changeOption: this.changeType, selected: this.state.selectedType }),
                    React.createElement(Selector, { title: "Sub Title", options: DATA['subTypes'][this.state.selectedType], changeOption: this.changeSubType, selected: this.state.selectedSubType }),
                    React.createElement(Selector, { title: "Color", options: DATA['colors'], changeOption: this.changeColor, selected: this.state.color }),
                    React.createElement(Input, { title: "Properties" })
                )
            );
        }
    }]);

    return App;
}(React.Component);

var Header = function (_React$Component2) {
    _inherits(Header, _React$Component2);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "h3",
                { id: "controlPanelHeader" },
                "Control Panel"
            );
        }
    }]);

    return Header;
}(React.Component);

var Selector = function (_React$Component3) {
    _inherits(Selector, _React$Component3);

    function Selector(props) {
        _classCallCheck(this, Selector);

        var _this3 = _possibleConstructorReturn(this, (Selector.__proto__ || Object.getPrototypeOf(Selector)).call(this, props));

        _this3.handleChange = _this3.handleChange.bind(_this3);;
        return _this3;
    }

    _createClass(Selector, [{
        key: "handleChange",
        value: function handleChange(e) {
            this.props.changeOption(e.target.value);
        }
    }, {
        key: "render",
        value: function render() {
            this.options = [];
            for (var i = 0; i < this.props.options.length; i++) {
                this.options.push(React.createElement(
                    "option",
                    { key: this.props.options[i].key, value: this.props.options[i].value },
                    this.props.options[i].name
                ));
            }
            return React.createElement(
                "div",
                { "class": "panelElement" },
                React.createElement(
                    "div",
                    { "class": "title" },
                    this.props.title
                ),
                React.createElement(
                    "div",
                    { id: "select" },
                    React.createElement(
                        "select",
                        { onChange: this.handleChange, value: this.props.selected },
                        this.options
                    )
                )
            );
        }
    }]);

    return Selector;
}(React.Component);

var Input = function (_React$Component4) {
    _inherits(Input, _React$Component4);

    function Input() {
        _classCallCheck(this, Input);

        return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
    }

    _createClass(Input, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "panelElement" },
                React.createElement(
                    "div",
                    { "class": "title" },
                    this.props.title
                ),
                React.createElement("input", { type: "text" })
            );
        }
    }]);

    return Input;
}(React.Component);

var CanvasComponent = function (_React$Component5) {
    _inherits(CanvasComponent, _React$Component5);

    function CanvasComponent(props) {
        _classCallCheck(this, CanvasComponent);

        var _this5 = _possibleConstructorReturn(this, (CanvasComponent.__proto__ || Object.getPrototypeOf(CanvasComponent)).call(this, props));

        _this5.state = {
            x: 0,
            y: 0
        };
        _this5.handleMouseEnter = _this5.handleMouseEnter.bind(_this5);
        _this5.handleMouseMove = _this5.handleMouseMove.bind(_this5);
        _this5.handOnClick = _this5.handleOnClick.bind(_this5);
        _this5.handleMouseDown = _this5.handleMouseDown.bind(_this5);
        _this5.handleMouseUp = _this5.handleMouseUp.bind(_this5);
        _this5.updateCanvas = _this5.updateCanvas.bind(_this5);
        _this5.drawStick = _this5.drawStick.bind(_this5);
        _this5.drawRectangle = _this5.drawRectangle.bind(_this5);
        _this5.drawCircle = _this5.drawCircle.bind(_this5);
        _this5.draw = _this5.draw.bind(_this5);
        return _this5;
    }

    _createClass(CanvasComponent, [{
        key: "handleMouseMove",
        value: function handleMouseMove(e) {
            this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
            //console.log(this.state.x + "-" + this.state.y);
        }
    }, {
        key: "handleOnClick",
        value: function handleOnClick() {
            console.log("onClick");
        }
    }, {
        key: "handleMouseEnter",
        value: function handleMouseEnter() {
            console.log("MouseEnter");
        }
    }, {
        key: "handleMouseDown",
        value: function handleMouseDown() {
            console.log("MouseDown");
        }
    }, {
        key: "handleMouseUp",
        value: function handleMouseUp() {
            console.log("MouseUp");
            this.draw();
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.updateCanvas();
        }
    }, {
        key: "updateCanvas",
        value: function updateCanvas() {
            this.context = this.refs.canvas.getContext('2d');
            //this.context.fillRect(0,0, 100, 100);
            //this.drawStick(100, 100, 500, 500, 5, 'red');
        }
    }, {
        key: "drawStick",
        value: function drawStick(x1, y1, x2, y2, width, color) {
            var ctx = this.refs.canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineWidth = width;
            ctx.strokeStyle = color;
            ctx.stroke();
        }
    }, {
        key: "drawRectangle",
        value: function drawRectangle(x, y, width, height, color) {
            var ctx = this.refs.canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(x, y + height / 2);
            ctx.lineTo(x + width, y + height / 2);
            ctx.lineWidth = height;
            ctx.strokeStyle = color;
            ctx.stroke();
        }
    }, {
        key: "drawCircle",
        value: function drawCircle(x, y, radius, color) {
            var ctx = this.refs.canvas.getContext('2d');
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = color;
            ctx.stroke();
        }
    }, {
        key: "draw",
        value: function draw() {
            if (this.props.selectedType == "dot") {
                var radius = void 0;
                if (this.props.selectedSubType == "small") {
                    radius = 1;
                } else if (this.props.selectedSubType == "normal") {
                    radius = 3;
                } else if (this.props.selectedSubType == "big") {
                    radius = 5;
                }
                this.drawCircle(this.state.x, this.state.y, radius, this.props.color);
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("canvas", { id: "canvas", ref: "canvas", width: 1000, height: 600,
                onMouseEnter: this.handleMouseEnter,
                onMouseMove: this.handleMouseMove,
                onMouseDown: this.handleMouseDown,
                onMouseUp: this.handleMouseUp,
                onClick: this.handleOnClick
            });
        }
    }]);

    return CanvasComponent;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));