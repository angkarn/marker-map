export default function MarkerMap() {
    let renderElm = null
    let countId = 1
    let allMarkersElm = null
    let markersElm = null
    let markers = []

    const defaultsMarker = {
        id: countId,
        active: true,
        width: null,
        top: null,
        left: null,
        img: null,
        meta: {}
    }

    const defaultsOptions = {
        background: null,
        markers: [],
        inactiveOpacity: 0.6
    }

    this.render = (elm = 'body', options = defaultsOptions) => {
        addStyle(options)
        renderElm = document.querySelector(elm)
        allMarkersElm = renderElm.getElementsByClassName(`marker-map-marker`)
        markersElm = renderElm.querySelector('#marker-map-markers')

        if (!options.background) {
            throw "background is not set"
        }

        countId = 1

        markers = options.markers.map(marker => {
            checkMarkerData(marker)
            countId++
            return { ...defaultsMarker, ...marker }
        })

        const bgHtml = `<img id="marker-map-bg" src="${options.background}" width="100%" height="100%" />`
        renderElm.innerHTML = `<div id="marker-map"style="width:100%;height:100%;position:relative;margin:0 auto;">${bgHtml}<div id="marker-map-markers">${markers.map(marker => getHtmlMarker(marker)).join('')}</div></div>`
    }

    const getHtmlMarker = (marker = defaultsMarker) => {
        return `<img class="marker-map-marker ${marker.active === false ? 'inactive' : ''}" data-marker-img="${marker.img}" data-marker-id="${marker.id}"
    style="width:${marker.width}%;top:${marker.top}%;left:${marker.left}%;" src="${marker.img}" />`
    }

    const checkMarkerData = (marker = defaultsMarker) => {
        if (!marker.img || !marker.top || !marker.left || !marker.width) { throw 'some marker data not correct' }
    }

    const getMarkerElm = (markerId = null) => {
        this.get(markerId)
        return document.querySelector(`[data-marker-id="${markerId}"]`)
    }

    this.add = (marker = defaultsMarker) => {
        checkMarkerData(marker)
        countId++
        const _marker = { ...defaultsMarker, ...marker }
        markers.push(_marker)
        document.getElementById("marker-map-markers").insertAdjacentHTML("beforeEnd", getHtmlMarker(marker))
    }

    this.remove = (markerId) => {
        markers.filter(marker => marker.id !== markerId);
        getMarkerElm(markerId).remove()
    }

    this.removeAll = () => {
        markers = []
        markersElm.innerHTML = ""
    }

    this.active = (markerId = null) => {
        getMarkerElm(markerId).classList.remove("inactive");
    }

    this.activeAll = () => {
        [...allMarkersElm].forEach((element) => {
            element.classList.remove("inactive");
        });
    }

    this.inactive = (markerId = null) => {
        getMarkerElm(markerId).classList.add("inactive");
    }

    this.inactiveAll = () => {
        [...allMarkersElm].forEach((element) => {
            element.classList.add("inactive");
        });
    }

    const addStyle = (options = defaultsOptions) => {
        const opt = { ...defaultsOptions, options }
        const styleString = `.marker-map-marker{position:absolute;} .marker-map-marker.inactive{opacity:${opt.inactiveOpacity};}`
        const styleElm = document.createElement('style');
        styleElm.textContent = styleString;
        document.head.append(styleElm);
    }

    this.on = (event, func) => {
        renderElm.addEventListener(event, (e) => {
            if (e.target.dataset.markerId) func(e, this.get(e.target.dataset.markerId))
        })
    }

    this.get = (markerId = null) => {
        const findMarker = markers.find(marker => marker.id == markerId)
        if (!findMarker) throw 'can not find marker'
        return findMarker
    }

    this.getAll = (filter = '', type) => {
        const filterMarkersElm = [...allMarkersElm].filter(elm => {
            switch (filter) {
                case 'active': return !elm.classList.contains("inactive")
                case 'inactive': return elm.classList.contains("inactive")
                default: return true
            }
        })

        const json = filterMarkersElm.map(elm => {
            return {
                id: elm.dataset.markerId,
                width: parseInt(elm.style.width),
                top: parseInt(elm.style.top),
                left: parseInt(elm.style.left),
                img: elm.dataset.markerImg,
                active: !elm.classList.contains("inactive"),
                meta: markers.find(m => m.id == elm.dataset.markerId).meta || {}
            }
        });

        switch (type) {
            case 'json': return json
            case 'dom': return filterMarkersElm
            default: return json
        }
    }

    this.destroy = () => {
        renderElm.innerHTML = ""
    }
}