window.addEventListener('load', Social_onLoad);
var featuredVids;	
var activeTab = 0;
var YOUTUBE_API_KEY = "AIzaSyC3-PKI9QF-t_EgNUGb0RkGO2NkayJ7UM4";
var override_featureListId = null;
var streamData = null;
var featuredYtId;
var featuredVideoUpdate;

const TWITCH_CLIENT_ID = 'your_twitch_client_id';
const TWITCH_CLIENT_SECRET = 'your_twitch_client_secret';

let twitchAccessToken = '';


const featureList2_Action = [
	{ id: 'RwYNyg13bZA', title: 'FEARLESS - Repuls io trickshots' },
	{ id: 'V2QQzZZecqk', title: 'CUSTOM CROSSHAIRS IN REPULS IO?' },
	{ id: 'y1o1E7Tzbt4', title: 'Bag Boy🎒' },
	{ id: 'cL43T1jJEdY', title: 'Introducing new my new group, AXIOM #RWNCchallenge' },
	{ id: 'bNns6Q86f0Q', title: '[Caracal] 2K Subscriber Special' },
	{ id: 'A3sKsXIyIKU', title: 'Unbreakable Bond ft. Fuunara - REPULS.io' }
];

const featureList2_Gameplay = [
	{ id: 'cyQ7a1QR6eM', title: 'Repuls Beta Montage' },
	{ id: 'CzVPfE2YwGk', title: 'I 1V1ED REPULS.IO TOP CONTENT CREATORS' },
	{ id: '18yEVpET9QQ', title: 'Playing with Viewers - Caracal REPULS' },
	{ id: 'nQY-01sK-ec', title: 'axel bios hardcore' },
	{ id: 'UE3pnF1G-14', title: 'Assault Rifle Only Challenge - Caracal REPULS' }
];

const featureList2_Information = [
	{ id: '1sug_eUklHk', title: 'June Helmet WINNERS! #RWNCchallenge' },
	{ id: 'YUIRr9-cIlU', title: 'Official REPULS.IO Trailer' },
	{ id: 'P2USsjUV08M', title: '*NEW* REPULS IO HARDCORE MAP? (SUMMIT)' },
	{ id: 'AjgZtukUl9E', title: 'HOW TO BUNNY HOP IN REPULS 2024' },
	{ id: 'Aq0vnYeYthA', title: 'REPULS.IO SEASON 3' }
];

const featureList2_RWNC = [
	{ id: 'gN1NNQRo3AY', title: 'Pros Play Casual ｜ December 2, 2023' },
	{ id: 'uU3CW7sbQug', title: 'RWNC Masterclass: Mastery Of Loadout Weapons!' },
	{ id: 'Aq0vnYeYthA', title: 'EVERYTHING YOU NEED TO KNOW: REPULS.IO SEASON 3' },
	{ id: 'OhCRtIO7uts', title: 'THE ENTIRE HISTORY OF REPULS ft. docski' },
	{ id: 'oNHWrlWcTM0', title: 'Customization | July 8, 2023' }
];

const featureList_Twitch = [];


function getRandomFeature() {
  const allFeatures = [
    ...featureList2_Action,
    ...featureList2_Gameplay,
    ...featureList2_Information,
	...featureList2_RWNC
	
  ];
  const randomIndex = Math.floor(Math.random() * allFeatures.length);
  return allFeatures[randomIndex];
}

function list_containsId(list, id) {
  return list.some(item => item.id === id);
}

function getTwitchAccessToken() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://id.twitch.tv/oauth2/token', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      twitchAccessToken = data.access_token;
      GetTwitchStreams(); // Fetch streams after obtaining the token
    } else {
      console.log('Error getting Twitch token:', xhr);
    }
  };
  
  xhr.onerror = function () {
    console.log('Twitch API Request failed');
  };
  
  xhr.send(`client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`);
}




	
function Social_onLoad()
{
	RefreshFeaturedYoutube();
	// GetStreams();
	// GetTwitchStreams();
	featuredVideoUpdate = setInterval(RefreshFeaturedYoutube, 10000);
}

function RefreshFeaturedYoutube()
{
	featuredYtId = getRandomFeature();
	SetFeatureThumb(`https://img.youtube.com/vi/${featuredYtId.id}/0.jpg`, featuredYtId.title);
}

