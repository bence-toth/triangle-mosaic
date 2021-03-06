# Triangle mosaic

Generate colorful triangle-based SVG patterns (like this 👇) with ease.

<img src="https://raw.githubusercontent.com/bence-toth/triangle-mosaic/master/readme-assets/header.jpg" alt="Example output with triangles" style="width: 100%" />

## Demo

You can try Triangle mosaic [on the demo page](http://bence-toth.github.io/triangle-mosaic).


## Installation

To install `triangle-mosaic`, run:

```sh
npm install triangle-mosaic
```


## Quick start

You can import `TriangleMosaic` like this:

```js
import TriangleMosaic from 'triangle-mosaic'
```

`TriangleMosaic` is a class and it can be instantiated like this:

```js
const myMosaic = new TriangleMosaic(options)
```

Then you can call the `render` method which returns the SVG code as a string:

```js
const mySvgCode = myMosaic.render()
```

You can also change the options without losing the random-generated variance by calling the `rehydrate` method with the new options. This will also return the new SVG code as a string:

```js
const myNewSvgCode = myMosaic.rehydrate(newOptions)
```


## Options

The `options` parameter of both the constructor and the `rehydrate` method is an object with various options that influence the outcome.

If you haven’t yet, maybe it’s a good time to check out [the demo page](http://bence-toth.github.io/triangle-mosaic) to get a good overview of the features.


### Dimensions and number of tiles

| Member name    | Description                        |
|----------------|------------------------------------|
| `width`        | The width of the output in pixels  |
| `height`       | The height of the output in pixels |
| `xResolution`  | The number of tiles horizontally   |
| `yResolution`  | The number of tiles vertically     |

For example:

```js
const options = {
  ...,
  width:  640,
  height: 480,
  xResolution: 16,
  yResolution: 12,
  ...
}
```

The options `xResolution` and `yResolution` are the only options which cannot be rehydrated without losing the random-generated variance of tiles.


### Variance

| Member name            | Description                                                 |
|------------------------|-------------------------------------------------------------|
| `shapeFuzz`            | Variance factor of grid points (0-1)                        |
| `colorFuzz.hue`        | Variance factor of triangle color hue (0-1)                 |
| `colorFuzz.saturation` | Variance factor of triangle color saturation (0-1)          |
| `colorFuzz.lightness`  | Variance factor of triangle color lightness (0-1)           |
| `colorFuzz.alpha`      | Variance factor of triangle color alpha (0-1)               |
| `diagonals`            | Either `'nw-se'`, `'ne-sw'`, `'alternating'`, or `'random'` |

Variance options control how the triangles can deviate from their original shape and coloring.

The option `shapeFuzz` controls how far the grid points may venture from their original location.

Parameters that belong the object `colorFuzz` control how much the triangle colors may deviate from their original color. This can be controlled along all four axes of the HSLA color representation.

The option `diagonals` controls which diagonals of the squares of the grid are used:
- `'nw-se'` draws the diagonals from the top left corners to the bottom right corners (North-West - South-East)
- `'ne-sw'` draws the diagonals from the top right corners to the bottom left corners (North-East - South-West)
- `'alternating'` draws diagonals alternating, so that no two neighboring squares have the same diagonal
- `'random'` draws diagonals randomly

For example:

```js
const options = {
  ...,
  shapeFuzz: 0.65,
  colorFuzz: {
    hue:        0.1,
    saturation: 0.1,
    lightness:  0.1,
    alpha:      0
  },
  diagonals: 'nw-se',
  ...
}
```


### Coloring

The option `coloring` will decide the original color of the triangles. There are various possibilities here.


#### Coloring mode

| Member name     | Description   |
|-----------------|---------------|
| `coloring.mode` | Coloring mode |

The option `coloring.mode` will decide how the rest of the `coloring` object is interpreted.

The following coloring modes are supported:
- Single color (`single`)
- Linear gradient (`linearGradient`)
- Radial gradient (`radialGradient`)
- Color spots (`spots`)

Their additional options of the `coloring` object are detailed below for each of the coloring modes.


#### Single color

| Member name      | Description                     |
|------------------|---------------------------------|
| `coloring.color` | Base color (hexadecimal format) |

The single color mode only takes a color in hexadecimal color format:

```js
const options = {
  ...,
  coloring: {
    mode:  'single',
    color: '#ffc107'
  },
  ...
}
```


#### Linear and radial gradient

| Member name      | Description                                                                       |
|------------------|-----------------------------------------------------------------------------------|
| `coloring.start` | An object with the location of the gradient’s starting point                      |
| `coloring.end`   | An object with the location of the gradient’s end point                           |
| `coloring.stops` | An array describing all stops of the gradient.                                    |

The linear and radial gradient color modes require three additional options in the `coloring` object:

The options `coloring.start` and `coloring.end` are object that have members `x` and `y` containing the horizontal and vertical coordinates of the gradient’s starting and end points.

The `coloring.stops` option is an array of arrays, where the elements have two items: a location (0-1) and a color (in hexadecimal color format). The locations of the first and the last spot must always be 0 and 1, respectively.

For example:

```js
const options = {
  ...,
  coloring: {
    mode: 'linearGradient', // or 'radialGradient'
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 1280,
      y: 720
    },
    stops: [
      [0,    '#9c27b0'],
      [0.25, '#03a9f4'],
      [0.5,  '#8bc34a'],
      [0.75, '#ffc107'],
      [1,    '#f44336']
    ]
  },
  ...
}
```


#### Spots

| Member name              | Description                                    |
|--------------------------|------------------------------------------------|
| `coloring.spots`         | An array of objects describing all color spots |
| `coloring.spotIntensity` | The default intensity of spots                 |


The `coloring.spots` option is an array of color spots, where the elements have four members:

- `x` and `y` containing the horizontal and vertical coordinates of the color spot

- `color` containing the spot’s color in hexadecimal color format

- `intensity` which represents how much this light spot contributes to individual triangle colors as compared to other spots (0-1)

The `coloring.spotIntensity` (0-1) option sets the intensity for spots that don’t have their individual intensity specified.

For example:

```js
const options = {
  ...,
  coloring: {
    mode: 'spots',
    spotIntensity: 0.5,
    spots: [
      {
        x: 0,
        y: 0,
        color: '#ffc107',
        intensity: 0.65
      },
      {
        x: 1280,
        y: 0,
        color: '#f44336'
        // intensity falls back to 0.5
      },
      {
        x: 640,
        y: 720,
        color: '#2196f3',
        intensity: 0.6
      }
    ]
  },
  ...
}
```


### Full example

```js
import TriangleMosaic from 'triangle-mosaic'

let options = {
  width:  640,
  height: 480,
  xResolution: 12,
  yResolution: 8,
  shapeFuzz: 0.65,
  colorFuzz: {
    hue:        0.1,
    saturation: 0.1,
    lightness:  0.1,
    alpha:      0
  },
  diagonals: 'nw-se',
  coloring: {
    mode: 'linearGradient',
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 640,
      y: 480
    },
    stops: [
      {
        id: 0,
        location: 0,
        color: '#9c27b0'
      },
      {
        id: 1,
        location: 0.25,
        color: '#03a9f4'
      },
      {
        id: 2,
        location: 0.5,
        color: '#8bc34a'
      },
      {
        id: 3,
        location: 0.75,
        color: '#ffc107'
      },
      {
        id: 4,
        location: 1,
        color: '#f44336'
      }
    ]
  }
}

// Render SVG
const myMosaic = new TriangleMosaic(options)
const mySvgCode = myMosaic.render()

console.log(mySvgCode)

// Change options and render SVG again
options.width = 720
options.coloring.end.x = 720
options.shapeFuzz = 0.5
options.colorFuzz.hue = 0

const myNewSvgCode = myMosaic.rehydrate(options)

console.log(myNewSvgCode)
```


## License

Triangle Mosaic is [licensed under MIT](./LICENSE).

The images you create with the library or web-based tool are yours and you may license them in any way you see fit.
