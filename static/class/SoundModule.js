export default class SoundModule {
	/*
	 ����: Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.
	 �ذ�å: html�� �� �������� sound �κ��� hidden���� �����̰� �ű⼭ ����ϵ��� �� ����. ��, ���� �� �κ��� �ִٸ� �ٽ� ������ ������ �ؾ� �Ѵ�.
	 */

	constructor(src) {
		if (src === undefined) {
			this.audio = new Audio("/static/sound/default.wav")
		}
		else {
			//����� �ּҰ� �´� �ּ����� Ȯ���ϴ� �ڵ尡 �־����� ���ڴ�
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