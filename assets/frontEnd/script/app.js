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
            name: "Thin",
            value: "thin"
        }, {
            id: 1,
            name: "Normal",
            value: "normal"
        }, {
            id: 2,
            name: "Thick",
            value: "thick"
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
        _this.clearCanvas = _this.clearCanvas.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: "changeType",
        value: function changeType(value) {
            var selectedSubValue = DATA['subTypes'][value][0].value;
            this.setState({
                selectedType: value,
                selectedSubType: selectedSubValue
            });
        }
    }, {
        key: "changeSubType",
        value: function changeSubType(value) {
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
        key: "clearCanvas",
        value: function clearCanvas() {
            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(CanvasComponent, { selectedType: this.state.selectedType, selectedSubType: this.state.selectedSubType, color: this.state.color }),
                React.createElement(
                    "div",
                    { id: "controlPanel" },
                    React.createElement(
                        "h3",
                        { id: "controlPanelHeader" },
                        "Control Panel"
                    ),
                    React.createElement(Selector, { title: "Drawing Type", options: DATA['drawingTypes'], changeOption: this.changeType, selected: this.state.selectedType }),
                    React.createElement(Selector, { title: "Sub Title", options: DATA['subTypes'][this.state.selectedType], changeOption: this.changeSubType, selected: this.state.selectedSubType }),
                    React.createElement(Selector, { title: "Color", options: DATA['colors'], changeOption: this.changeColor, selected: this.state.color }),
                    React.createElement(
                        "button",
                        { onClick: this.clearCanvas },
                        "Clear"
                    )
                )
            );
        }
    }]);

    return App;
}(React.Component);

var Selector = function (_React$Component2) {
    _inherits(Selector, _React$Component2);

    function Selector(props) {
        _classCallCheck(this, Selector);

        var _this2 = _possibleConstructorReturn(this, (Selector.__proto__ || Object.getPrototypeOf(Selector)).call(this, props));

        _this2.handleChange = _this2.handleChange.bind(_this2);;
        return _this2;
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

var Input = function (_React$Component3) {
    _inherits(Input, _React$Component3);

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

var CanvasComponent = function (_React$Component4) {
    _inherits(CanvasComponent, _React$Component4);

    function CanvasComponent(props) {
        _classCallCheck(this, CanvasComponent);

        var _this4 = _possibleConstructorReturn(this, (CanvasComponent.__proto__ || Object.getPrototypeOf(CanvasComponent)).call(this, props));

        _this4.otherAttributes = {
            'line': {
                clicked: false,
                firstDot: {
                    x: null,
                    y: null
                }
            }
        };
        _this4.state = {
            x: 0,
            y: 0
        };
        _this4.handleMouseMove = _this4.handleMouseMove.bind(_this4);
        _this4.handleMouseUp = _this4.handleMouseUp.bind(_this4);
        _this4.drawStick = _this4.drawStick.bind(_this4);
        _this4.drawRectangle = _this4.drawRectangle.bind(_this4);
        _this4.drawCircle = _this4.drawCircle.bind(_this4);
        _this4.drawShape1 = _this4.drawShape1.bind(_this4);
        _this4.drawShape2 = _this4.drawShape2.bind(_this4);
        _this4.drawShape3 = _this4.drawShape3.bind(_this4);
        _this4.draw = _this4.draw.bind(_this4);
        return _this4;
    }

    _createClass(CanvasComponent, [{
        key: "handleMouseMove",
        value: function handleMouseMove(e) {
            this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
        }
    }, {
        key: "handleMouseUp",
        value: function handleMouseUp() {
            this.draw();
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
        key: "drawShape1",
        value: function drawShape1(x, y, color) {
            var ctx = this.refs.canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 10, y + 30);
            ctx.lineTo(x + 30, y + 30);
            ctx.closePath();
            ctx.lineWidth = 10;
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.fill();
        }
    }, {
        key: "drawShape2",
        value: function drawShape2(R, cX, cY, N, color) {
            var ctx = this.refs.canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(cX + R, cY);
            for (var i = 1; i <= N * 2; i++) {
                if (i % 2 == 0) {
                    var theta = i * (Math.PI * 2) / (N * 2);
                    var x = cX + R * Math.cos(theta);
                    var y = cY + R * Math.sin(theta);
                } else {
                    var theta = i * (Math.PI * 2) / (N * 2);
                    var x = cX + R / 2 * Math.cos(theta);
                    var y = cY + R / 2 * Math.sin(theta);
                }
                ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.fill();
            ctx.stroke();
        }
    }, {
        key: "drawShape3",
        value: function drawShape3(x, y, color) {
            var ctx = this.refs.canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 30, y);
            ctx.lineTo(x + 60, y + 30);
            ctx.lineTo(x, y + 30);
            ctx.closePath();
            ctx.lineWidth = 10;
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.fill();
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
            } else if (this.props.selectedType == "line") {
                if (this.otherAttributes['line'].clicked) {
                    this.otherAttributes['line'].clicked = false;
                    firstDot = this.otherAttributes['line'].firstDot;
                    var width = void 0;
                    if (this.props.selectedSubType == "thin") {
                        width = 1;
                    } else if (this.props.selectedSubType == "normal") {
                        width = 3;
                    } else if (this.props.selectedSubType == "thick") {
                        width = 5;
                    }
                    this.drawStick(firstDot.x, firstDot.y, this.state.x, this.state.y, width, this.props.color);
                } else {
                    this.otherAttributes['line'].clicked = true;
                    this.otherAttributes['line'].firstDot.x = this.state.x;
                    this.otherAttributes['line'].firstDot.y = this.state.y;
                }
            } else if (this.props.selectedType == "shape") {
                if (this.props.selectedSubType == "type-1") {
                    this.drawShape1(this.state.x, this.state.y, this.props.color);
                } else if (this.props.selectedSubType == "type-2") {
                    this.drawShape2(10, this.state.x, this.state.y, 5, this.props.color);
                } else if (this.props.selectedSubType == "type-3") {
                    this.drawShape3(this.state.x, this.state.y, this.props.color);
                }
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("canvas", { id: "canvas", ref: "canvas", width: 1000, height: 600,
                onMouseMove: this.handleMouseMove,
                onMouseUp: this.handleMouseUp
            });
        }
    }]);

    return CanvasComponent;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));