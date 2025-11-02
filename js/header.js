class Header extends HTMLElement {
    connectedCallback() { // Inserts html into all scenes
      this.innerHTML = `
        <!-- Diplays user icon, pet icon, and iventory items -->
        <div id="HUD"> 
            <img id="user-icon" src="../../../images/misc/temp-icon.png">
            <div id="pet-and-inventory">
                <img id="pet-icon" src="../../../images/misc/temp-icon.png"/>
                <!-- Add grid of items for inventory -->
            </div>
        </div>

        <!-- Home button -> return to homescreen (removes all progress) -->
        <div id="menu">
          <input id="menu-btn" class="scalable-text collapsible" type="button" value="menu"/>
          <nav class="menu-options fade-out">
              <input class="scalable-text only-text menu-option-btns" type="button" value="home" onclick="nextPage('../../../index.html')"/>
              <input class="scalable-text only-text menu-option-btns" type="button" value="device data" onclick="displayMenuPopup(0)"/>
              <input class="scalable-text only-text menu-option-btns" type="button" value="companions" onclick="displayMenuPopup(1)"/>
          </nav>
        </div>
      `;

      // hides/shows collapsible menu options
      var menu = document.getElementsByClassName("collapsible");
      const menuOptionBtns = this.querySelectorAll(".menu-option-btns");

      // iterate through menu options
      for (var i = 0; i < menu.length; i++) {
        // if clicked, fade in/out depending on if its shown/hidden
        menu[i].addEventListener("click", function() {
          var options = this.nextElementSibling;
          if (options.classList.contains("fade-out")) {
            options.classList.remove("fade-out");
            options.classList.add("fade-in");
          } else {
            options.classList.remove("fade-in");
            options.classList.add("fade-out");
          }
        });
      }
    }
  }
  customElements.define('header-section', Header);
