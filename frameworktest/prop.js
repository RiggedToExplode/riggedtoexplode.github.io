var $P = {};

$P.Base = class { //Base class that everything will inherit from
    //Stolen UUID function
    static uuidGen(a) { return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, $P.Base.uuidGen) };


    constructor() {
      this._uuid = $P.Base.uuidGen(); //Generate a UUID
    }


    get uuid() {
      return this._uuid; //Get the private UUID
    }
}

$P.Coord = class { //Basic class to store two coordinates
    static addCoords(coord1, coord2) { //Static method to add two coord objects
      return new $P.Coord(coord1.x + coord2.x, coord1.y + coord2.y);
    }

    static multCoord(coord, factor) { //Static method to multiply a coord by a factor.
      return new $P.Coord(coord.x * factor, coord.y * factor);
    }

    static multCoords(coord1, coord2) { //Static method to multiply two coords together.
      return new $P.Coord(coord1.x * coord2.x, coord1.y * coord2.y);
    }


    constructor(x = 0, y = 0) {
      this._x = x;
      this._y = y;
    }

    
    set x(x) {
      this._x = x;
    }

    set y(y) {
      this._y = y;
    }

    get x() {
      return this._x;
    }

    get y() {
      return this._y;
    }

    copy() { //Method to return new Coord with same ordered pair as this one.
      return new $P.Coord(this._x, this._y);
    }

    toArr() { //Method to return Coord object in array
      return [this._x, this._y];
    }
}

$P.Canvas = class { //Class to deal with canvasses
    constructor(id, width = 200, height = 100) {
      this._id = id; //Save id
      this._el = document.getElementById(id); //Store HTML element
      this._width = width; //Save our width
      this._height = height; //Save our height

      this._el.width = width; //Set element width to match ours
      this._el.height = height; //Set element height to match ours
    }


    set width(width) {
      this._width = width;
      this._el.width = width;
    }

    set height(height) {
      this._height = height;
      this._el.height = height;
    }

    get width() {
      return this._width;
    }

    get height() {
      return this._height;
    }

    get el() {
      return this._el;
    }
}

$P.updateLoop = function(stage, interval = 4) { //Function to initiate an update loop.
    var lastUpdate = Date.now(); //Set the last update.

    window.setInterval(function() {
      let now = Date.now() //Get time now
      let dt = now - lastUpdate; //Find deltaTime
      lastUpdate = now; //Reset last update time

      stage.update(dt); //Update stage.
    }, interval);
}

$P.Prop = class extends $P.Base {
    static toDegrees(radians) { //Static conversion utility
      return (radians / Math.PI) * 180;
    }
  
    static toRadians(degrees) { //Static conversion utility.
      return (degrees / 180) * Math.PI;
    }
  
    static perSecond(val) { //Static conversion utility for readability.
      return val / 1000;
    }
  
  
    constructor(pos = new $P.Coord(0, 0), radians = 0, bounds = [new $P.Coord(-10, -10), new $P.Coord(10, -10), new $P.Coord(10, 10), new $P.Coord(-10, 10)]) {
      super(); //Invoke inheritance constructor
  
      this._pos = pos; //xy coords pos
      this._radians = radians; //radians of rotation
      this._bounds = bounds; //hitbox/bounds/collision etc.
      this._stage; //Initialize stage variable.
    }
  
  
    set _x(x) {
      this._pos.x = x;
    }
  
    set _y(y) {
      this._pos.y = y;
    }
  
    set x(x) { //set x coord
      this._pos.x = x;
    }
  
    set y(y) { //set y coord
      this._pos.y = y;
    }
  
    set radians(radians) { //set radians
      this._radians = radians;
    }
  
    set degrees(degrees) { //convert & set radians
      this._radians = $P.Prop.toRadians(degrees);
    }
  
    set _degrees(degrees) { //convert & set radians
      this._radians = $P.Prop.toRadians(degrees);
    }
  
    set bounds(bounds) { //set bounds
      this._bounds = bounds;
    }
  
    set stage(stage) { //set stage
      this._stage = stage;
    }
  
    get _x() {
      return this._pos.x;
    }
  
    get _y() {
      return this._pos.y;
    }
  
    get x() { //get x coord
      return this._pos.x;
    }
  
    get y() { //get y coord
      return this._pos.y;
    }
  
    get radians() { //get radians
      return this._radians;
    }
  
    get degrees() { //convert & get degrees
      return $P.Prop.toDegrees(this._radians);
    }
  
    get _degrees() { //convert & get degrees
      return $P.Prop.toDegrees(this._radians);
    }
  
    get bounds() { //get bounds
      return this._bounds;
    }
  
    get stage() { //get stage
      return this._stage;
    }
  
    get index() {
      if (this.stage) {
        return this.stage.props.indexOf(this);
      } else {
        return -1;
      }
    }
  
    get _index() {
      if (this.stage) {
        return this.stage.props.indexOf(this);
      } else {
        return -1;
      }
    }
  
  
    move(vect) {
      this._pos = $P.Coord.addCoords(this._pos, vect);
      return this._pos;
    }
  
    rotate(radians) {
      this._radians += radians;
      if (this._radians >= 2 * Math.PI) {
        this._radians -= 2 * Math.PI;
        return this._radians;
      }
  
      if (this._radians < 0) {
        this._radians += 2 * Math.PI;
        return this._radians;
      }
    }
  
    rotateDegrees(degrees) {
      this._degrees += degrees;
      if (this._radians >= 2 * Math.PI) {
        this._radians -= 2 * Math.PI;
        return this._degrees;
      }
  
      if (this._radians < 0) {
        this._radians += 2 * Math.PI;
        return this._degrees;
      }
    }
  
    beforeUpdate() {
  
    }
  
    update(dt) { //default update function
      this.rotateDegrees($P.Prop.perSecond(180) * dt);
    }
  
    afterUpdate() {
  
    }
  
    draw(ctx, rel) { //default draw function
      ctx.save()
  
      ctx.translate(rel.x, rel.y)
      ctx.rotate(this._radians);
  
      ctx.beginPath();
      ctx.moveTo(this._bounds[0].x, this._bounds[0].y);
  
      for (var i = 1; i < this._bounds.length; i++) {
        ctx.lineTo(this._bounds[i].x, this._bounds[i].y);
      }
  
      ctx.lineTo(this._bounds[0].x, this._bounds[0].y);
      ctx.closePath();
  
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }
  
    init() {}
  
    destroy() {}
}

