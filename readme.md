# `<rikaaa-img-extra>`
The Custom element to impliment lazy load and image filtering.
![](rikaaa-img-extra.gif)

## Installation
```bash
#script
<!-- If you want to use The Custom Element -->
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.2.10/webcomponents-loader.js"></script>

<script src="rikaaa-img-extra.js"></script>
```

```bash
#esm
import "rikaaaimgextra" from "rikaaa-img-extra.esm";

customElements.define("rikaaa-img-extra", rikaaaimgextra);
```
## Usage 
```bash
#HTML
<rikaaa-img-extra data-src="your image path" data-alt="your image alt text" size="000x000"></rikaaa-img-extra>
```

```bash
#Event
Array.from(document.querySelectorAll("rikaaa-img-extra")).forEach(function(elem) {
    elem.addEventListener("load", function() {
        console.log("loaded");
    });
});
```
## Attributes
| Attribute | Require | Description |
----|----|----
| data-src ="string" | Require | The parameter to set image path by text. |
| size = "000x000" | Require | The parameter to set the size of image by text. For example, indication of '640x480' in case of width 640 pixel and height 480 pixel. |
| data-alt = "string" | | The parameter to set 'alt' of image by text. |
| offset = "integer" | | The parameter to set the margin between bottom end of viewport and The Custom element. In case, the margin of actual browser display shows smaller than the margin specified the image will be loaded. The unit is pixel. default value is 100.|
| blur = "float" | | The parameter to set the condition of blur by floating decimal point.|
| contrast = "float" | | The parameter to set the condition of contrast by floating decimal point. The minimum parameter is 1.0. |
| brightness = "float" | | The parameter to set the condition of brightness by floating decimal point. The minimum parameter is 0. |
| saturate = "float" | | The parameter to set the condition of saturate by floating decimal point. The minimum parameter is 0. |
| hue-rotate = "float" | | The parameter to set the condition of hue rotattion by floating decimal point. The unit is degree. The range is 0 to 360. |
| invert = "float" | | The parameter to set the condition of invert by floating decimal point. The range is 0 to 1.0. |
| opacity = "float" | | The parameter to set the condition of opacity by floating decimal point. The range is 0 to 1.0. |
| grayscale = "float" | | The parameter to set the condition of grayscale by floating decimal point. The range is 0 to 1.0. |
| sepia = "float" | | The parameter to set the condition of sepia by floating decimal point. The maximum parameter is 1.0. |

## Browser Support
- Google Chrome  
- Safari  
- Firefox  
- Edge  
- IE 11+ (When using polyfill)

## License
MIT © [rikaaa.org](http://rikaaa.org/)
