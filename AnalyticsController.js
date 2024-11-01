// **********************
// Analytics vars
// **********************
var m_firstPlay = true;
var m_spawned;
var m_joinedLobby;
var m_loaded;

// **********************
// Analytics API
// **********************
window.addEventListener('load', onLoad);
	
function onLoad()
{
	if(m_loaded)
		return;
	m_loaded = true;
	
	//mixpanel.time_event('GameLoad');
}

function Analytics_OnGameLoaded()
{
	if(!m_firstPlay)
		return;
	
	//mixpanel.track('GameLoad');
}

function Analytics_OnClickPlay()
{
	if(!m_firstPlay)
		return;
	m_firstPlay = false;
	
	//mixpanel.track('Clicked Play');
	//mixpanel.time_event('Load Match');
}

function Analytics_OnJoinedLobby()
{
	if(m_spawned)
		return;
	if(m_joinedLobby)
		return;
	m_joinedLobby = true;

	//mixpanel.track('JoinedLobby');
}

function Analytics_OnSpawned()
{
	if(m_spawned)
		return;
	m_spawned = true;

	//mixpanel.track('Load Match');
	//mixpanel.track('Start Play');
}

function Analytics_OnAdblockDetected()
{
	//mixpanel.track('Using Adblock');
}