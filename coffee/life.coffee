class Life extends Game
    gen: null
    size: 7
    cells:
      x: 46
      y: 46
    chance:-> Math.random() < 0.5
    _tick: 100

    start: ->
      #console.log 'damn it'
      do @init
      do @resize
      do @seed

    resize: ->
      [x, y] = [ @size * (@cells.x+2),
                 @size * (@cells.y+2) ]
      super x, y

    $: (x, y, alive) ->
      x: x
      y: y
      alive: alive

    newCell: (x, y) ->
      @setCell @$ x, y, do @chance

    getCell: (x, y) -> @gen[x][y]

    setCell: ({x, y, alive}) ->
      if x is 0           or y is 0          or
         x is @cells.x+2  or y is @cells.y+2
        alive = false
      
        #console.log "set: #{x}, #{y} alive=#{alive}"

      @gen[x] = [] if y is 0
      @gen[x][y] = @$ x, y, alive

    copyCell: ({x, y, alive})->
      alive: alive
      x: x
      y: y

    operate: (oper, all=false) ->
      #console.log 'foooooo'
      [x, y, X, Y] = [1, 1, @cells.x+1, @cells.y+1]
      if all then x-- and y-- and X++ and Y++
      #console.log "Operating #{x}, #{X}  -  #{y}, #{Y}"
      
      _.each [x..X],   (xx) ->
        _.each [y..Y], (yy)->
          #console.log "#{xx} #{yy}"
          oper xx, yy

    each: (method, all=false) ->
      self = this
      @operate (x, y) ->
        cell = self.getCell x, y
        method cell
      , all

    seed: ->
      console.log 'Seeding'
      @gen = []
      @operate (x,y) =>
        @newCell x, y
      , true

    tick: ->
      console.log 'Tick'
      do @draw
      do @step

      #setTimeout @tick, @_tick
    log: (m) ->
      console.log m
    draw: ->
      @log "Draw"
      ctx = do @context
      @each (cell) =>
        fill =
          if cell.alive
            'rgb(242,198,65)'
          else
            'rgb(38,38,38)'

        [x, y] = [@size * cell.x,
                  @size * cell.y]

        ctx.strokeStyle = 'rgba(242,198,65,0.1)'
        ctx.strokeRect x, y, @size, @size
        ctx.fillStyle = fill
        ctx.fillRect x, y, @size, @size

      do ctx.stroke
      do ctx.fill

    step: ->
      self = this
      nextGen = []
      @each ({x, y, alive}) ->
        nextGen[x] = [] if y is 0
        #console.log "#{x}, #{y}"
        nextGen[x][y] = self.evolve x, y
      , true
      @gen = nextGen

    evolve: (x, y) ->
      if x is 0 or y is 0 or x is @cells.x+2 or y is @cells.y+2
        return @getCell x, y

      cell = @getCell x, y
      next = @copyCell cell
      num  = _.size @liveNeighbors cell
      if cell.alive or num is 3
        next.alive = 1 < num < 4
      next

    neighbors: (x, y) ->
      [ @gen[x-1][y-1], @gen[x][y-1], @gen[x+1][y-1],
        @gen[x-1][y],   @gen[x][y],   @gen[x+1][y],
        @gen[x-1][y+1], @gen[x][y+1], @gen[x+1][y+1] ]

    isAlive:
      alive:true

    liveNeighbors: ({x, y, alive}) ->
      _.where (@neighbors x, y), @isAlive
