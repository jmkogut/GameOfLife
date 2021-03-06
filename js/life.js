// Generated by CoffeeScript 1.6.1
var Life,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Life = (function(_super) {

  __extends(Life, _super);

  function Life() {
    return Life.__super__.constructor.apply(this, arguments);
  }

  Life.prototype.gen = null;

  Life.prototype.size = 7;

  Life.prototype.cells = {
    x: 46,
    y: 46
  };

  Life.prototype.chance = function() {
    return Math.random() < 0.5;
  };

  Life.prototype._tick = 100;

  Life.prototype.start = function() {
    this.init();
    this.resize();
    return this.seed();
  };

  Life.prototype.resize = function() {
    var x, y, _ref;
    _ref = [this.size * (this.cells.x + 2), this.size * (this.cells.y + 2)], x = _ref[0], y = _ref[1];
    return Life.__super__.resize.call(this, x, y);
  };

  Life.prototype.$ = function(x, y, alive) {
    return {
      x: x,
      y: y,
      alive: alive
    };
  };

  Life.prototype.newCell = function(x, y) {
    return this.setCell(this.$(x, y, this.chance()));
  };

  Life.prototype.getCell = function(x, y) {
    return this.gen[x][y];
  };

  Life.prototype.setCell = function(_arg) {
    var alive, x, y;
    x = _arg.x, y = _arg.y, alive = _arg.alive;
    if (x === 0 || y === 0 || x === this.cells.x + 2 || y === this.cells.y + 2) {
      alive = false;
    }
    if (y === 0) {
      this.gen[x] = [];
    }
    return this.gen[x][y] = this.$(x, y, alive);
  };

  Life.prototype.copyCell = function(_arg) {
    var alive, x, y;
    x = _arg.x, y = _arg.y, alive = _arg.alive;
    return {
      alive: alive,
      x: x,
      y: y
    };
  };

  Life.prototype.operate = function(oper, all) {
    var X, Y, x, y, _i, _ref, _results;
    if (all == null) {
      all = false;
    }
    _ref = [1, 1, this.cells.x + 1, this.cells.y + 1], x = _ref[0], y = _ref[1], X = _ref[2], Y = _ref[3];
    if (all) {
      x-- && y-- && X++ && Y++;
    }
    return _.each((function() {
      _results = [];
      for (var _i = x; x <= X ? _i <= X : _i >= X; x <= X ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this), function(xx) {
      var _j, _results1;
      return _.each((function() {
        _results1 = [];
        for (var _j = y; y <= Y ? _j <= Y : _j >= Y; y <= Y ? _j++ : _j--){ _results1.push(_j); }
        return _results1;
      }).apply(this), function(yy) {
        return oper(xx, yy);
      });
    });
  };

  Life.prototype.each = function(method, all) {
    var self;
    if (all == null) {
      all = false;
    }
    self = this;
    return this.operate(function(x, y) {
      var cell;
      cell = self.getCell(x, y);
      return method(cell);
    }, all);
  };

  Life.prototype.seed = function() {
    var _this = this;
    console.log('Seeding');
    this.gen = [];
    return this.operate(function(x, y) {
      return _this.newCell(x, y);
    }, true);
  };

  Life.prototype.tick = function() {
    console.log('Tick');
    this.draw();
    return this.step();
  };

  Life.prototype.log = function(m) {
    return console.log(m);
  };

  Life.prototype.draw = function() {
    var ctx,
      _this = this;
    this.log("Draw");
    ctx = this.context();
    this.each(function(cell) {
      var fill, x, y, _ref;
      fill = cell.alive ? 'rgb(242,198,65)' : 'rgb(38,38,38)';
      _ref = [_this.size * cell.x, _this.size * cell.y], x = _ref[0], y = _ref[1];
      ctx.strokeStyle = 'rgba(242,198,65,0.1)';
      ctx.strokeRect(x, y, _this.size, _this.size);
      ctx.fillStyle = fill;
      return ctx.fillRect(x, y, _this.size, _this.size);
    });
    ctx.stroke();
    return ctx.fill();
  };

  Life.prototype.step = function() {
    var nextGen, self;
    self = this;
    nextGen = [];
    this.each(function(_arg) {
      var alive, x, y;
      x = _arg.x, y = _arg.y, alive = _arg.alive;
      if (y === 0) {
        nextGen[x] = [];
      }
      return nextGen[x][y] = self.evolve(x, y);
    }, true);
    return this.gen = nextGen;
  };

  Life.prototype.evolve = function(x, y) {
    var cell, next, num;
    if (x === 0 || y === 0 || x === this.cells.x + 2 || y === this.cells.y + 2) {
      return this.getCell(x, y);
    }
    cell = this.getCell(x, y);
    next = this.copyCell(cell);
    num = _.size(this.liveNeighbors(cell));
    if (cell.alive || num === 3) {
      next.alive = (1 < num && num < 4);
    }
    return next;
  };

  Life.prototype.neighbors = function(x, y) {
    return [this.gen[x - 1][y - 1], this.gen[x][y - 1], this.gen[x + 1][y - 1], this.gen[x - 1][y], this.gen[x][y], this.gen[x + 1][y], this.gen[x - 1][y + 1], this.gen[x][y + 1], this.gen[x + 1][y + 1]];
  };

  Life.prototype.isAlive = {
    alive: true
  };

  Life.prototype.liveNeighbors = function(_arg) {
    var alive, x, y;
    x = _arg.x, y = _arg.y, alive = _arg.alive;
    return _.where(this.neighbors(x, y), this.isAlive);
  };

  return Life;

})(Game);
