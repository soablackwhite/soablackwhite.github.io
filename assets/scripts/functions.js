//___________________________________CLAMP FUNCTION_______________________________________________
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

//________________________________CHANGE CSS VARIABLES____________________________________________
let rt = document.querySelector(':root');
// Create a function for getting a variable value
function get_css_var(v) {
  // Get the styles (properties and values) for the root
  return(getComputedStyle(document.documentElement).getPropertyValue(v));
}
// Create a function for setting a variable value
function set_css_var(v, target) {
  rt.style.setProperty(v, target);
}

//_________________________________MAP/SCALING FUNCTION___________________________________________
function rescale (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

//___________________________________PRELOAD FUNCTION_____________________________________________
const wait = (delay = 0) =>
  new Promise(resolve => setTimeout(resolve, delay));

const setVisible = (elementOrSelector, visible) => 
  (typeof elementOrSelector === 'string'
    ? document.querySelector(elementOrSelector)
    : elementOrSelector
  ).style.display = visible ? 'block' : 'none';
