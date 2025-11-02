// Function: delay "ms" ms in async function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function: Resize wrapper to background image size
function resizeWrapper() {
    return new Promise((resolve) => { // Promise ensures completion of async function
        // Get properties of wrapper
        const wrapper = document.getElementById('wrapper');
        const wrapperStyles = getComputedStyle(wrapper);

        const container = wrapper.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const bgImage = new Image();

        // Get image URL from CSS background-image
        const rawUrl = wrapperStyles.backgroundImage;
        if (!rawUrl || rawUrl === 'none') {
            resolve();
            return;
        }

        bgImage.src = rawUrl.slice(5, -2); // removes url(" and ") from url

        // once the image loads, resize it
        bgImage.onload = () => {
            // get aspect ratio
            const imgAspect = bgImage.width / bgImage.height;
            const containerAspect = containerWidth / containerHeight;

            let newWidth, newHeight;

            if (containerAspect > imgAspect) {
                // if container is wider than image, adjust width
                newHeight = containerHeight;
                newWidth = newHeight * imgAspect;
            } else {
                // if container is taller than image, adjust height
                newWidth = containerWidth;
                newHeight = newWidth / imgAspect;
            }

            // set adjusted width and height
            wrapper.style.width = `${newWidth}px`;
            wrapper.style.height = `${newHeight}px`;

            // center wrapper horizontally
            wrapper.style.marginLeft = 'auto';
            wrapper.style.marginRight = 'auto';
            if(typeof windowResized === 'function') {
                windowResized();
            }
            
            
            resolve(); // resolve promise when finished
        };
    });
}

// Function: scale text to size of wrapper
function scaleTextToWrapper() {

    // get width and height of wrapper
    const wrapper = document.getElementById('wrapper');
    let textElements = document.querySelectorAll('.scalable-text');
  
    const wrapperWidth = wrapper.offsetWidth;
    const wrapperHeight = wrapper.offsetHeight;
  
    // get adjusted font size
    let adjustedFontSize = (wrapperWidth/2 + wrapperHeight) / 90;
  
    // set font-size property of all elements to adjusted font size
    textElements.forEach(el => {
        if(el.id === 'title') {
            el.style.fontSize = `${adjustedFontSize*5}px`;
        } else if (el.getAttribute('type') === 'button') {
            el.style.fontSize = `${adjustedFontSize/1.2}px`;
        } else if(el.id === "menu-title") {
            el.style.fontSize = `${adjustedFontSize*1.75}px`;
        } else if(el.classList.contains("menu-companion-name")) {
            el.style.fontSize = `${adjustedFontSize*1.3}px`;
        } else {
            el.style.fontSize = `${adjustedFontSize}px`;
        }
    });
}
  
// Function: fade text in
function animateText(element, spd = 50) {
    return;
    let delay = 0;
  
    // Process each text node and preserve HTML structure
    function processNode(node) {
        // Skip spaces/newlines
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
            const text = node.textContent;
            const fragment = document.createDocumentFragment();
            
            // Process node char by char
            for (const letter of text) {
                // if space/newline -> skip animation delay
                if (letter.match(/\s/)) {
                    fragment.appendChild(document.createTextNode(letter));
                    continue;
                }

                // Creates animated span for visible chars
                const span = document.createElement('span');
                span.className = 'letter';
                span.textContent = letter === ' ' ? ' ' : letter; // Preserve spaces
                span.style.animationDelay = `${delay}ms`;
                fragment.appendChild(span);
                delay += spd;
            }
    
            // Replace old text with animated one
            node.replaceWith(fragment);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Recursively process child nodes, such as <span>
            Array.from(node.childNodes).forEach(processNode);
        }
    }
  
    // Animate each paragraph
    Array.from(element.children).forEach(paragraph => {
        // Process child notes
        Array.from(paragraph.childNodes).forEach(processNode);
    });
  }

// Dynamically load content in text and options blocks
const textBlocks = Array.from(document.querySelectorAll('.step'));
const optionBtns = Array.from(document.querySelectorAll('.option-button'));
let textIndex = 0;
let optionsIndex = 0;

