document.addEventListener("DOMContentLoaded", function () {
    //const items = document.getElementsByClassName("menu-item");
    let currentItem = 0;
    let currentCircle = 0;
    let accumulatedDelta = 0;
    let resetThreshold;
    let circlesCur = contents[currentItem].querySelectorAll(".tags");
    const icons = [
        '../static/media/icons/html5.svg',
        '../static/media/icons/css3.svg',
        '../static/media/icons/boot.svg',
        '../static/media/icons/js.svg',
        '../static/media/icons/c.svg',
        '../static/media/icons/cplus.svg',
        '../static/media/icons/nodejs.svg',
        '../static/media/icons/flask.svg',
        '../static/media/icons/python.svg',
        '../static/media/icons/sql.svg',
        '../static/media/icons/r.svg',
        '../static/media/icons/stata.svg',
    ];
    imageToVideo(0);
    updateMedia();
    //__________________________________________UPDATE ON ABOUT SECTION_________________________________________
    function updateAbout() {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove("selected");
        }
        //add menu selected
        items[currentItem].classList.add("selected");
        //update current circles
        circlesCur = contents[currentItem].querySelectorAll(".tags");
        //show about
        about.style.display = "block";
        triggerAbout = true;
        //remove tags
        if(!isMedium){
            for(let i = 0; i < contents.length; i++)
            {
                let all = contents[i].querySelectorAll(".tags");
                all.forEach(tag=>{
                    tag.classList.remove('circle');
                    tag.style.opacity = '0';
                })
            }
        }
        //remove labels
        labels.forEach(label => {
            label.style.opacity = 0;
        })
    }
    //___________________________________________UPDATE ON MENU CLICK___________________________________________
    function goSection(section) {
        currentItem = section;
        currentCircle = 0;
        if(section == 1){
            updateAbout();
            // about.style.display = "block";
            if(triggerAbout == true)
            {
                typeWriter();
            }
        } else {
            updateTag();
            imageToVideo();
            updateThumbnail(currentCircle, icons, 'profile')
        }
    }
    for(let i = 0; i < items.length; i++)
    {
        items[i].addEventListener("click", function(){
            goSection(i);
        })
    }
    document.getElementById('logo').addEventListener("click", function(){
        goSection(0);
    })
    //_____________________________________________UPDATE THUMBNAIL____________________________________________
    function imageToVideo() {
        //sets either image or video invisible, based on currentItem
        const thumbnail_video = document.getElementById('zoomer').querySelector('video');
        const thumbnail = document.getElementById('profile');
        if(currentItem == 2){
            setVisible(thumbnail, true);
            setVisible(thumbnail_video, false);
        } else {
            setVisible(thumbnail, false);
            setVisible(thumbnail_video, true);
        }
    }
    function updateThumbnail(idx, imgList, id) {
        const thumbnail = document.getElementById(id);
        thumbnail.src = imgList[idx];
    }
    //_____________________________________________UPDATE UI CONTENT____________________________________________
    function updateTag() {
        //____________________________________UPDATE CURRENT MENU INDEX____________________________________________
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove("selected");
        }
        //add menu selected
        items[currentItem].classList.add("selected");
        //update current circles
        circlesCur = contents[currentItem].querySelectorAll(".tags");
        //hide about
        about.style.display = "none";
        triggerAbout = false;
        //_______________________________________UPDATE CURRENT TAG________________________________________________
        for(let i = 0; i < contents.length; i++)
        {
            let all = contents[i].querySelectorAll(".tags");
            all.forEach(tag=>{
                tag.classList.remove('circle');
                tag.style.opacity = '0';
            })
        }
        //add circle tag
        circlesCur.forEach(circle=>{
            circle.classList.add('circle');
        })
        //________________________________________UPDATE ANGLES________________________________________________
        set_css_var("--isindent", 0);
        let insert;
        if (currentItem >= 3){
            insert = -1 * parseInt(get_css_var('--ang_img')) * (currentCircle) +"deg"; //indent circle each time we move up
            set_css_var("--ang_start", insert);
        } else {
            if(currentItem == 2)
            {
                set_css_var("--isindent", 1);
                insert = -1 * parseInt(get_css_var('--ang')) * (currentCircle + parseInt(currentCircle/4)) +"deg";
            }
            else
            {
                insert = -1 * parseInt(get_css_var('--ang')) * (currentCircle) +"deg"; //indent circle each time we move up
            }
            set_css_var("--ang_start", insert);
        }
        //_______________________________________UPDATE OPACITY________________________________________________
        for(let j = 0; j < circlesCur.length; j++){
            let alpha = Math.abs(currentCircle - j);
            alpha = rescale(alpha, 1, circlesCur.length - 1, 0.7, 0) - 0.4;
            alpha = String(alpha);
            circlesCur[j].style.opacity = alpha;
            if(j == currentCircle){
                circlesCur[j].style.opacity = "1";
            }
        }
        //______________________________________UPDATE LABELS_________________________________________________
        for(let i = 0; i < labels.length; i++)
        {
            if (currentItem != 2){
                labels.forEach(label => {
                    label.style.opacity = 0;
                })
            } else {
                let thresh = Math.abs(currentCircle - i*4);
                if (thresh<4)
                {
                    labels[i].style.opacity = "1";
                    labels[i].style.paddingLeft = "0rem";
                }
                else
                {
                    labels[i].style.opacity = "0";
                    labels[i].style.paddingLeft = "10rem";
                }
            }
        }
    }
    updateTag();

    //_______________________________________CONTENT CHANGE FUNCTION_____________________________________________
    // window.addEventListener("wheel", function (e) {
    // );}
    function changeContent(increment)
    {
        accumulatedDelta += increment;
        if(currentItem==1)
        {
            about.style.display = "block";
            //scroll to upper edge go prv
            if(isEndScroll(about) && increment>0 && Math.abs(accumulatedDelta) >= 1.3*scrollThreshold){
                currentItem++;
                about.scrollTop = 0;
            }
            //scroll to lower edge go next
            else if(isBeginScroll(about) && increment<0 && Math.abs(accumulatedDelta) >= 1.3*scrollThreshold ){
                currentItem--;
                about.scrollTop = 0;
            }
            //scroll to something
            else{
                about.scrollTop += increment;
            }
        }
        //____________________________________INCREMENT/DECREMENT INDEX______________________________________________
        if (Math.abs(accumulatedDelta) >= scrollThreshold) {
            if (accumulatedDelta > 0) {
                currentCircle++;
                if(currentCircle > circlesCur.length - 1){
                    //go next, reset start on 0
                    if(currentItem < items.length - 1) {
                        currentItem ++;
                        currentCircle = 0;
                        imageToVideo(currentItem);
                    }
                    //if last, stick to last
                    else {
                        currentCircle = circlesCur.length - 1;
                    }
                }
            }
            else if (accumulatedDelta < 0) {
                currentCircle--;
                if(currentCircle < 0){
                    //go prv, reset start on last
                    if(currentItem > 0) {
                        currentItem --;
                        circlesCur = contents[currentItem].querySelectorAll('.tags');
                        currentCircle = circlesCur.length - 1;
                        imageToVideo(currentItem);
                    }
                    //if first, stick to first
                    else {
                        currentCircle = 0;
                    }
                }
            }
            if(currentItem == 1){
                //add function that deactivates all tags
                updateAbout();
                if(triggerAbout == true){
                    typeWriter();
                }
                if(isMedium){updateTag(); about.style.display = "block";}
            } else {
                updateTag();
                updateThumbnail(currentCircle, icons, 'profile')
            }
            accumulatedDelta = 0;
        }
    }
    //___________________________________SCROLL KEYBOARD______________________________________________
    window.addEventListener("wheel", function (e) {
        console.log(isMedium);
        changeContent(e.deltaY);
        clearTimeout(resetThreshold);
        resetThreshold = setTimeout(function () {
            accumulatedDelta = 0;
        }, 100); // Adjust the time before the threshold resets
    });
    //___________________________________UP/DOWN KEYBOARD______________________________________________
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp' && document.activeElement === document.body) {
          changeContent(-scrollThreshold);
        }
        if (e.key === 'ArrowDown' && document.activeElement === document.body) {
          changeContent(scrollThreshold);
        }
      });
    window.addEventListener('resize', updateMedia);
  });