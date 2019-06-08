import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import 'intersection-observer';
import 'mdn-polyfills/Array.prototype.includes';
import Onebang from '../assets/js/_Onebang';
import constrain from '../assets/js/_Constrain';
import map from '../assets/js/_Map';

const _css = '${{{src/webcomponents/webcomponent.scss}}}';
const _style = `<style>${_css}</style>`;
const _shadowdomHTML = `
    ${_style}
    <div class="placeholder_container">
        <div class="spacer">
            <slot class="placeholder" name="placeholder"></slot>
        </div>
    </div>
    <div class="svg_container">
        <div class="svg_spacer">
            <div class="svg_wp">
                <svg width="100%" height="100%"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <filter id="rikaaa-ex-filter">
                        <!-- blur -->
                        <feGaussianBlur stdDeviation="0"/>
                        <!-- other -->
                        <feColorMatrix type="matrix" id="contrast" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
                        <feColorMatrix type="matrix" id="brightness" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
                        <feColorMatrix type="matrix" id="saturate" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
                        <feColorMatrix type="matrix" id="hue-rotate" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
                        <feColorMatrix type="matrix" id="invert" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
                        <feColorMatrix type="matrix" id="grayscale" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
                        <feColorMatrix type="matrix" id="sepia" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
                    </filter>
                    <image width="100%" height="100%" x="0" y="0" filter="url(#rikaaa-ex-filter)">  
                </svg>
            </div>
        </div>
    </div>
    <div class="img_container">
        <slot class="rikaaa-img-extra-wp"></slot>
    </div>
`;

const placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