// Function: called when user clicks an option-button -> load next set of text and options
async function nextStep(oldNumOfButtons, numOfButtons) {
    // Fade current buttons out
    for(var i = 0; i < oldNumOfButtons; i++) {
        optionBtns[optionsIndex+i].classList.add('fade-out');
    }
    // Fade out current text block
    textBlocks[textIndex].classList.add('fade-out');

    await delay(500);

    // Hide curr elements and show next
    textBlocks[textIndex].hidden = true;
    for(var i = 0; i < oldNumOfButtons; i++) {
        optionBtns[optionsIndex+i].hidden = true;
    }
    textIndex++;
    optionsIndex += oldNumOfButtons;
    textBlocks[textIndex].hidden = false;
    for(var i = 0; i < numOfButtons; i++) {
        optionBtns[optionsIndex+i].hidden = false;
        optionBtns[optionsIndex+i].classList.add('fade-in');
    }

    // Animation-fade in new text
    animateText(textBlocks[textIndex], 30);

    // Clean up: remove fade-out class
    setTimeout(() => {
        if(textBlocks[textIndex-1]) {
            textBlocks[textIndex-1].classList.remove('fade-out');
        }
        for(var i = 1; i <= oldNumOfButtons; i++) {
            optionBtns[optionsIndex-i].classList.remove('fade-out');
        }
    }, 500);

}

// Function: called when user clicks last option-button of page -> load next page
function nextPage(pagePath) {
    document.getElementById('wrapper').style.opacity = '0'; // fade out
        setTimeout(() => {
            window.location.href = pagePath;
        }, 500); // .5 s transition
        return;
}

/* OLD CODE: Move through blocks of text (keep in case needed later) */
/*
const continueBtn = document.getElementById('continue-btn');

if(continueBtn) {
    var continueBtnVal = "continue";
    if(continueBtn.getAttribute('value') !== "continue") {
        continueBtnVal = continueBtn.getAttribute('value');
        continueBtn.setAttribute('value', "continue");
    }
    const textBlocks = Array.from(document.querySelectorAll('.step'));
    const optionBtns = Array.from(document.querySelectorAll('.option-button'));
    let index = 0;
    
    continueBtn.addEventListener('click', async () => {
        let changeOptions = false;
        // if last text block, fade out and continue to next page
        if (index >= textBlocks.length - 1) {
            document.getElementById('wrapper').style.opacity = '0'; // fade out
            setTimeout(() => {
                window.location.href = continueBtn.dataset.target;
            }, 500); // .5 s transition
            return;
        } else if (index == textBlocks.length - 2) { // if on second to last step
            if(optionBtns.length > 1) {
                changeOptions = true;
            }
        }
        
        // Fade "continue" button out
        continueBtn.classList.add('fade-out');
        // Fade out current text block
        textBlocks[index].classList.add('fade-out');
        await new Promise(resolve =>  // Wait to fully fade out
            setTimeout(resolve, 500) // .5s
        );
        
        // Hide curr element and show next
        textBlocks[index].hidden = true;
        continueBtn.hidden = true;
        index++;
        textBlocks[index].hidden = false;

        if (index == textBlocks.length - 1) { // if on second to last step
            if(continueBtnVal !== "continue") { // if last step is not continue, change it
                continueBtn.setAttribute('value', continueBtnVal);
            }
        }

        // If need to change options, hide button and show the rest
        if (index === textBlocks.length - 1 && optionBtns.length > 1) {
            optionBtns.forEach((btn, i) => {
                if (i > 0) { // Skip continue-btn
                    btn.hidden = false;
                    btn.classList.add('fade-in');
                }
            });
        } else { // If no need to change options, fade continue-btn back in
            continueBtn.hidden = false;
            continueBtn.classList.add('fade-in');
        }
        
        // Fade in new content
        animateText(textBlocks[index], 30);

        // Clean up: remove fade-out class
        setTimeout(() => {
            if(textBlocks[index-1]) {
                textBlocks[index-1].classList.remove('fade-out');
            }
            continueBtn.classList.remove('fade-out');
        }, 500);
    });
} */

