function log() {
  console.log.call(null, `[experimental] [nehuba]`, ...arguments)
}

class NgError extends Error{
  constructor(...arg){
    super(`[experimental] [nehuba]`, ...arg)
  }
}

async function getProxyMriInfo(url){
  log(`overwriting mriInfo for ${url}`)

  const endpoint = url.replace(/^precomputed:\/\//, '')
  const json = await fetch(`${endpoint}/info`).then(res => res.json())
  log(`fetched precomputed info:`, json)
  const { scales } = json
  const dim = [ 1, 1, 1 ]
  const pixdim = [ 1, 1, 1 ]

  for (const scale of scales) {
    const { size, resolution } = scale
    if (size[0] > dim[0]) {
      dim[0] = size[0]
      dim[1] = size[1]
      dim[2] = size[2]

      pixdim[0] = resolution[0] / 1e3
      pixdim[1] = resolution[1] / 1e3
      pixdim[2] = resolution[2] / 1e3
    }
  }
  return {
    "_id": "5f5b7f49d9017064b971e5b2",
    "filename": url,
    "success": true,
    "source": url,
    "url": "/data/2b1431dd2365c566bcf62941b656b993/",
    "included": "2020-09-11T13:42:29.637Z",
    dim,
    pixdim,
    "voxel2world": [
      [
        1,
        0,
        0
      ],
      [
        0,
        1,
        0
      ],
      [
        0,
        0,
        1
      ]
    ],
    "worldOrigin": dim.map(val => Math.round(val / 2)),
    "owner": "::1",
    "name": "",
    "modified": "2020-09-11T13:42:29.637Z",
    "modifiedBy": "::1",
    "mri": {
      "brain": url,
      "atlas": [
        {
          "created": "2020-09-11T13:42:29.637Z",
          "modified": "2020-09-11T13:42:29.637Z",
          "access": "edit",
          "type": "volume",
          "name": "Default",
          "filename": "Atlas.nii.gz",
          "labels": "foreground.json",
          "vectorial": []
        }
      ]
    }
  }
}

function getNehubaConfig(source, orientation, navigation) {
  return {
    "configName": "",
    "globals": {
      "hideNullImageValues": true,
      "useNehubaLayout": {
        "keepDefaultLayouts": false
      },
      "useNehubaMeshLayer": true,
      "rightClickWithCtrlGlobal": false,
      "zoomWithoutCtrlGlobal": false,
      "useCustomSegmentColors": true
    },
    "zoomWithoutCtrl": true,
    "hideNeuroglancerUI": true,
    "rightClickWithCtrl": true,
    "rotateAtViewCentre": true,
    "enableMeshLoadingControl": true,
    "zoomAtViewCentre": true,
    "restrictUserNavigation": true,
    "disableSegmentSelection": false,
    "dataset": {
      // "imageBackground": [
      //   1,
      //   1,
      //   1,
      //   1
      // ],
      "initialNgState": {
        "showDefaultAnnotations": false,
        "layers": {
          "nehuba-shim-layer": {
            "type": "image",
            source,
            // "transform": [
            //   [
            //     1,
            //     0,
            //     0,
            //     -70677184
            //   ],
            //   [
            //     0,
            //     1,
            //     0,
            //     -70010000
            //   ],
            //   [
            //     0,
            //     0,
            //     1,
            //     -58788284
            //   ],
            //   [
            //     0,
            //     0,
            //     0,
            //     1
            //   ]
            // ]
          }
        },
        // "navigation": {
        //   "pose": {
        //     "position": {
        //       "voxelSize": [
        //         21166.666015625,
        //         20000,
        //         21166.666015625
        //       ],
        //       "voxelCoordinates": [
        //         -21.8844051361084,
        //         16.288618087768555,
        //         28.418994903564453
        //       ]
        //     }
        //   },
        //   "zoomFactor": 350000
        // },
        // "perspectiveOrientation": [
        //   0.3140767216682434,
        //   -0.7418519854545593,
        //   0.4988985061645508,
        //   -0.3195493221282959
        // ],
        // "perspectiveZoom": 1922235.5293810747
      }
    },
    "layout": {
      "views": "hbp-neuro",
      // "planarSlicesBackground": [
      //   1,
      //   1,
      //   1,
      //   1
      // ],
      // "useNehubaPerspective": {
      //   "enableShiftDrag": false,
      //   "doNotRestrictUserNavigation": false,
      //   "perspectiveSlicesBackground": [
      //     1,
      //     1,
      //     1,
      //     1
      //   ],
      //   "removePerspectiveSlicesBackground": {
      //     "color": [
      //       1,
      //       1,
      //       1,
      //       1
      //     ],
      //     "mode": "=="
      //   },
      //   "perspectiveBackground": [
      //     1,
      //     1,
      //     1,
      //     1
      //   ],
      //   "fixedZoomPerspectiveSlices": {
      //     "sliceViewportWidth": 300,
      //     "sliceViewportHeight": 300,
      //     "sliceZoom": 563818.3562426177,
      //     "sliceViewportSizeMultiplier": 2
      //   },
      //   "mesh": {
      //     "backFaceColor": [
      //       1,
      //       1,
      //       1,
      //       1
      //     ],
      //     "removeBasedOnNavigation": true,
      //     "flipRemovedOctant": true
      //   },
      //   "centerToOrigin": true,
      //   "drawSubstrates": {
      //     "color": [
      //       0,
      //       0,
      //       0.5,
      //       0.15
      //     ]
      //   },
      //   "drawZoomLevels": {
      //     "cutOff": 200000,
      //     "color": [
      //       0.5,
      //       0,
      //       0,
      //       0.15
      //     ]
      //   },
      //   "hideImages": false,
      //   "waitForMesh": true,
      //   "restrictZoomLevel": {
      //     "minZoom": 1200000,
      //     "maxZoom": 3500000
      //   }
      // }
    }
  }
}

async function wait(){
  return new Promise(rs => setTimeout(rs, 16))
}

let rafSetLayout = null
let rafAxis, rafSlice

function _relayout(){
  if (!rafAxis) return false

  const containerEls = document.getElementsByClassName('neuroglancer-layer-group-viewer')
  if (containerEls.length !== 1) return false
  if (containerEls[0].children.length !== 1) return false
  if (containerEls[0].children[0].children.length !== 1) return false
  const parentNode = containerEls[0].children[0].children[0]
  let rowCount, columnCount, ngPosIdx
  switch (rafAxis) {
    case 'sag': {
      rowCount = 0
      columnCount = 1
      ngPosIdx = 0
      break
    }
    case 'axi': {
      rowCount = 1
      columnCount = 0
      ngPosIdx = 2
      break
    }
    case 'cor': {
      rowCount = 0
      columnCount = 0
      ngPosIdx = 1
      break
    }
    default: {
      throw new NgError(`axis not found:`, rafAxis) 
    }
  }
  parentNode.children[rowCount^1].style.setProperty('flex-grow', '0', 'important')
  parentNode.children[rowCount].style.setProperty('flex-grow', '1', 'important')
  parentNode.children[rowCount].children[columnCount^1].style.setProperty('flex-grow', '0', 'important')
  parentNode.children[rowCount].children[columnCount].style.setProperty('flex-grow', '1', 'important')
  
  /**
   * update navigation state
   */
  const json = nehubaViewer.ngviewer.navigationState.position.toJSON()
  if (json) {
    const { voxelSize, voxelCoordinates } = json
    voxelCoordinates[ngPosIdx] = rafSlice
    nehubaViewer.ngviewer.navigationState.position.restoreState({
      voxelSize,
      voxelCoordinates
    })
  }
  nehubaViewer.redraw()
  return true
}

function setLayout(axis, slice) {
  console.log('set axis', axis, slice)
  rafAxis = axis
  rafSlice = slice
  if (!!rafSetLayout) return

  const startRelayoutRaf = () => {
    const relayoutIsSuccessful = _relayout()
    if ( relayoutIsSuccessful ) {
      rafSetLayout = null
    } else {
      rafSetLayout = requestAnimationFrame(startRelayoutRaf)
    }
  }
  rafSetLayout = requestAnimationFrame(startRelayoutRaf)
}

const extraCss = `
div.scale-bar-container
{
  text-align: center;
  background-color: rgba(0,0,0,.3);
  position: absolute;
  margin: 1em;
  bottom: 0;
  left: 0;
  padding: 2px;
  font-weight: 700;
  pointer-events: none;
  user-select: none;
}

div.scale-bar
{
  min-height: 1ex;
  background-color: #fff;
  padding: 0;
  margin: 0;
  margin-top: 2px;
}
div.neuroglancer-rendered-data-panel
{
  position:relative;
}

.neuroglancer-position-widget-input-container,
.neuroglancer-viewer-top-row,
.neuroglancer-layer-panel
{
  display:none;
  visibility: hidden;
}

ul#statusContainer
{
  display:none;
}

div.scale-bar-container
{
  font-weight:500;
  color: #1a1a1a;
  background-color:hsla(0,0%,80%,0.5);
}

label.perspective-panel-show-slice-views
{
  visibility: hidden;
  position: absolute;
}

.neuroglancer-layer-group-viewer

`

let nehubaViewer = null

export async function shimNehuba(me) {
  log(`init`)

  const appendExportNehubaScriptPr = new Promise((rs, rj) => {
    const scriptEl = document.createElement('script')
    scriptEl.src = 'export_nehuba.js'
    scriptEl.onload = () => {
      log(`export-nehuba loaded successfully.`)
      rs()
    }
    scriptEl.onerror = rj
    document.head.appendChild(scriptEl)
  })

  me.drawImages = (function () {
    this.displayInformation()
    const { User, ...restThis } = this
    const { view, slice, dim, source, ...rest } = User
    log(
      '[.drawImages]',
      view, slice, rest, restThis,
      ...arguments
    )

    /**
     * setLayout use RAF to change view, so it can be called before nehuba init
     * nehuba init is an async process any way, and we cannot reliably use settimeout etc to ensure
     * setlayout to be called after nehuba viewer init
     */
    setLayout(
      view || 'sag',
      typeof slice === 'undefined' || slice === null ? Math.round(dim[0] / 2) : slice
    )

    if (!!nehubaViewer) {
      // subsequent render

      // only setLayout (above) is required
    } else {
      // first time render

      const { UrlHashBinding } = export_nehuba.getNgPatchableObj()

      UrlHashBinding.prototype.setUrlHash = () => {

      }

      UrlHashBinding.prototype.updateFromUrlHash = () => {
        
      }

      const styleEl = document.createElement('style')
      styleEl.innerHTML = extraCss
      document.head.appendChild(styleEl)

      const canvasEl = document.getElementById(me.canvasId)
      const parentEl = canvasEl.parentElement
      parentEl.removeChild(canvasEl)

      const ngContainer = document.createElement('div')

      // figure out a proper way to do height
      ngContainer.style.height = '40em'
      ngContainer.id = 'neuroglancer-container'
      parentEl.appendChild(ngContainer)

      const config = getNehubaConfig(source, view, slice)
      nehubaViewer = export_nehuba.createNehubaViewer(config, err => {
        log(`nehuba viewer error`, err)
      })
      window.nehubaViewer = nehubaViewer
    }
  }).bind(me)

  const oldRequestMriInfo = me._requestMRIInfo

  me._requestMRIInfo = async function () {
    log(`spying _requestMRIInfo`)
    const url = arguments[0]
    if (/^precomputed:\/\//.test(url)){
      log(`precomputed schema detected, overwriting with proxy MRI info`)
      const json = await getProxyMriInfo(url)
      await appendExportNehubaScriptPr

      setTimeout(() => {
        log(`in _requestMRIInfo, queue drawImages call`)
        me.drawImages()
      })
      return json
    } else {
      log(`regular nifti detected, calling original method`)
      return oldRequestMriInfo.call(me, ...arguments)
    }
  }
}