function SetFeatureThumb(img, title)
{
	document.getElementById("yt_img").src = img;
	document.getElementById("feature_content_title").innerText = title;
}


function GetStreams() {
  var xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&videoCategoryId=20&q=halflife&maxResults=5&key=' + YOUTUBE_API_KEY
  );
  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      streamData = data;
      RefreshFeaturedLivestreams();
    } else {
      console.log('Error:', xhr);
      // Handle error appropriately
    }
  };
  xhr.onerror = function () {
    console.log('Request failed');
    // Handle error appropriately
  };
  xhr.send();
}

/*function GetTwitchStreams() {
  var xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `https://api.twitch.tv/helix/streams?game_id=your_game_id`, // Replace with actual game ID
    true
  );
  xhr.setRequestHeader('Client-ID', TWITCH_CLIENT_ID);
  xhr.setRequestHeader('Authorization', `Bearer ${twitchAccessToken}`);
  
  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      console.log("Twitch Streams:", data);
      twitchStreamData = data;
      RefreshFeaturedTwitchStreams();
    } else {
      console.log('Twitch API Error:', xhr);
    }
  };
  
  xhr.onerror = function () {
    console.log('Twitch API Request failed');
  };
  
  xhr.send();
}*/

/*function GetStreams()
{
  var xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&videoCategoryId=20&q=halflife&maxResults=5&key=AIzaSyC3-PKI9QF-t_EgNUGb0RkGO2NkayJ7UM4'
  );
  xhr.onload = function () {
	  
    if (xhr.status === 200) {

		var data = JSON.parse(xhr.responseText);
		console.log("LOG:"+xhr.responseText);
		streamData = data;
		RefreshFeaturedLivestreams();
		// refresh feature preview
		SetFeatureThumb(streamData.items[0].id?.videoId, streamData.items[i].snippet?.title);
		
    } else {
		SetFeatureThumb(feature_yt_img, feature_yt_title);
		console.log('Error:', xhr);
    }
  };
  xhr.onerror = function () {
    console.log('Request failed');
	SetFeatureThumb(feature_yt_img, feature_yt_title);
  };
  xhr.send();
}*/


/*function RefreshFeaturedLivestreams() {
  if (streamData && streamData.items && streamData.items.length > 0) {
    featureList_Live = streamData.items.map(item => item.id.videoId);
    
    // Refresh feature preview with the first live stream
    SetFeatureThumb(
      `https://i.ytimg.com/vi/${streamData.items[0].id.videoId}/hqdefault_live.jpg`, 
      streamData.items[0].snippet.title
    );
    
    // Set the live stream tab
    SetTab(4);
  } else {
    // Fallback to featured YouTube videos if no live streams are available
    RefreshFeaturedYoutube();
  }
}

function RefreshFeaturedTwitchStreams() {
  if (twitchStreamData && twitchStreamData.data && twitchStreamData.data.length > 0) {
    featureList_Twitch = twitchStreamData.data.map(stream => stream.id);
    
    // Refresh feature preview with the first Twitch stream
    SetFeatureThumb(
      twitchStreamData.data[0].thumbnail_url, // Twitch provides thumbnail URLs
      twitchStreamData.data[0].title
    );
    
    // Set the Twitch tab
    SetTab(5); // Assuming tab 5 is for Twitch
  } else {
    console.log('No Twitch streams available');
    // Optionally, fallback to another source if needed
  }
}*/

/*function RefreshFeaturedLivestreams()
{
	if (streamData.items && streamData.items.length > 0) {
		featuredYtId = streamData.items[0].id?.videoId;

		featureList_Live = streamData.items.map(function (item) {
			return item.id.videoId;
		});

		// refresh feature preview
		SetFeatureThumb(streamData.items[0].id?.videoId, streamData.items[i].snippet?.title);
		
	} else {
		// refresh feature preview
		RefreshFeaturedYoutube();
	}
}*/