// Function: check if image exists
function imageExists(path) {
    return new Promise((resolve) => {
        // Create image
        const img = new Image();
        // if it loads, it exists
        img.onload = () => resolve(true);
        // if error, it does NOT exist
        img.onerror = () => resolve(false);
        // set given path for image
        img.src = path;
    });
}

// Function: wait for dynamic content (elements with user interaction)
function waitForDynamicContent() {
    return new Promise(resolve => {
        // Iterate through dynamic content
        if (document.querySelectorAll('.dynamic-content').length > 0) {
            // Check for changes to elements
            const observer = new MutationObserver((mutations) => {
                // Check if element is attached to document (not just created)
                if (document.querySelector('.dynamic-content').isConnected) {
                    observer.disconnect();
                    resolve();
                }
            });
            // Go through child elements
            observer.observe(document.body, { childList: true, subtree: true });
        } else { // if no dynamic content, move on
            resolve();
        }
    });
}

// When window loads:
window.addEventListener('load', async function() {
    // Add menu display
    const header = document.querySelector('header-section');
    if(header) {
        header.insertAdjacentHTML("afterEnd", `
            <!-- Menu Pop-Up -->
            <div id="menu-overlay"></div>
    
            <!-- Menu Display -->
            <div id="menu-display">
                <!-- Inventory -->
                <div class="scalable-text" id="menu-title"></div>
                <div id="menu-inventory">
                </div>
    
                <!-- Companions -->
                <div id="menu-companions">
                    <div class="menu-companion"></div>
                    <div class="menu-companion"></div>
                    <div class="menu-companion"></div>
                    <div class="menu-companion"></div>
                    <div class="menu-companion"></div>
                    <div class="menu-companion"></div>
                </div>
    
                <div id="exit-menu">
                    <input class="scalable-text" id="menu-exit-btn" type="button" value="X" onclick="removeMenuDisplay()"/>
                </div>
            </div>
        `);
    }
    

    // Load background image
    var url = window.location.pathname;
    var path = url.split("/");
    
    if(!(path[path.length-1] === "index.html")) {
      var imagePath = "../../../images/" + path[path.length-3] + "/" + 
                                            path[path.length-2] + "/" + 
                                            path[path.length-1].substring(0,path[path.length-1].indexOf('.')) + ".png";
      // if image DNE -> already set default background image
      if (await imageExists(imagePath)) {
        document.getElementById("wrapper").style.backgroundImage = `url('${imagePath}')`;
      }
    }

    // Resize wrapper -> then scale text
    await resizeWrapper();
    scaleTextToWrapper();
    
    // Wait for dynamic content (not applicable for now)
    await waitForDynamicContent();
    
    // Fade in wrapper
    document.body.classList.add('loaded');

    // Fade in text
    document.querySelectorAll('.scalable-text').forEach(el => {
        animateText(el, 30); // delay = 30ms per letter
    });

    // Fade out wrapper
    const transitionElement = document.getElementById('wrapper'); // get wrapper element

    // Iterate through buttons
    /*document.querySelectorAll('input[type="button"]').forEach(button => {
        // When button is clicked:
        button.addEventListener('click', function(e) {
            const targetPage = button.dataset.target; // get target location
            if(!(button.classList.contains("option-button") || button.classList.contains("collapsible"))) {
                transitionElement.style.opacity = '0'; // fade out
                // Go to target locations
                setTimeout(() => {
                    window.location.href = targetPage;
                }, 500); // .5 s transition
            }
        });
    });*/
    
  });

// Handle navigation
window.addEventListener('beforeunload', () => {
    document.body.classList.add('leaving');
});

// Resize window -> resize wrapper and scale text
window.addEventListener('resize', () => {
    resizeWrapper().then(scaleTextToWrapper);
});

