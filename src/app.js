/*jshint esversion: 8 */
import ready from './assets/js/_Domready';

ready(() => {
    const ex_img = document.getElementById('s');
    const slider = document.querySelectorAll('input');
    [...Array.from(slider)].forEach(elem => {    
        elem.addEventListener('change', e => {
            const input = e.currentTarget;
            const id = input.getAttribute('id');
            const outputId = `${id}-o`;
            if (input.type === 'range') document.getElementById(outputId).innerHTML = input.value;
            if (input.type === 'range') ex_img.setAttribute(id, input.value);
        });
    });
});