export default class SoundModule {
	/*
	 오류: Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.
	 해결책: html의 맨 마지막에 sound 부분을 hidden으로 덧붙이고 거기서 재생하도록 해 보자. 단, 만약 그 부분이 있다면 다시 만들지 말도록 해야 한다.
	 */

	constructor(src) {
		if (src === undefined) {
			this.audio = new Audio("/static/sound/default.wav")
		}
		else {
			//오디오 주소가 맞는 주소인지 확인하는 코드가 있었으면 좋겠다
			this.audio = new Audio(src)
		}
	}
	setSoundSrc(src) {
		this.audio = this.audio.src=src
	}
	play() {
		this.audio.play()
	}
}