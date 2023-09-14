AOS.init();
//elements
let wheel = document.getElementById('wheel');
const items = document.querySelectorAll(".menu-item");
const contents = document.querySelectorAll('.content'); 
const about = document.getElementById('about');
let labels = document.querySelectorAll('.label');
//slider stuff
let currentMenuItemIndex = 0;
let scrollThreshold = 70;
let sensitivity = document.getElementById('sensitivity');
let lastUpdateTime = new Date();
//typewriter stuff
const text = "<br><br><br> hi! my name is omar ouldali. i recently completed my bachelor at nyu abu dhabi, with a major in <mark>interactive media</mark>. i'm passionate about problem-solving in the fields of communication and technology, with interests ranging from <mark>software engineering</mark>, to <mark>data analysis</mark>, to <mark>ui/ux</mark>.<br><br><br>";
let index = 0;
let textHolder = '';
let triggerAbout = false;
//check screen size
let isMedium = false;



//________________________________HIDE PAGE WHILE LOADING___________________________________
setVisible('#wrapper', false);
setVisible('#loading', true);

//_______________________________________LOADER_____________________________________________
window.addEventListener('load', function() { //used to be domcontentloaded
    //select all selection and set color
    let svgs = document.querySelectorAll("svg");
    //onload, run the function
    for (let i = 0; i < svgs.length; i++){
        svgs[i].style["max-height"]="10rem";
    }
    wait(200).then(() => {
        setVisible('#wrapper', true);
        setVisible('#loading', false);
        let bs = this.document.getElementById("blackscreen");
        bs.style.animation = "fadeMeOut 0.43s ease-in-out 0.1s 1 forwards";
        windowResized();
      })
});
//________________________________MOUSE PIC INTERACTION____________________________________________
const pic = document.querySelector('.image-container');
pic.addEventListener('mousemove', (event) => {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let ox = window.innerWidth/2;
    let oy = window.innerHeight/2;
    //convert to rem scale
    let incx = rescale(mouseX, ox - pic.offsetWidth/2, ox + pic.offsetWidth/2, -4, 4);
    let incy = rescale(mouseY, oy - pic.offsetHeight/2, oy + pic.offsetHeight/2, -4, 4);
    incy = (incy + 1) +"rem";
    incx = incx + "rem";
    //change variables
    set_css_var("--vidy", incy);
    set_css_var("--vidx", incx);
});

//_________________________________UPDATING THE SLIDER______________________________________________
sensitivity.addEventListener('change', () => {
    let currentTime = new Date();
    let timeSpent = currentTime - lastUpdateTime;
    // Send the updated slider value and time spent to the Flask application
    sendSliderUpdate(sensitivity.value, timeSpent);
    lastUpdateTime = currentTime;
    // Set scroll threshold to slider value
    scrollThreshold = sensitivity.value;
});
