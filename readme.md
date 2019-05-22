# `<rikaaa-img-extra>`
Custom element combining Lazy Load and svg filter.  
Filter is also possible with IE11.

## Installation
```bash
#script tag
<script src="rikaaa-img-extra.js"></script>

#esm
import "rikaaa-img-extra.js";
```
If you want to use browser that does not support webcomponent.
```bash
#script tag
<script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>
<script src="node_modules/@webcomponents/shadycss/scoping-shim.min.js"></script>

#ems
import "@webcomponents/webcomponentsjs/webcomponents-bundle";
import "@webcomponents/shadycss/scoping-shim.min";
```
## Usage 
```bash
<rikaaa-img-extra data-src="your image path" data-alt="your image alt text" size="000x000"></rikaaa-img-extra>
```
## Attributes
| Attribute | Require | Description |
----|----|----
| data-src ="string" | Require | Image path. |
| size = "000x000" | Require | Image size. For example, If the size of the image you use is width:640px,height:480px, attribute value is size = "640x480"|
| data-alt = "string" | | Alt text. |
| offset = "integer" | | Margin from element to viewport. When this value is 0, the image is read when the head of the element overlaps the viewport. defult is 100. |
| blur = "float" | | Blur condition value.The minimum value is 0. |
| contrast = "float" | | Contrast condition value.The minimum value is 1. |
| brightness = "float" | | Brightness condition value.The minimum value is 0. |
| saturate = "float" | | Saturate condition value.The minimum value is 0. |
| hue-rotate = "float" | | Hue-rotate condition value.The minimum value is 0. The maximum value is 360. |
| invert = "float" | | Invert condition value.The minimum value is 0. The maximum value is 1. |
| opacity = "float" | | Opacity condition value.The minimum value is 0. The maximum value is 1. |
| grayscale = "float" | | Grayscale condition value.The minimum value is 0. The maximum value is 1. |
| sepia = "float" | | Sepia condition value.The minimum value is 0. The maximum value is 1. |

## Browser Support
- Google Chrome  
- Safari  
- Firefox  
- Edge  
- IE 11+ (When using polyfill)

## License
MIT © [rikaaa.org](http://rikaaa.org/)