export default class rikaaaimgextra extends HTMLElement {
    constructor() {
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const template = document.createElement('template');
        template.id = 'rikaaaimgextra';
        template.innerHTML = _shadowdomHTML;
        const filter = template.content.querySelector('filter');
        const image = template.content.querySelector('image');
        const newId = `${filter.id}_${id}`;
        filter.id = newId;
        image.setAttribute('filter', `url(#${newId})`);
        super();

        if (window.ShadyCSS) ShadyCSS.prepareTemplate(template, 'rikaaa-img-extra');
        if (window.ShadyCSS) ShadyCSS.styleElement(this);
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
        this.filters = [];
        this.isSafari = /.*Version.*Safari.*/.test(navigator.userAgent);
        this.src = this.getAttribute('data-src');
        this.alt = this.getAttribute('data-alt');
        this.size = this.getAttribute('size').split('x');
        this.aspect = this.size.reduce((a, c, i, array) => {
            let result = {};
            const gcd = (w, h) => {
                if (!h) return w;
                else return gcd(h, w % h);
            }
            if (i === 0) result.w = c / gcd(array[1], array[0]);
            if (i === 1) result.h = c / gcd(array[1], array[0]);
            return Object.assign(a, result);
        }, {});

        this.wp = this.shadowRoot.querySelector('.rikaaa-img-extra-wp');
        this.placeholder_container = this.shadowRoot.querySelector('.placeholder_container');
        this.spacer = this.shadowRoot.querySelector('.spacer');
        this.svg = this.shadowRoot.querySelector('svg');
        this.svgImage = this.shadowRoot.querySelector('image');
        this.svgspacer = this.shadowRoot.querySelector('.svg_spacer');

        // this.offset = 100;
        if (this.offset === undefined) this.offset = 100;

        // const addPlaceholder = () => this.placeholder;
        // this.placeholder();
        // const addPlaceholder_onece = () => Onebang(addPlaceholder);
        // addPlaceholder_onece();
        
        const placeHolder = () => {
            this.placeholder();
        };
        const addPlaceHolder_onece = Onebang(placeHolder);
        addPlaceHolder_onece();

        // element entry viewport
        const entry = () => {
            this.entry();
        };
        const entry_onebang = Onebang(entry);
        this.ovserver = new IntersectionObserver(e => {
            if (e[0].intersectionRatio !== 0) entry_onebang();
        }, {
            rootMargin: `${this.offset}px`,
        });
        this.ovserver.observe(this);

        

    }
    disconnectedCallback() {
        this.ovserver.disconnect(this);
        const child = this.childNodes;
        if (child) Array.from(child).forEach(e => this.removeChild(e));
    }
    static get observedAttributes() {
        return [
            'blur',
            'contrast',
            'brightness',
            'saturate',
            'hue-rotate',
            'invert',
            'opacity',
            'grayscale',
            'sepia',
            'offset',
        ];
    }
    attributeChangedCallback(attr, oldval, newval) {
        if (this.filters === undefined) this.filters = [];
        this.svg = this.shadowRoot.querySelector('svg');
        this._filter_op = 1;

        this.isSafari = /.*Version.*Safari.*/.test(navigator.userAgent);

        if (attr === 'blur') this.blur = newval;
        if (attr === 'contrast') this.contrast = newval;
        if (attr === 'brightness') this.brightness = newval;
        if (attr === 'saturate') this.saturate = newval;
        if (attr === 'hue-rotate') this.hue_rotate = newval;
        if (attr === 'invert') this.invert = newval;
        if (attr === 'opacity') this.opacity = newval;
        if (attr === 'grayscale') this.grayscale = newval;
        if (attr === 'sepia') this.sepia = newval;
        if (attr === 'offset') this.offset = newval;

        if (this.isSafari) this.shadowRoot.querySelector('.img_container').style.filter = this.filters.toString().replace(/,/g, ' ');
    }
    arraytomatrixval(matrixarray) {
        return matrixarray.reduce((acc, val) => acc.concat(val), []).toString().replace(/,/g, ' ');
    }
    set blur(n) {
        if (!this.isSafari) this.svg.querySelector('feGaussianBlur').setAttribute('stdDeviation', n);
        else this.filters[0] = `blur(${n}px)`;
    }
    set contrast(n) {
        const b = Math.max(1, n);
        if (!this.isSafari) {
            const tg = this.svg.getElementById('contrast');
            const o = (1 - b) / 2;
            const matrix = [
                [b, 0, 0, 0, o],
                [0, b, 0, 0, o],
                [0, 0, b, 0, o],
                [0, 0, 0, this._filter_op, 0],
            ];
            tg.setAttribute('values', this.arraytomatrixval(matrix));
        } else {
            this.filters[1] = `contrast(${b})`;
        }

    }
    set brightness(n) {
        if (!this.isSafari) {
            const tg = this.svg.getElementById('brightness');
            const matrix = [
                [n, 0, 0, 0, 0],
                [0, n, 0, 0, 0],
                [0, 0, n, 0, 0],
                [0, 0, 0, this._filter_op, 0],
            ];
            tg.setAttribute('values', this.arraytomatrixval(matrix));
        } else {
            this.filters[2] = `brightness(${n})`;
        }

    }
    set saturate(n) {
        const seed = Math.max(0, n);
        if (!this.isSafari) {
            const tg = this.svg.getElementById('saturate');
            const [a, b, c, d, e, f, g, h, i] = [
                map(seed, 0, 1, 0.213, 1),
                map(seed, 0, 1, 0.715, 0),
                map(seed, 0, 1, 0.072, 0),

                map(seed, 0, 1, 0.213, 0),
                map(seed, 0, 1, 0.715, 1),
                map(seed, 0, 1, 0.072, 0),

                map(seed, 0, 1, 0.213, 0),
                map(seed, 0, 1, 0.715, 0),
                map(seed, 0, 1, 0.072, 1),
            ];
            const matrix = [
                [a, b, c, 0, 0],
                [d, e, f, 0, 0],
                [g, h, i, 0, 0],
                [0, 0, 0, this._filter_op, 0],
            ];
            tg.setAttribute('values', this.arraytomatrixval(matrix));
        } else {
            this.filters[3] = `saturate(${seed})`;
        }
    }
    set hue_rotate(n) {
        if (!this.isSafari) {
            const tg = this.svg.getElementById('hue-rotate');
            const theta = n / 180 * Math.PI;
            const [c, s, w, sw] = [Math.cos(theta), Math.sin(theta), 1 / 3, Math.sqrt(1 / 3)];
            const [rr, rg, rb, gr, gg, gb, br, bg, bb] = [
                c + ((1.0 - c) * w),
                (w * (1.0 - c)) - (sw * s),
                (w * (1.0 - c)) + (sw * s),

                (w * (1.0 - c)) + (sw * s),
                c + (w * (1.0 - c)),
                (w * (1.0 - c)) - (sw * s),

                (w * (1.0 - c)) - (sw * s),
                (w * (1.0 - c)) + (sw * s),
                c + (w * (1.0 - c)),
            ];
            const matrix = [
                [rr, rg, rb, 0, 0],
                [gr, gg, gb, 0, 0],
                [br, bg, bb, 0, 0],
                [0, 0, 0, this._filter_op, 0],
            ];
            tg.setAttribute('values', this.arraytomatrixval(matrix));
        } else {
            this.filters[4] = `hue-rotate(${n}deg)`;
        }

    }
    set invert(n) {
        const seed = constrain(n, 0, 1);
        if (!this.isSafari) {
            const tg = this.svg.getElementById('invert');
            const v = map(seed, 0, 1, 1, -1);
            const a = map(v, 1, -1, 0, 1);
            const matrix = [
                [v, 0, 0, 0, a],
                [0, v, 0, 0, a],
                [0, 0, v, 0, a],
                [0, 0, 0, this._filter_op, 0],
            ];
            tg.setAttribute('values', this.arraytomatrixval(matrix));
        } else {
            this.filters[5] = `invert(${seed})`;
        }

    }
    set opacity(n) {
        this._filter_op = constrain(n, 0, 1);
        if (!this.isSafari) {
            const filter = [
                'contrast',
                'brightness',
                'saturate',
                'hue-rotate',
                'invert',
                'grayscale',
                'sepia',
                'binarize',
            ];
            const activeAttr = filter.map(name => {
                const attr = this.getAttribute(name);
                if (attr === null) return false;
                if (name === 'contrast') this.contrast = attr;
                if (name === 'brightness') this.brightness = attr;
                if (name === 'saturate') this.saturate = attr;
                if (name === 'hue-rotate') this.hue_rotate = attr;
                if (name === 'invert') this.invert = attr;
                if (name === 'grayscale') this.grayscale = attr;
                if (name === 'sepia') this.sepia = attr;
                if (name === 'binarize') this.binarize = attr;
            }).includes(undefined);
            if (!activeAttr) this.svg.getElementById('contrast').setAttribute('values', this.arraytomatrixval([
                [1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, this._filter_op, 0],
            ]));
        } else {
            this.filters[6] = `opacity(${this._filter_op})`;
        }

    }
    set grayscale(n) {


        if (!this.isSafari) {
            const seed = 1 - constrain(n, 0, 1);
            const tg = this.svg.getElementById('grayscale');
            const [a, b, c, d, e, f, g, h, i] = [
                map(seed, 0, 1, 0.213, 1),
                map(seed, 0, 1, 0.715, 0),
                map(seed, 0, 1, 0.072, 0),

                map(seed, 0, 1, 0.213, 0),
                map(seed, 0, 1, 0.715, 1),
                map(seed, 0, 1, 0.072, 0),

                map(seed, 0, 1, 0.213, 0),
                map(seed, 0, 1, 0.715, 0),
                map(seed, 0, 1, 0.072, 1),
            ];
            const matrix = [
                [a, b, c, 0, 0],
                [d, e, f, 0, 0],
                [g, h, i, 0, 0],
                [0, 0, 0, this._filter_op, 0],
            ];
            tg.setAttribute('values', this.arraytomatrixval(matrix));
        } else {
            const s_seed = constrain(n, 0, 1);
            this.filters[7] = `grayscale(${s_seed})`;
        }
    }
    set sepia(n) {
        if (!this.isSafari) {
            const tg = this.svg.getElementById('sepia');
            const seed = 1 - constrain(n, 0, 1);
            const [a, b, c, d, e, f, g, h, i] = [
                map(seed, 0, 1, 0.393, 1),
                map(seed, 0, 1, 0.769, 0),
                map(seed, 0, 1, 0.189, 0),

                map(seed, 0, 1, 0.349, 0),
                map(seed, 0, 1, 0.686, 1),
                map(seed, 0, 1, 0.168, 0),

                map(seed, 0, 1, 0.272, 0),
                map(seed, 0, 1, 0.534, 0),
                map(seed, 0, 1, 0.131, 1),
            ];
            const matrix = [
                [a, b, c, 0, 0],
                [d, e, f, 0, 0],
                [g, h, i, 0, 0],
                [0, 0, 0, this._filter_op, 0],
            ];
            tg.setAttribute('values', this.arraytomatrixval(matrix));
        } else {
            const s_seed = constrain(n, 0, 1);
            this.filters[8] = `sepia(${s_seed})`;
        }

    }
    placeholder() {
        
        const imgnode = document.createElement('img');
        imgnode.src = placeholder;
        imgnode.slot = 'placeholder';
        Object.assign(imgnode.style, {
            width: '100%',
            height: '100%',
        })
        Object.assign(this.spacer.style, {
            paddingBottom: `${this.aspect.h/this.aspect.w*100}%`,
        });
        this.placeholderNode = imgnode;
        this.appendChild(imgnode);
    }
    entry() {
        // this.shadowRoot.removeChild(this.placeholder_container);
        this.placeholder_container.style.display = 'none';
        // create img element
        const imgnode = document.createElement('img');
        this.img = imgnode;
        imgnode.src = this.src;
        imgnode.alt = this.alt;
        Object.assign(imgnode.style, {
            width: '100%',
        });

        const render = () => {
            if (this.isSafari) {
                this.appendChild(imgnode);
            } else {
                Object.assign(this.svg.style, {
                    fontSize: '0px',
                });
                this.svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.src);
                Object.assign(this.svgspacer.style, {
                    paddingBottom: `${this.aspect.h / this.aspect.w * 100}%`,
                });
            }
        }
        imgnode.addEventListener('load', render);
        this.dispatchEvent(new CustomEvent('load'));
    }
}


