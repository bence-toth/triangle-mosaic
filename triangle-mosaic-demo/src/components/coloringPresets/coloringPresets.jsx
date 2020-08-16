import React from 'react'
import {func, number} from 'prop-types'

import {actions} from '../app/app.state'

const getPresets = ({
  width,
  height
}) => [
  {
    background: '#ff5722',
    colorConfiguration: {
      coloringMode: 'single',
      coloringSingle: {
        color: '#ff5722'
      }
    }
  },
  {
    background: 'linear-gradient(90deg, #ffc107 0%, #f44336 100%)',
    colorConfiguration: {
      coloringMode: 'linearGradient',
      coloringGradient: {
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: width,
          y: 0
        },
        stops: [
          {
            id: 1,
            location: 0,
            color: '#ffc107'
          },
          {
            id: 2,
            location: 1,
            color: '#f44336'
          }
        ]
      }
    }
  },
  {
    background: 'linear-gradient(90deg, #f44336 0%, #ffc107 50%, #f44336 100%)',
    colorConfiguration: {
      coloringMode: 'linearGradient',
      coloringGradient: {
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: width,
          y: 0
        },
        stops: [
          {
            id: 1,
            location: 0,
            color: '#f44336'
          },
          {
            id: 2,
            location: 0.5,
            color: '#ffc107'
          },
          {
            id: 3,
            location: 1,
            color: '#f44336'
          }
        ]
      }
    }
  },
  {
    background: '#ff9800',
    colorConfiguration: {
      coloringMode: 'single',
      coloringSingle: {
        color: '#ff9800'
      }
    }
  },
  {
    background: 'linear-gradient(135deg, #4caf50 0%, #3f51b5 100%)',
    colorConfiguration: {
      coloringMode: 'linearGradient',
      coloringGradient: {
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: width,
          y: height
        },
        stops: [
          {
            id: 1,
            location: 0,
            color: '#4caf50'
          },
          {
            id: 2,
            location: 1,
            color: '#3f51b5'
          }
        ]
      }
    }
  },
  {
    background: 'linear-gradient(-135deg, #3f51b5 0%, #ff9800 50%, #ff5722 100%)',
    colorConfiguration: {
      coloringMode: 'linearGradient',
      coloringGradient: {
        start: {
          x: width,
          y: 0
        },
        end: {
          x: 0,
          y: height
        },
        stops: [
          {
            id: 1,
            location: 0,
            color: '#3f51b5'
          },
          {
            id: 2,
            location: 0.5,
            color: '#ff9800'
          },
          {
            id: 3,
            location: 1,
            color: '#ff5722'
          }
        ]
      }
    }
  },
  {
    background: '#ffeb3b',
    colorConfiguration: {
      coloringMode: 'single',
      coloringSingle: {
        color: '#ffeb3b'
      }
    }
  },
  {
    background: 'linear-gradient(90deg, #9c27b0 0%, #03a9f4 25%, #8bc34a 50%, #ffc107 75%, #f44336 100%)',
    colorConfiguration: {
      coloringMode: 'linearGradient',
      coloringGradient: {
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: width,
          y: 0
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
  },
  {
    background: 'linear-gradient(135deg, #9c27b0 0%, #03a9f4 25%, #8bc34a 50%, #ffc107 75%, #f44336 100%)',
    colorConfiguration: {
      coloringMode: 'linearGradient',
      coloringGradient: {
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: width,
          y: height
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
  },
  {
    background: '#4caf50',
    colorConfiguration: {
      coloringMode: 'single',
      coloringSingle: {
        color: '#4caf50'
      }
    }
  },
  {
    background: 'radial-gradient(closest-corner, #9c27b0, #03a9f4, #8bc34a, #ffc107, #f44336)',
    colorConfiguration: {
      coloringMode: 'radialGradient',
      coloringGradient: {
        start: {
          x: width / 2,
          y: height / 2
        },
        end: {
          x: width,
          y: height
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
  },
  {
    background: 'radial-gradient(ellipse at 0 0, #03a9f4, #ffc107, #03a9f4, #ffc107, #03a9f4)',
    colorConfiguration: {
      coloringMode: 'radialGradient',
      coloringGradient: {
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: width,
          y: height
        },
        stops: [
          {
            id: 0,
            location: 0,
            color: '#03a9f4'
          },
          {
            id: 1,
            location: 0.25,
            color: '#ffc107'
          },
          {
            id: 2,
            location: 0.5,
            color: '#03a9f4'
          },
          {
            id: 3,
            location: 0.75,
            color: '#ffc107'
          },
          {
            id: 4,
            location: 1,
            color: '#03a9f4'
          }
        ]
      }
    }
  },
  {
    background: '#3f51b5',
    colorConfiguration: {
      coloringMode: 'single',
      coloringSingle: {
        color: '#3f51b5'
      }
    }
  },
  {
    background: 'radial-gradient(circle at 0 0, #f44336, transparent), radial-gradient(circle at 100% 0, #8bc34a, transparent), radial-gradient(circle at 50% 100%, #ffc107, transparent)',
    colorConfiguration: {
      coloringMode: 'spots',
      coloringSpots: {
        spots: [
          {
            x: 0,
            y: 0,
            color: '#f44336',
            intensity: 0.5
          },
          {
            x: width,
            y: 0,
            color: '#8bc34a',
            intensity: 0.5
          },
          {
            x: width / 2,
            y: height,
            color: '#ffc107',
            intensity: 0.5
          }
        ]
      }
    }
  },
  {
    background: 'radial-gradient(circle at 0 0, #f44336, transparent), radial-gradient(circle at 100% 0, #8bc34a, transparent), radial-gradient(circle at 100% 100%, #2196f3, transparent), radial-gradient(circle at 0 100%, #ffc107, transparent)',
    colorConfiguration: {
      coloringMode: 'spots',
      coloringSpots: {
        spots: [
          {
            x: 0,
            y: 0,
            color: '#f44336',
            intensity: 0.5
          },
          {
            x: width,
            y: 0,
            color: '#8bc34a',
            intensity: 0.5
          },
          {
            x: width,
            y: height,
            color: '#2196f3',
            intensity: 0.5
          },
          {
            x: 0,
            y: height,
            color: '#ffc107',
            intensity: 0.5
          }
        ]
      }
    }
  },
  {
    background: '#9c27b0',
    colorConfiguration: {
      coloringMode: 'single',
      coloringSingle: {
        color: '#9c27b0'
      }
    }
  },
  {
    background: 'radial-gradient(circle at 50% 50%, #e91e6366, transparent), radial-gradient(circle at 0 0, #f44336, transparent), radial-gradient(circle at 100% 0, #8bc34a, transparent), radial-gradient(circle at 100% 100%, #2196f3, transparent), radial-gradient(circle at 0 100%, #ffc107, transparent)',
    colorConfiguration: {
      coloringMode: 'spots',
      coloringSpots: {
        spots: [
          {
            x: 0,
            y: 0,
            color: '#f44336',
            intensity: 0.5
          },
          {
            x: width,
            y: 0,
            color: '#8bc34a',
            intensity: 0.5
          },
          {
            x: width,
            y: height,
            color: '#2196f3',
            intensity: 0.5
          },
          {
            x: 0,
            y: height,
            color: '#ffc107',
            intensity: 0.5
          },
          {
            x: width / 2,
            y: height / 2,
            color: '#e91e63',
            intensity: 0.45
          }
        ]
      }
    }
  },
  {
    background: 'radial-gradient(circle at 50% 50%, #ffffffa0, transparent), radial-gradient(circle at 0 0, #f44336, transparent), radial-gradient(circle at 100% 100%, #2196f3, transparent)',
    colorConfiguration: {
      coloringMode: 'spots',
      coloringSpots: {
        spots: [
          {
            x: 0,
            y: 0,
            color: '#f44336',
            intensity: 0.5
          },
          {
            x: width,
            y: height,
            color: '#2196f3',
            intensity: 0.5
          },
          {
            x: width / 2,
            y: height / 2,
            color: '#ffffff',
            intensity: 0.4
          }
        ]
      }
    }
  }
]

const ColoringPresets = ({
  dispatch,
  width,
  height
}) => (
  <fieldset>
    <legend>Color presets</legend>
    <div className='presets'>
      {getPresets({
        width,
        height
      }).map(({
        background,
        colorConfiguration
      }, index) => (
        <button
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          type='button'
          className='preset'
          style={{background}}
          onClick={() => dispatch({
            type: actions.loadColorPreset,
            colorConfiguration
          })}
        />
      ))}
    </div>
  </fieldset>
)

ColoringPresets.propTypes = {
  dispatch: func,
  width: number,
  height: number
}

export default ColoringPresets