function OpenFeaturedVideo()
{
	override_featureListId = featuredYtId.id;
	
	// Set the appropriate tab
	if (list_containsId(featureList2_Action, featuredYtId.id)) {
		SetTab(0);
	  } else if (list_containsId(featureList2_Gameplay, featuredYtId.id)) {
		SetTab(1);
	  } else if (list_containsId(featureList2_Information, featuredYtId.id)) {
		SetTab(2);
	  } else if (list_containsId(featureList2_RWNC, featuredYtId.id)) {
		SetTab(3);
	  } else {
		SetTab(0); // Default tab if URL not found
	  }
}

function HighlightTab(id)
{
	const tabs = document.querySelectorAll('.tablinks');
	
	for (i = 0; i < tabs.length; i++) {
		tabs[i].style.color = '#4a8fb7';
	}
	tabs[id].style.color = '#ff9f00';
}

function HighlightVideo(id)
{
	const tabs = document.querySelectorAll('.thumb-title');
	console.log('log__', tabs[0]);
	
	for (i = 0; i < tabs.length; i++) {
		tabs[i].style.color = '#4a8fb7';
	}
	tabs[id].style.color = '#ff9f00';
}

/*function SetTab(id) {
  activeTab = id;
  HighlightTab(activeTab);

  switch (activeTab) {
    case 0:
      featuredVids = getRandomVideos(featureList2_Action, 5);
      break;
    case 1:
      featuredVids = getRandomVideos(featureList2_Gameplay, 5);
      break;
    case 2:
      featuredVids = getRandomVideos(featureList2_Information, 5);
      break;
    case 3:
      featuredVids = getRandomVideos(featureList2_RWNC, 5);
      break;
    case 4:
      featuredVids = featureList_Live;
      RefreshFeaturedLivestreams();
      break;
    case 5:
      featuredVids = featureList_Twitch;
      if (!twitchAccessToken) {
        getTwitchAccessToken(); // Fetch Twitch access token if not already obtained
      } else {
        GetTwitchStreams(); // Fetch streams if the token is available
      }
      break;
  }

  console.log(featuredVids);
  if (override_featureListId != null)
    featuredVids[0] = override_featureListId;

  const icons = document.querySelectorAll('.thumbnails img');
  var titles = document.getElementsByClassName("thumb-title");

  for (let i = 0; i < icons.length; i++) {
    const videoId = featuredVids[i];
    if (activeTab === 5) { // Twitch tab
      icons[i].src = twitchStreamData.data[i]?.thumbnail_url || ''; // Use Twitch thumbnail URL
      titles[i].textContent = twitchStreamData.data[i]?.title || '';
    } else {
      icons[i].src = "https://img.youtube.com/vi/" + videoId + "/0.jpg";
      const vidurl = 'https://www.youtube.com/watch?v=' + videoId;
      
      if (activeTab !== 3) {
        fetch(`https://noembed.com/embed?dataType=json&url=${vidurl}`)
          .then(res => res.json())
          .then(data => titles[i].textContent = data.title.substring(0, maxTitleLength));
      } else {
        if (streamData != null) {
          if (i < streamData.items.length)
            titles[i].textContent = streamData.items[i].snippet.title;
          else
            titles[i].textContent = "";
        } else {
          titles[i].textContent = "";
        }
      }
    }
  }

  if (override_featureListId != null) {
    SetFeaturedVid(0);
    override_featureListId = null;
  } else {
    SetFeaturedVid(getRandomInt(featuredVids.length));
  }
}*/


