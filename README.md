# Triangles

## Options

### Coloring modes

#### Single color

```js
coloring: {
  mode: 'single',
  color: '#ffc107'
}
```


#### Radial gradient

```js
coloring: {
  mode: 'radialGradient',
  start: {
    x: 480,
    y: 360
  },
  end: {
    x: 0,
    y: 0
  },
  stops: [
    [0, '#ffc107'],
    [0.25, '#03a9f4'],
    [0.5, '#8bc34a'],
    [0.75, '#ffc107'],
    [1, '#f44336']
  ]
}
```


#### Spots

```js
coloring: {
  mode: 'spots',
  spots: [
    {
      x: 0,
      y: 0,
      color: '#ffc107'
    },
    {
      x: 1280,
      y: 0,
      color: '#f44336'
    },
    {
      x: 640,
      y: 720,
      color: '#2196f3'
    }
  ],
  spotStrength: 2.5,
}
```
