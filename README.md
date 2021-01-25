# Marker Map

Marker Map is simple dynamic place marker by position to image and support responsive.

![enter image description here](https://github.com/angkarn/marker-map/raw/main/example/assets/screenshot.jpg)

## Features!
  -  Custom marker image and background.
  - Set active or inactive of marker (will be opacity reduce).
  - You can build game or event like treasure hunt.
  - And it's responsive.

### [Demo Example!](https://tues.cc/marker-map/example)

## Usage

NPM:
```bash
npm install marker-map
```
```javascript
import MarkerMap from marker-map
```

CDN:
```html
<script src="https://unpkg.com/marker-map"></script>
```

## Quick start
Put html for render.
```html
<div id="show"></div>
```

Prepare data and config.
```javascript
const data = [
  { 
    id: "myMarker1",
    width: 12,
    top: 34, 
    left: 54, 
    img: "./assets/place.svg" ,
    meta: {
	  you: "customs data"
    }
  },
  { 
    width: 12, 
    top: 53, 
    left: 38, 
    img: "./assets/home.svg"
  },
]

const markerMap = new MarkerMap()
markerMap.render("#show", {
    background: "./assets/treasure-map.jpg",
    markers: data
})
```

## Methods
|Method|Description|
|-|-|
| .render(`string` **query selector**, `object` **render options**) | render with [*render options*](#render) |
| .add(`object` ***marker options***) | add marker [*marker options*](#marker) |
| .remove(`string` ***marker id***) | remove marker|
| .removeAll() | remove marker|
| .active(`string` ***marker id***) | set marker active|
| .inactive(`string` ***marker id***) | set marker inactive|
|.activeAll()|set active all marker|
|.inactiveAll()|set inactive all marker|
|.getAll(`string` **filter**, `string` **output type**)|get list markers by **filter** `all` (default), `active`, `inactive` will return by **output type** `json` [*marker object*](#marker) (default), `dom` |
|.on(`string` **type event**, `function` **callback function**)|create event on markers *(ex. click, hover)*, will return callback **event object**|
|.destroy()|destroy render|


## Options

### Render:
|Name|Type|Default|Description|
|-|-|-|-|
| background | `string` | required | background image path.
| markers | `array` | [] | [*marker options*](#marker) array to include on render.|
| inactiveOpacity | `number` | 0.6 | opacity markers when inactive (0 - 1).|

### Marker:
|Name|Type|Default|Description|
|-|-|-|-|
| id | `string` | auto | will auto generate when empty.
| width | `number` | required | set with import image by percent.
| top | `number` | required | set potion from top by percent (0 - 100).
| left | `number` | required | set position from left by percent (0 - 100).
| img | `string` | required | marker image path.
| meta | `object` | {} | add custom your meta data to marker.

License
----
MIT
