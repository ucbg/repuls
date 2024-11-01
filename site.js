	var home_ScaleFactor = 1200;
	var play_ScaleFactor = 1280;
	var m_initialized = false;
	var m_inGame = true;
	var feature_next = "youtube";
	var first_load = true;
	var lastWindowSize;
	var shouldShowAds = false;
	var m_adblock_detected = false;
	var gameState = "menu";
	
    function clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }
    
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }


	window.addEventListener('resize', onResize);
	window.addEventListener('load', onLoad);
	window.addEventListener('focus', onFocus);
	window.addEventListener('blur', onBlur);
	window.addEventListener('DOMContentLoaded', onSiteEnter);
	window.onerror=function(){return true;}

	function onSiteEnter()
	{
		SetRandomBackground();
	}

	function onLoad()
	{
		// alert("Repuls is being updated. Issues may occur. Sorry for the inconvenience.");
		PokiSDK.enableEventTracking(1);

		showLoader();
		// window.devicePixelRatio = 1;
		game_isLoaded = true;

		if (yt_isPlaying)
		{
			MuteGame(1);
		}

		// document.getElementById("yt_thumb").href = feature_yt_url;


		// Initialize Logger
		// Logging_Init();
		
		tw_Show(true);
		tw_Update();
		//tw_stream_update = setInterval(tw_Update, 10000);
	}

function Start()
{
	Analytics_OnGameLoaded();
	ext_setPixelRatio(0.9);
		
	var game = document.getElementById("game");
	document.getElementById("game-container-main").appendChild(game); 
	scaleGame();

	var pokiContainer = document.getElementById("game-container");
	if (pokiContainer != null)
		document.getElementById("game-container").remove();
	
	if(window.location.href.includes("?r=")){

		var url = new URL(window.location.href);
		var serverLocation = url.searchParams.get("r");
		window.unityGame.SendMessage('!game', 'OnWebGetInviteUrl', serverLocation);
	}
	
	if (yt_isPlaying)
	{
		MuteGame(1);
	}
}

	function onResize()
	{
		scaleGame();
		scaleUi();
	}
	
	function onFocus()
	{
		windowHasFocus = true;
		scaleGame();
		if (lastWindowSize  !== clamp(window.innerWidth / home_ScaleFactor, .5, 1))
			scaleUi();
	}
	
	function onBlur()
	{
		windowHasFocus = false;
	}

	function WaitForAd()
	{
	}
	
	function scaleGame()
	{
		var game = document.getElementById("game");
		game.width = window.innerWidth *  window.devicePixelRatio;;
		game.height = window.innerHeight *  window.devicePixelRatio;;
	}

	function scaleUi()
	{
		//if(!m_initialized)
		//	return;
	
		if(m_adblock_detected)
			ScaleAdblockAds();

		var ratio = clamp(window.innerWidth / home_ScaleFactor, .5, 1);
		
		var ad_letter = document.getElementById("PokiUnitySDK_Ad_ad_letter");
		var ad_box = document.getElementById("PokiUnitySDK_Ad_ad_box");
		
		if(m_inGame)
		{
			ratio = clamp(window.innerWidth / play_ScaleFactor, .5, 1);
		} 
		else
		{
			/*if (ad_box)
				ad_box.style.bottom = "35vh";*/
		}

		document.getElementById("invite_box").style.transform = "translate(-50%,0%) scale(" + ratio + ")";

		document.getElementById("repuls_logo").style.transform = "translate(-50%,0%) scale(" + ratio + ")";

		document.getElementById("featuredContent").style.transform = "scale(" + ratio + ")";

		document.getElementById("idLinks").style.transform = "scale(" + (ratio*.85) + ")";

		if (ad_letter)
			removeAd("ad_letter");
			// default size: 1219

			if(shouldShowAds)
				createAd("ad_letter", "728x90", "1%", "auto", "bottom center");

		// update reference:
		ad_letter = document.getElementById("PokiUnitySDK_Ad_ad_letter");

		if (ad_letter)
		{
			ad_letter.style.transform = 'scale(' + ratio + ', ' + ratio + ')';
			ad_letter.style.left = "50%";
			ad_letter.style.marginLeft = "-364px";
		}

		if(ad_box)
			removeAd("ad_box");

		if(window.innerHeight > 475 && window.innerWidth > 800){
			if(shouldShowAds)	
				createAd("ad_box", "300x250", "20%", ".3%", "bottom right");
		} 
		// update reference:
		ad_box = document.getElementById("PokiUnitySDK_Ad_ad_box");


		if(ad_box){
			ad_box.style.transform = 'scale(' + ratio + ', ' + ratio + ')';
		}

		lastWindowSize = ratio;
	}
	
	function showLoader()
	{
	    var perc = 0;
	    const progressBar = document.querySelector("#sol_loader .progress-bar span");
	                
	    var x = setInterval(function() {

	        progressBar.style.width = perc + "%";
        
            perc += getRandomInt(5); 
                    
            if (perc > 100) {
                clearInterval(x);
            }
        }, 100);
	}
	
	function SetRandomBackground() 
{
	var num = Math.ceil( Math.random() * 3 );
	document.getElementById("loader_img").src = '/img/repuls_wallpaper_01.jpg';
	//document.getElementById("loader_img").src = '/img/repuls_wallpaper_01.jpg';
	//$('.bg').css({'background-image': 'url(/img/loader_'+num+'.jpg)'});
	//document.getElementsByClassName('bg')[0].css({'background-size': 'cover'});
}
	