$P.Stage = class extends $P.Base {
    constructor() {
      super(); //Invoke inheritance constructor
  
      this._props = []; //Props on this stage
    }
  
  
    get props() {
      return this._props;
    }
  
  
    getIndex(prop) { //Get index of prop in the stage's _props array.
      return this._props.indexOf(prop);
    }
  
    addProp(prop, index = -1, quiet = false) { //Add prop to stage
      let len;
      if (index >= 0) { //insert prop at specific index if provided
        this._props.splice(index, 0, prop); //Add prop at index
        len = this._props.length; //Get length
      } else {
        len = this._props.push(prop); //Add prop && get length
      }
      prop.stage = this; //set prop's stage as this stage
      prop.init(quiet); //Init the prop
      return len; //Return the length of props array
    }
  
    addProps(arr, index = -1, quiet = false) { //Add array of props to stage
      if (index >= 0) { //Add props at specific index
        for (var i in arr) { //Iterate through given array
          this._props.splice(index, 0, arr[i]); //Add prop at given index
          arr[i].stage = this; //Set prop stage
          arr[i].init(quiet); //Init prop
        }
      } else { //Push props to end
        for (var i in arr) { //Iterate through array
          this._props.push(arr[i]); //Add prop
          arr[i].stage = this; //Set prop stage
          arr[i].init(quiet); //Init prop
        }
      }
      return this._props.length; //Return length of props array
    }
  
    removeProp(prop, quiet = false) { //Remove by direct comparison
      let index = prop.index; //Get index of prop
  
      if (index !== -1) { //index will = -1 if prop is not in props array
        this._props[index].destroy(quiet); //Call destroy function of prop in question
        this._props[index].stage = null; //set prop as having no stage
        this._props.splice(index, 1); //Remove prop
        return index; //Return index that prop was at.
      }
  
      return false; //Return false for failure
    }
  
    removePropByID(uuid, quiet = false) { //Remove by UUID comparison
      for (var i in this._props) { //Iterate over all props in props array
        if (this._props[i].uuid === uuid) { //Compare UUIDs
          this._props[i].destroy(quiet); //Call destroy function of prop in question
          this._props[i].stage = null; //set prop as having no stage
          let prop = this._props.splice(i, 1)[0]; //Remove and save prop
          return { prop: prop, index: i }; //Return the prop and index of prop in an object.
        }
      }
  
      return false; //Return false for failure.
    }
  
    removePropByIndex(index, quiet = false) { //Remove at a specific index
      if (this._props[index]) { //Verify index in order to avoid error when calling destroy()
        this._props[index].destroy(quiet); //Call destroy function of prop
        this._props[index].stage = null; //set prop as having no stage
        let prop = this._props.splice(index, 1)[0]; //Remove and save prop
        return prop; //Return removed prop
      }
  
      return false; //Return false for failure
    }
  
    moveProp(curIndex, newIndex) { //Move prop in props array (emulates z-index due to for/in function)
      let prop = this._props.splice(curIndex, 1)[0];
      let index;
  
      if (newIndex < 0 || newIndex >= this._props.length) {
        index = this._props.push(prop) - 1;
        return index;
      }
  
      this._props.splice(newIndex, 0, prop);
      return newIndex;
    }
  
  
    update(dt) { //Cascading update function
      for (var i in this._props) {
        this._props[i].beforeUpdate(dt);
      }
  
      for (i in this._props) {
        this._props[i].update(dt);
      }
  
      for (i in this._props) {
        this._props[i].afterUpdate(dt);
      }
  
      return true;
    }
}

