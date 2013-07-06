window.onload = (e) ->
  console.log 'Window loaded #{e}'
  life = new Life()
  do life.start

  TheLoop life

TheLoop = (l) ->
  do l.tick
  setTimeout TheLoop, l._tick, l