function SetTab(id) {
  activeTab = id;
  HighlightTab(activeTab);
  
  switch (activeTab) {
    case 0:
      featuredVids = getRandomVideos(featureList2_Action, 5);
      break;
    case 1:
      featuredVids = getRandomVideos(featureList2_Gameplay, 5);
      break;
    case 2:
      featuredVids = getRandomVideos(featureList2_Information, 5);
      break;
    case 3:
      featuredVids = getRandomVideos(featureList2_RWNC, 5);
      break;
    case 4:
      // For live streams, ensure `featureList_Live` is correctly populated
      //featuredVids = featureList_Live;
      //RefreshFeaturedLivestreams(); // Optional: To ensure live streams are up to date
	  featuredVids = featureList_Twitch;
      if (!twitchAccessToken) {
        getTwitchAccessToken(); // Fetch Twitch access token if not already obtained
      } else {
        GetTwitchStreams(); // Fetch streams if the token is available
      }
      break;
  }
  
  if (override_featureListId != null)
    featuredVids[0] = override_featureListId;

  const icons = document.querySelectorAll('.thumbnails img');
  var titles = document.getElementsByClassName("thumb-title");

	var maxTitleLength = 40;
  for (let i = 0; i < icons.length; i++) {
    const videoId = featuredVids[i];
    icons[i].src = "https://img.youtube.com/vi/" + videoId + "/0.jpg";
    const vidurl = 'https://www.youtube.com/watch?v=' + videoId;

    if (activeTab != 3) {
      var videoTitle;
      fetch(`https://noembed.com/embed?dataType=json&url=${vidurl}`)
        .then(res => res.json())
        .then(data => titles[i].textContent = data.title.substring(0, maxTitleLength));
    } else {
      if (streamData != null) {
        if (i < streamData.items.length)
          titles[i].textContent = streamData.items[i].snippet.title;
        else
          titles[i].textContent = "";
      } else {
        titles[i].textContent = "";
      }
    }
  }

  if (override_featureListId != null) {
    SetFeaturedVid(0);
    override_featureListId = null;
  } else {
    SetFeaturedVid(getRandomInt(featuredVids.length));
  }
}


/*function SetTab(id)
{
	activeTab = id;
	HighlightTab(activeTab);
	
	switch(activeTab) {
	case 0:
		featuredVids = getRandomVideos(featureList2_Action, 5);
		break;
	case 1:
		featuredVids = getRandomVideos(featureList2_Gameplay, 5);
		break;
	case 2:
		featuredVids = getRandomVideos(featureList2_Information, 5);
		break;
	case 3:
		featuredVids = getRandomVideos(featureList2_RWNC, 5);
		break;
	case 4:
		RefreshFeaturedLivestreams();
		featuredVids = featureList_Live;
		break;
	}
			console.log(featuredVids);
	if(override_featureListId != null)
		featuredVids[0] = override_featureListId;
	
	const icons = document.querySelectorAll('.thumbnails img');
	var titles = document.getElementsByClassName("thumb-title");

	// Get all the thumbnail elements
	var thumbnails = document.getElementsByClassName("thumbnail");

	var maxTitleLength = 40;
	for (let i = 0; i < icons.length; i++) 
	{		
		icons[i].src = "https://img.youtube.com/vi/" + featuredVids[i] + "/0.jpg";
		
		const vidurl = 'https://www.youtube.com/watch?v=' + featuredVids[i];

		if(activeTab != 3){
			var videoTitle;
			fetch(`https://noembed.com/embed?dataType=json&url=${vidurl}`)
				.then(res => res.json())
				.then(data => titles[i].textContent = data.title.substring(0, maxTitleLength));
		  
		} else {
			if(streamData != null){
				if(i < streamData.items.length)
					titles[i].textContent =	streamData.items[i].snippet?.title;
				else
					titles[i].textContent =	"";
			} else titles[i].textContent =	"";

		}

	}
	
	if(override_featureListId != null){
		SetFeaturedVid(0);
		override_featureListId = null;
	}
	else 
		SetFeaturedVid(getRandomInt(featuredVids.length));
}*/

function SetFeaturedVid(id)
{
	document.getElementById("yt_vid").src = "https://www.youtube.com/embed/" + featuredVids[id] + "?&autoplay=1&start=0";
	HighlightVideo(id);
}


function getRandomVideos(list, count) {
  if (count > list.length) {
    throw new Error('Count should be less than or equal to the length of the list.');
  }
console.log(list);
  const shuffledList = shuffleArray(list);
  const randomVideos = shuffledList.slice(0, count).map(video => video.id);

  return randomVideos;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Fisher-Yates shuffle algorithm
/*function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Get 5 random strings from the list without repeating
function getRandomVideos(list, count) {
  if (count > list.length) {
    throw new Error('Count should be less than or equal to the length of the list.');
  }
  const shuffledList = shuffle([...list]);
  const randomStrings = [];
  while (randomStrings.length < count) {
    const randomString = shuffledList.pop();
    if (!randomStrings.includes(randomString)) {
      randomStrings.push(randomString);
    }
  }
  return randomStrings;
}*/