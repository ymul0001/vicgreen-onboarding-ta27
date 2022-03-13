/**
 * Define the information data
 */
const data = [
    {
        binType: 'Red Lid Bin',
        description: 'Soft plastics, Polystyrene except those labelled with the number six on them, Nappies, Standard incandescent, Old fabric and clothing, Broken glass from windows, drinking glasses and kitchenware',
        avoid: 'Hot ashes, liquids, solvents, toxic chemicals, batteries, recycleable materials, compostable materials'
    },
    {
        binType: 'Yellow Lid Bin',
        description: 'Paper and cardboard including pizza boxes and frozen food boxes, Milk and juice cartons, liquid paperboards, Alumunium and steel cans, Glass bottles and jars, Plastics numbered 1,2,3,4,5 or 7',
        avoid: 'Soft plastics, toxic chemicals, liquids, clothings, toys, any kinds of glasses'
    },
    {
        binType: 'Green Lid Bin',
        description: 'Food and organic garden waste',
        avoid: 'Anything other than mentioned'
    },
    {
        binType: 'Purple Lid Bin',
        description: 'Glass products, jars and bottles',
        avoid: 'Toxic chemicals, liquids, clothings, plastics, batteries'
    }
]

/**
 * Define all DOM elements
 */
const redBtn = document.querySelector('.red-link');
const yellowBtn = document.querySelector('.yellow-link');
const greenBtn = document.querySelector('.green-link');
const purpleBtn = document.querySelector('.purple-link');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const modalContentDescription = document.querySelector('.content');
const wrapper = document.querySelector('.wrapper');
const modalAvoidDescription = document.querySelector('.avoid');
const modalTitle = document.querySelector('.modal-title');

/**
 * Define event listeners
 */
redBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalTitle.textContent = data[0].binType;
    modalContentDescription.textContent = data[0].description;
    modalAvoidDescription.textContent = data[0].avoid;
    wrapper.style.opacity = '1';
    wrapper.style.visibility = 'visible';
})

yellowBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalTitle.textContent = data[1].binType;
    modalContentDescription.textContent = data[1].description;
    modalAvoidDescription.textContent = data[1].avoid;
    wrapper.style.opacity = '1';
    wrapper.style.visibility = 'visible';
})

greenBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalTitle.textContent = data[2].binType;
    modalContentDescription.textContent = data[2].description;
    modalAvoidDescription.textContent = data[2].avoid;
    wrapper.style.opacity = '1';
    wrapper.style.visibility = 'visible';
})

purpleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalTitle.textContent = data[3].binType;
    modalContentDescription.textContent = data[3].description;
    modalAvoidDescription.textContent = data[3].avoid;
    wrapper.style.opacity = '1';
    wrapper.style.visibility = 'visible';
})

modalCloseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.style.opacity = '0';
    wrapper.style.visibility = 'hidden';
})