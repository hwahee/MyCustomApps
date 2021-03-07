class ServerLog {
	//디버그용, 서버 로그에 내용을 효과적으로 찍어줌
	tell(msg = "", show_info = true, indent = 1) {
		if (typeof (msg) != typeof (""))
			msg = JSON.stringify(msg)
		const msg_list = msg.split("\n")
		const msg_num = msg_list.length
		let indent_str = ""
		let i = 0

		for (i = 0; i < indent; i++) {
			indent_str += "\t"
		}

		i = 0
		if (show_info == true) {
			console.log(`[${Date()}]\n박종현>> ${msg_list[i]}`)
			i++
		}
		for (; i < msg_num; i++) {
			console.log(`${indent_str}${msg_list[i]}`)
		}
	}
}

module.exports=ServerLog