$P.Camera = class extends $P.Base {
    constructor(stage, canvas, stagePos = new $P.Coord(-100, -50), canvasPos = new $P.Coord(0, 0), dimensions = new $P.Coord(200, 100), scale = new $P.Coord(1, 1), clip = true) {
      super(); //Invoke inheritance constructor
  
      this._canvas = canvas;
      this._ctx = this._canvas.el.getContext("2d");
      this._stage = stage;
  
      this._stagePos = stagePos; //Set position of camera on stage
      this._canvasPos = canvasPos; //Set position of camera on canvas
      this._dimensions = dimensions; //Set camera dimensions
      this._scale = scale; //Set scale of camera
      this._clip = clip; //Set whether or not camera clips to its dimensions.
      this._back = "black"; //Camera background color
      this._stroke = ""; //Camera stroke color
      this._lineWidth = 1;
    }
  
  
    //A lot of setters and getters. Most importantly, they just break up the Coord objects into single values for readability etc.
    set canvas(canvas) {
      this._canvas = canvas;
      this._ctx = this._canvas.el.getContext("2d");
    }
  
    set stage(stage) {
      this._stage = stage;
    }
  
    set stagePos(pos) {
      this._stagePos = pos;
    }
  
    set canvasPos(pos) {
      this.canvasPos = pos;
    }
  
    set width(width) {
      this._dimensions.x = width;
    }
  
    set height(height) {
      this._dimensions.y = height;
    }
  
    set dimensions(dimensions) {
      this._dimensions = dimensions;
    }
  
    set scale(scale) {
      this._scale = scale;
    }
  
    set clip(clip) {
      this._clip = clip;
    }
  
    set back(back) {
      this._back = back;
    }
  
    set stroke(stroke) {
      this._stroke = stroke;
    }
  
    set lineWidth(width) {
      this._lineWidth = width;
    }
  
    get canvas() {
      return this._canvas;
    }
  
    get stage() {
      return this._stage;
    }
  
    get stagePos() {
      return this._stagePos;
    }
  
    get canvasPos() {
      return this._canvasPos;
    }
  
    get width() {
      return this._dimensions.x;
    }
  
    get height() {
      return this._dimensions.y;
    }
  
    get dimensions() {
      return this._dimensions;
    }
  
    get scale() {
      return this._scale;
    }
  
    get clip() {
      return this._clip;
    }
  
    get back() {
      return this._back;
    }
  
    get stroke() {
      return this._stroke;
    }
  
    get lineWidth() {
      return this._lineWidth;
    }
  
    center(coord) { //Center the Camera on a given stage position
      this._stagePos.x = coord.x - this._dimensions.x / 2; //Center the x position
      this._stagePos.y = coord.y - this._dimensions.y / 2; //Center the y position
      return this._stagePos; //Return the new position
    }
  
    draw() {
      this._ctx.save(); //Save the context because we will be doing rotations, etc.
  
      this._ctx.beginPath(); //Begin the path
  
      if (this._back) { //If we have a background color, draw it.
        this._ctx.fillStyle = this._back; //Set color
        this._ctx.fillRect(this._canvasPos.x, this._canvasPos.y, this._dimensions.x, this._dimensions.y); //Draw the background
      }
  
      if (this._stroke) { //If we have a stroke color, draw it.
        this._ctx.strokeStyle = this._stroke; //Set the color
        this._ctx.lineWidth = this._lineWidth; //Set the width
        this._ctx.strokeRect(this._canvasPos.x, this._canvasPos.y, this._dimensions.x, this._dimensions.y); //Draw the outline
      }
  
      if (this._clip) { //If this Camera is set to clip, then clip.
        this._ctx.rect(this._canvasPos.x, this._canvasPos.y, this._dimensions.x, this._dimensions.y); //Set the rectangle
        this._ctx.clip(); //Clip the drawing
      }
  
      this._ctx.scale(this._scale.x, this._scale.y); //Scale the context
  
      this._ctx.strokeStyle = "black"; //Set default stroke value for Props
      this._ctx.fillStyle = "green"; //Set default fill value for Props
  
      for (var i in this._stage.props) { //For each Prop
        let prop = this._stage.props[i]; //Save the prop for readability
        let rel = new $P.Coord(prop.x - this._stagePos.x, prop.y - this._stagePos.y); //Set rel as the distance the Prop is from the Camera's stagePos
        rel.x += this._canvasPos.x / this._scale.x; //Add the Camera's position on the Canvas to the rel value and scale the value up/down by the Camera's scale
        rel.y += this._canvasPos.y / this._scale.y;
  
        prop.draw(this._ctx, rel); //Tell the Prop to draw itself, and pass the important parameters.
      }
  
      this._ctx.closePath(); //Close the path
      this._ctx.restore(); //Restore the context
    }
}

export default $P;