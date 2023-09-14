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

//___________________________________LINE BREAK/DASH_______________________________________
function addDashes(container) {
  const text = container.textContent;
  const lines = text.split(/\r\n|\r|\n/);
  const newLines = lines.map(line => {
    let newLine = '';
    let lineOverflow = '';
    for (let i = 0; i < line.length; i++) {
      const char = line.charAt(i);
      const testLine = newLine + char;
      if (container.scrollWidth > container.clientWidth && i > 0) {
        lineOverflow = '-';
        newLine = char;
      } else {
        newLine = testLine;
      }
      if (char === ' ' || i === line.length - 1) {
        newLine += lineOverflow + ' ';
        lineOverflow = '';
      }
    }
    return newLine.trim();
  });
  container.textContent = newLines.join('\n');
}
//_____________________________MEDIA QUERY FUNCTION MEDIUM_____________________________________
function updateMedia(){isMedium = window.matchMedia("(min-width: 400px) and (max-width: 576px)").matches;}

//________________________________REACH END/START SCROLL_______________________________________
function isEndScroll(container) {
  return container.scrollTop + container.clientHeight === container.scrollHeight;
}
function isBeginScroll(container) {
  return container.scrollTop === 0;
}

//_____________________________________SLIDER DATA_____________________________________________
function sendSliderUpdate(sliderValue, timeSpent) {
    fetch('/slider_update', {
        method: 'POST',
        body: new URLSearchParams({
            slider_value: sliderValue,
            time_spent: timeSpent
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send slider update');
        }
        return response.json();
    })
    .then(data => {
        console.log('Slider update sent successfully:', data);
    })
    .catch(error => {
        console.error('Error sending slider update:', error);
    });
}
//______________________________________TYPEWRITER_____________________________________________
function typeWriter() {
  const element = document.getElementById("about");
  textHolder += text.charAt(index);
  if(Math.random()<0.7){
    //add cursor
    element.innerHTML = textHolder + '_';
  }
  else{
    element.innerHTML = textHolder;
  }
  index++;
  // scroll container  new content overflows height
  element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
  if (index < text.length) {
    setTimeout(typeWriter, 40);
  }
  else{
    element.innerHTML = textHolder;
  }
}