function hideLoader()
{
	document.getElementById("sol_loader").style.display = "none";
	document.getElementById("repuls_logo").style.zIndex = 10;
}

	function createAd(identifier, size, bottom, right, origin)
	{
		if(gameState == "playing"){
			return;
		}
			
	
		var container = undefined;
		if(!window._cachedAdPositions) window._cachedAdPositions = {};
		container = window._cachedAdPositions[identifier];

		if(!container){
			container = document.createElement('div');
			container.setAttribute('id', 'PokiUnitySDK_Ad_'+identifier);
			document.body.appendChild(container);
			window._cachedAdPositions[identifier] = container;
		}

		container.style.position = 'absolute';
		container.style.zIndex = 999;

		container.style.bottom = bottom;
		container.style.right = right;

		container.style.transformOrigin  = origin;

		PokiSDK.displayAd(container,size);
	}

	function removeAd(identifier)
	{
		if(window._cachedAdPositions){
			const container = window._cachedAdPositions[identifier];
			if(container)
			{
				PokiSDK.destroyAd(container);
				container.style.bottom = '-10000px';
			}
		}
	}

function showAds()
{
	/*createAd("ad_box", "300x250", "20%", ".3%", "bottom right");
	createAd("ad_letter", "728x90", ".5%", "auto", "bottom center");
	
	m_initialized = true;*/
	shouldShowAds = true;
	scaleUi();
	
	if(m_adblock_detected){
		ShowAdblockAds();
	}
}

function removeAds()
{
	removeAd("ad_letter");
	removeAd("ad_box");
	
	if(m_adblock_detected)
	{
		RemoveAdblockAds("partnerAd_letter");
	}
		
	shouldShowAds = false;
}

function tw_Show(show)
{
	if( show === true){
        	document.getElementById("featuredContent").style.display = "flex";
	} else {
        	document.getElementById("featuredContent").style.display = "none";
	}
}

function tw_Update()
{
	feature_YouTube();
	return;
	
	if (feature_next == "twitch")
	{
		feature_Twitch();

	fetch(
        'https://api.twitch.tv/kraken/streams/?game=REPULS',
        {
            headers: 
            {
                'client-id': 'zdd2ojo0ykkbm9e81jm3p67bu1un47',
                'accept': 'application/vnd.twitchtv.v5+json'
            }
        }
    )
    .then(resp => { return resp.json() })
    .then(resp => { tw_DisplayStreamers(resp) })
    .catch(err => { console.log(err) });
	}
	else
	{
		feature_YouTube();
	}

}

function feature_YouTube()
{
	feature_next = "twitch";
	document.getElementById("featuredStreamers").style.display = "none";
	document.getElementById("featuredVideos").style.display = "flex";
}

function feature_Twitch()
{
	feature_next = "youtube";
	document.getElementById("featuredStreamers").style.display = "block";
	document.getElementById("featuredVideos").style.display = "none";
}


function tw_DisplayStreamers(resp)
{
    var i;
    for (i = 0; i < 5; i++) 
    {
        var index = i + 1;
        
        var entry = document.getElementById("tw_entry_0" + index);
        var url = document.getElementById("tw_url_0" + index);
        var icon = document.getElementById("tw_icon_0" + index);
        var uname = document.getElementById("tw_uname_0" + index);
        var count = document.getElementById("tw_count_0" + index);
            
        if(resp.streams.length === 0 && i === 1)
        {
	    entry.style.display = "flex";
            
            url.href = "https://www.twitch.tv/directory/game/REPULS";
            icon.src = "";
            uname.innerHTML = "";
            count.innerHTML = "Stream on twitch to be featured here.";

            return;
        }
            
        if(i < resp.streams.length)
        {
            entry.style.display = "flex";
            
            url.href = resp.streams[i].channel.url;
            icon.src = resp.streams[i].channel.logo;
            uname.innerHTML = resp.streams[i].channel.display_name;
            count.innerHTML = resp.streams[i].viewers + " viewers";
        }
        else 
        {
            entry.style.display = "none";
        }
    }
}

