function MuteGame(mute)
{
	// window.unityGame.SendMessage('!game', 'OnWebMuteGame', mute);
	if (mute === 1)
	{
		window.unityGame.SendMessage('!game', 'OnWebPreRollStarted');
	} else {
		window.unityGame.SendMessage('!game', 'OnWebPreRollCompleted');
	}
}