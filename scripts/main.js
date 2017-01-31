(function(){
	window.addEventListener("load", function(){

		//media queries
		var desktop = window.matchMedia("(min-width: 1000px)");

		function breakPoint(){
			if (desktop.matches){
				navContent.classList = "";
				navContent.classList.add("fade-in");
				navBar.classList.remove("menu-open");
				navBarBtn.classList.remove("active");
				contentWrapper.classList = "";
				contentWrapper.classList.add("visible");
			} else {
				navContent.classList = "";
				navContent.classList.add("fade-out");
				navBar.classList.remove("menu-open");
				navBarBtn.classList.remove("active");
				contentWrapper.classList = "";
				contentWrapper.classList.add("visible");
			}
		}
		window.addEventListener("resize", breakPoint);

		// DOM items
		var navBarBtn = document.getElementById("nav-bar-btn");
		var navBar = document.getElementById("nav-bar");
		var navContent = document.getElementById("nav-content");
		var contentWrapper = document.getElementById("content-wrapper");
		var navBtns = document.getElementsByClassName("nav-btn");
		var sections = document.getElementsByClassName("section");
		var nextPageBtn = document.getElementById("next-page-btn");
		var triangle = document.getElementById("triangle");
		var main = document.getElementsByTagName("main")[0];
		var portfolioContentBtns = document.getElementsByClassName("portfolio-content-btn");
		var portfolioSelectedWrapper = document.getElementById("portfolio-selected-wrapper");
		var portfolioItemsWrapper = document.getElementById("portfolio-items-wrapper");
		var portfolioItemContent = document.getElementsByClassName("portfolio-item-content");
		var portfolioBackBtn = document.getElementsByClassName("portfolio-back-btn");
		var portfolioItemImgWrapper = document.getElementsByClassName("portfolio-item-img-wrapper");
		var formSubmitBtn = document.getElementById("form-submit-btn");
		var formName = document.getElementById("form-name");
		var formEmail = document.getElementById("form-email");
		var formMessage = document.getElementById("form-message");
		var contactFormWrapper = document.getElementById("contact-form-wrapper");
		var nameError = document.getElementById("name-error");
		var emailError = document.getElementById("email-error");
		var messageError = document.getElementById("message-error");
		var links = document.getElementsByClassName("link");


		/* general state and functions */
		var appState = {
			currentPage: "home",
			nextPage: "about",
			pageOrder: [
				"home", 
				"about", 
				"portfolio", 
				"contact", 
				"other"
			],
			currentPortfolioItem: "ttpd",
			portfolioOrder: [
				"ttpd",
				"pp",
				"mimmo",
				"mushroom"
			],
		};

		function checkState(){
			for (var x = 0; x < sections.length; x++){
				var sectionID = sections[x].id.replace("-section", "");
				sections[x].classList.remove("active-section");
				if (sectionID === appState.currentPage){
					sections[x].classList.add("active-section");
				}
			};
			for (var x = 0; x < navBtns.length; x++){
				var navBtnId = navBtns[x].id.replace("-btn", "");
				navBtns[x].classList.remove("active-nav-btn");
				if (navBtnId === appState.currentPage){
					navBtns[x].classList.add("active-nav-btn");
				}
			};
			if (appState.currentPage === "home") {
				nextPageBtn.innerHTML = "Start";
			} else {
				nextPageBtn.innerHTML = "More";
			}
			if (appState.currentPage === "other") {
				nextPageBtn.innerHTML = "End";
			}
			portfolioItemsWrapper.classList = "";
			portfolioSelectedWrapper.classList = "";
		}

		function themeChange(){
			triangle.classList = "";
			triangle.classList.add(appState.currentPage + "-triangle-theme");
			nextPageBtn.classList = "";
			nextPageBtn.classList.add("fade-in");
			nextPageBtn.classList.add(appState.currentPage + "-next-page-style");
		}

		// main menu
		function toggleMenu(){
			if (!desktop.matches){
				if (navBar.classList.contains("menu-open")) {
					navBar.classList.remove("menu-open");
				} else {
					navBar.classList.add("menu-open");
				}
				if( navBarBtn.classList.contains("active")){
					navBarBtn.classList.remove("active");
				} else {
					navBarBtn.classList.add("active");
				}
				if (navContent.classList.contains("fade-in")) {
					navContent.classList.remove("fade-in");
					navContent.classList.add("fade-out");
				} else {
					navContent.classList.remove("fade-out");
					navContent.classList.add("fade-in");
				};
				if (contentWrapper.classList.contains("fade-in") 
					|| contentWrapper.classList.contains("visible")
					|| contentWrapper.classList.contains("slide-in-top")
					|| contentWrapper.classList.contains("slide-in-bottom")) {
					contentWrapper.classList = "";
					contentWrapper.classList.remove("fade-in");
					contentWrapper.classList.add("fade-out");
				} else {
					contentWrapper.classList.remove("fade-out");
					contentWrapper.classList.add("fade-in");
				}
			}
		}
		navBarBtn.addEventListener("click", toggleMenu);

		// menu items
		for(var x = 0; x < navBtns.length; x++){
			navBtns[x].onclick = function(e){
				var BtnClicked = e.currentTarget.id.replace("-btn", "");
				function mobileClick(){
					appState.currentPage = BtnClicked;
					checkState();
					toggleMenu();
					themeChange();
					window.scrollTo(0,0);
					main.scrollTop = 0;
				}
				function desktopClick(){
					var currentPageIndex = appState.pageOrder.indexOf(appState.currentPage);
					var nextPageIndex = appState.pageOrder.indexOf(BtnClicked);
					var nextPage = appState.pageOrder[nextPageIndex];
					appState.currentPage = nextPage;

					if (nextPageIndex > currentPageIndex){
						contentWrapper.classList = "";
						contentWrapper.classList.add("slide-out-top");
						var timeout = setTimeout(function(){
							checkState();
							themeChange();
							contentWrapper.classList = "";
							contentWrapper.classList.add("slide-in-bottom");
							window.scrollTo(0,0);
							main.scrollTop = 0;
						},300);
					} else if (nextPageIndex === currentPageIndex){
						console.log("not going anywere")
					} else {
						contentWrapper.classList = "";
						contentWrapper.classList.add("slide-out-bottom");
						var timeout = setTimeout(function(){
							checkState();
							themeChange();
							contentWrapper.classList = "";
							contentWrapper.classList.add("slide-in-top");
							window.scrollTo(0,0);
							main.scrollTop = 0;
						},300);
					}

				}
				if (!desktop.matches){
					mobileClick();
				} else {
					desktopClick();
				}
			}
		}

		// link in site
		for (var x = 0; x < links.length; x++){
				links[x].onclick = function(e){
				var BtnClicked = e.currentTarget.id.replace("-link", "");
				function linkClick(){
					var currentPageIndex = appState.pageOrder.indexOf(appState.currentPage);
					var nextPageIndex = appState.pageOrder.indexOf(BtnClicked);
					var nextPage = appState.pageOrder[nextPageIndex];
					appState.currentPage = nextPage;
					if (nextPageIndex > currentPageIndex){
						contentWrapper.classList = "";
						contentWrapper.classList.add("slide-out-top");
						var timeout = setTimeout(function(){
							checkState();
							themeChange();
							contentWrapper.classList = "";
							contentWrapper.classList.add("slide-in-bottom");
							window.scrollTo(0,0);
							main.scrollTop = 0;
						},300);
					} else if (nextPageIndex === currentPageIndex){
						console.log("not going anywere")
					} else {
						contentWrapper.classList = "";
						contentWrapper.classList.add("slide-out-bottom");
						var timeout = setTimeout(function(){
							checkState();
							themeChange();
							contentWrapper.classList = "";
							contentWrapper.classList.add("slide-in-top");
							window.scrollTo(0,0);
							main.scrollTop = 0;
						},300);
					}
				}
				linkClick();
			}
		}

		// next page
		function nextPage(){
			if (appState.currentPage !== "other"){
				var currentPageIndex = appState.pageOrder.indexOf(appState.currentPage);
				var nextPage = appState.pageOrder[currentPageIndex + 1];
				appState.currentPage = nextPage;
				contentWrapper.classList = "";
				contentWrapper.classList.add("slide-out-top");
				var timeout = setTimeout(function(){
					checkState();
					themeChange();
					contentWrapper.classList = "";
					contentWrapper.classList.add("slide-in-bottom");
					window.scrollTo(0,0);
					main.scrollTop = 0;
				},300)
			}
		}
		nextPageBtn.addEventListener("click", nextPage);

		function portfolioItemCheck(){
			var currItem = appState.currentPortfolioItem;
			var currItemId = currItem + "-item"
			for (var i = 0; i < portfolioItemContent.length; i++){
				portfolioItemContent[i].classList.remove("active");
				if (portfolioItemContent[i].id === currItemId) {
					portfolioItemContent[i].classList.add("active");
				}
			}
		}

		// portfolio
		for (var x = 0; x < portfolioContentBtns.length; x++){
			portfolioContentBtns[x].onclick = function(e){
				var portfolioId = e.currentTarget.id.replace("-btn", "");
				appState.currentPortfolioItem = portfolioId;
				portfolioItemsWrapper.classList = "";
				portfolioItemsWrapper.classList.add("fade-out");
				nextPageBtn.classList = "";
				nextPageBtn.classList.add("fade-out");
				var timeout = setTimeout(function(){
					portfolioItemCheck();
					portfolioItemsWrapper.classList.add("inactive");
					portfolioSelectedWrapper.classList.add("active-section");
					portfolioSelectedWrapper.classList.add("fade-in");
					nextPageBtn.classList.add("invisible");
					window.scrollTo(0,0);
					main.scrollTop = 0;
				}, 300);
			}
		}
		// back btn
		for (var x = 0; x < portfolioBackBtn.length; x++){
			portfolioBackBtn[x].onclick = function(){
				portfolioSelectedWrapper.classList.add("fade-out");
				nextPageBtn.classList = "";
				nextPageBtn.classList.add("fade-in");
				nextPageBtn.classList.add("portfolio-next-page-style");
				var timeout = setTimeout(function(){
					portfolioSelectedWrapper.classList = "";
					portfolioItemsWrapper.classList = "";
					portfolioItemsWrapper.classList.add("fade-in");
					window.scrollTo(0,0);
					main.scrollTop = 0;
				}, 300)
			}
		}

		// gallery
		function touchStart(elem){
			elem.preventDefault();
			alreadyScrolled = this.scrollLeft;
			startPos = elem.touches[0].clientX - this.getBoundingClientRect().left;
		}
		function touchEnd(elem){
			elem.preventDefault();
		}
		function touchCancel(elem){
			elem.preventDefault();
		}
		function touchMove(elem){
			elem.preventDefault();
			var xPosTouch = elem.touches[0].clientX - this.getBoundingClientRect().left;
			this.scrollLeft = alreadyScrolled + (startPos - xPosTouch);
			this.classList.remove("swipe");
		}

		for (var x = 0; x < portfolioItemImgWrapper.length; x++){
			var alreadyScrolled = 0;
			var startPos = 0;
			portfolioItemImgWrapper[x].addEventListener("touchstart", touchStart, false);
			portfolioItemImgWrapper[x].addEventListener("touchend",touchEnd, false);
			portfolioItemImgWrapper[x].addEventListener("touchmove",touchMove, false);
			if (!desktop.matches){
				portfolioItemImgWrapper[x].classList.add("swipe");
			}
		}

		// form
		function submitForm() {
			var name = formName.value;
			var email = formEmail.value;
			var message = formMessage.value;
			var nameOK = false;
			var emailOK = false;
			var messageOK = false;
			var emailRE = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

			if (name === ""){
				nameError.innerHTML = "Please fill in a name!";
			} else {
				nameError.innerHTML = "";
				nameOK = true;
			}
			if (email === ""){
				emailError.innerHTML = "Please fill in an email!";
			} else {
				emailError.innerHTML = "";
				if (email.match(emailRE)){ // check if email is emaily
					emailOK = true;
				} else {
					emailError.innerHTML = "Email does not look correct..";
				}
			}
			if (message === ""){
				messageError.innerHTML = "Please fill in a message!";
			} else {
				messageError.innerHTML = "";
				messageOK = true;
			}
			if (nameOK && emailOK && messageOK){ // not empty
				function sendForm(name, email, message) {
					var http = new XMLHttpRequest();
					http.onreadystatechange = function(){
						if (this.readyState === 4 && this.status === 200){
							contactFormWrapper.innerHTML = this.responseText;
						}
					}
					http.open("GET", "scripts/form.php?name=" + name + "&email=" + email + "&message=" + message, true);
					http.send();
				}
				contactFormWrapper.innerHTML = "just a sec...";
				sendForm(name, email, message);

			} // not empty
		} //submitForm
		formSubmitBtn.addEventListener("click", submitForm);
	})
})();