function ad_Refresh()
{
	if(windowHasFocus)
		showAds();
}


function hideMainUi()
{
	tw_Show(false);
	// clearInterval(tw_stream_update);
	clearInterval(ad_refresh_update);
}

function ext_showHomeUi()
{
	Start();

	m_inGame = false;
		
	showAds();
	hideLoader();

	// show logo
	document.getElementById("repuls_logo").style.display = "none";
	// document.getElementById("idTips").style.display = "flex"; 

    //tw_Show(true);
    //tw_Update();
    //tw_stream_update = setInterval(tw_Update, 10000);

	ad_refresh_update = setInterval(ad_Refresh, 60000);

	document.getElementById("idLinks").style.display = "flex";

	// Send to logger?
	if(first_load == true)
	{
		//Report_GameLoaded();
		first_load = false;
	}

}

function ext_play()
{
	Analytics_OnClickPlay();
			
  	m_inGame = true;

  	document.getElementById("repuls_logo").style.display = "none";

  	// document.getElementById("idTips").style.display = "none";
  
	const ad_box = document.getElementById("PokiUnitySDK_Ad_ad_box");
  	if(ad_box)
    		removeAd("ad_box");

	document.getElementById("idLinks").style.display = "none";

	hideMainUi();
}

function ext_showLobbyUi()
{
	Analytics_OnJoinedLobby();
  	showAds();
}

function ext_hideLobbyUi()
{
	Analytics_OnSpawned();
  	removeAds();
}

function ext_openUrl(url)
{
  	window.open(url, "_blank"); 
}

function ext_showInviteModal(url)
{
	var popInvite = document.getElementById("modal_Invite");
	popInvite.style.display = "block";
    
	// setup field
	var textField = document.getElementsByClassName('inviteField')[0];
	textField.value = url;  

	// assign button event
	document.getElementById("inviteButton").onclick = function() {
		textField.focus();
        textField.value = url;
        textField.setSelectionRange(0, textField.value.length);
        var succeeded;
        try { 
        	succeeded = document.execCommand('copy'); 
        	popInvite.style.display = "none";
        } catch (e) {}
        alert(succeeded ? 'Link Copied! Share it with your friend(s).' : 'An error occured. Try copying the link manually.');
    }
}
	
function ext_setPixelRatio(ratio)
{
	window.devicePixelRatio = ratio;
	scaleGame();
}

function ext_adblockDetected()
{
	Analytics_OnAdblockDetected();
	
	m_adblock_detected = true;	
	ShowAdblockAds();	
	scaleUi();
}

function ShowAdblockAds()
{
	var ad_letter = document.getElementById("partnerAd_letter");
	if (ad_letter)
	{
		ad_letter.style.display = "block";
	}	
	
	var ad_box = document.getElementById("partnerAd_box");
	if (ad_box)
	{
		ad_box.style.display = "block";
	}
}

function RemoveAdblockAds()
{
	var adLetter = document.getElementById("partnerAd_letter");
	if (adLetter)
	{
		adLetter.style.display = "none";
	}	
	
	var adBox = document.getElementById("partnerAd_box");
	if (adBox)
	{
		adBox.style.display = "none";
	}	
}

function ScaleAdblockAds()
{
		var ratio = clamp(window.innerWidth / home_ScaleFactor, .5, 1);
		
		var ad_letter = document.getElementById("partnerAd_letter");
		var ad_box = document.getElementById("partnerAd_box");
		
		if (ad_letter)
		{
			ad_letter.style.transform = 'scale(' + ratio + ', ' + ratio + ')';
			ad_letter.style.left = "50%";
			ad_letter.style.marginLeft = "-364px";
		}
		
		if(ad_box){
			ad_box.style.transform = 'scale(' + ratio + ', ' + ratio + ')';
		}
}

	function ext_watchRewardedAd()
{
		tw_Show(false);
		//clearInterval(tw_stream_update);
		clearInterval(ad_refresh_update);
		
		document.getElementById("idLinks").style.display = "none";
}
	
	function ext_rewardedAdWatched()
{
		ext_showHomeUi();
}

	function ext_OnStoreToggled(active)
{
	if(active === "True")
	{
		document.getElementById("featuredContent").style.display = "none";
	} else {
		document.getElementById("featuredContent").style.display = "flex";
	}
}

function ext_SetGameState(state)
{
	gameState = state;
	if(gameState != "playing")
		showAds();
}