class Game
    constructor: (@doc = document) ->

    init: ->
      @canvas = @doc.createElement 'canvas'
      @doc.body.appendChild @canvas

    resize: (h = '320', w = '240') ->
      @canvas.height = h
      @canvas.width  = w

    context: (dim = '2d') ->
      @canvas.getContext dim