// Function: when "device data"/"companions" is clicked, display device data or companions
function displayMenuPopup(menu_option) {
    // fade in menu-overlay and menu-display
    var menu_overlay = document.getElementById("menu-overlay");
    var menu_display = document.getElementById("menu-display");
    if (menu_overlay.classList.contains("fade-out")) {
        menu_overlay.classList.remove("fade-out");
    }
    if (menu_display.classList.contains("fade-out")) {
        menu_display.classList.remove("fade-out");
    }
    menu_overlay.classList.add("fade-in");
    menu_display.classList.add("fade-in");

    // add/adjust inventory (0) or companions (1) for display
    if(menu_option == 0) { // inventory
        // fade in inventory
        var menu_inventory = document.getElementById("menu-inventory");
        if (menu_inventory.classList.contains("fade-out")) {
            menu_inventory.classList.remove("fade-out");
        }
        menu_inventory.classList.add("fade-in");

        // set inventory title
        var menu_title = document.getElementById("menu-title");
        menu_title.innerHTML = "Inventory";

        // add items from inventory to display
        var inventory_container = document.getElementById('menu-inventory');
        var inventoryHTMLString = "";
        var inventory = JSON.parse(localStorage.getItem("inventory"));
        if(inventory) {
            inventory.forEach(item => {
            inventoryHTMLString += `
                <div class="menu-item scalable-text menu-text">
                    <div class="item-bullet"></div>
                    ` + item + `</div>
                `;
            });
        }

        // insert HTML
        inventory_container.insertAdjacentHTML('beforeEnd', inventoryHTMLString);

    } else { // Companions
        // fade in companions list
        var menu_companions = document.getElementById("menu-companions");
        if (menu_companions.classList.contains("fade-out")) {
            menu_companions.classList.remove("fade-out");
        }
        menu_companions.classList.add("fade-in");

        // set companions title
        var menu_title = document.getElementById("menu-title");
        menu_title.innerHTML = "Companions";

        // get companions-container and creatures list from local storage
        var companions_container = document.getElementById('menu-companions');
        var companionsHTMLString = "";
        var companions = JSON.parse(localStorage.getItem("creatures"));
        const children = companions_container.children; // creature HTML elements (6 of them)
        var child_index = 0;
        if(companions) {
            companions.forEach(companion => { // iterate through creatures
                // creature name
                companionsHTMLString += `<div class="menu-companion-header">`;
                companionsHTMLString += `
                    <div class="scalable-text menu-text menu-companion-name">` + companion.name + `</div>
                `;
    
                // status: active/inactive
                companionsHTMLString += `<div class="scalable-text menu-text menu-companion-status">`;
                if (companion.status == true) {
                    companionsHTMLString += `(active)</div>`;
                } else {
                    companionsHTMLString += `(inactive)</div>`;
                }
                companionsHTMLString += `</div>`;
                
                // List of creature's moves
                companion.moves.forEach(move => {
                    companionsHTMLString += `
                        <div class="scalable-text menu-text menu-companion-move">` + 
                        `<div class="move-bullet"></div>` + 
                        move + 
                        `</div>
                    `;
                });
                
                children[child_index].insertAdjacentHTML('beforeEnd', companionsHTMLString);
                companionsHTMLString = "";
                child_index++;
            });
        }
        

        // insert HTML
        companions_container.insertAdjacentHTML('beforeEnd', companionsHTMLString);
    }
}

// Function: when "X" is clicked, exits menu pop-up
function removeMenuDisplay() {
    // fade out menu-overlay and display
    var menu_overlay = document.getElementById("menu-overlay");
    var menu_display = document.getElementById("menu-display");
    if (menu_overlay.classList.contains("fade-in")) {
        menu_overlay.classList.remove("fade-in");
    }
    if (menu_display.classList.contains("fade-in")) {
        menu_display.classList.remove("fade-in");
    }
    menu_overlay.classList.add("fade-out");
    menu_display.classList.add("fade-out");

    // clear inventory and creatures in display
    // fade out inventory and companions list
    var menu_inventory = document.getElementById("menu-inventory");
    var menu_companions = document.getElementById("menu-companions");
    if (menu_inventory.classList.contains("fade-in")) {
        menu_inventory.classList.remove("fade-in");
    }
    if (menu_companions.classList.contains("fade-in")) {
        menu_companions.classList.remove("fade-in");
    }
    menu_inventory.classList.add("fade-out");
    menu_companions.classList.add("fade-out");

    // clear inventory in display
    menu_inventory.textContent = "";
}

