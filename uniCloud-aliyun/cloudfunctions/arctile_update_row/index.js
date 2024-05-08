const db  = uniCloud.database();
exports.main = async (event, context) => {
	let {detail,picurls} = event;
	return await db.collection("article").doc(detail._id).update({
		title:detail.title,
		author:detail.author,
		content:detail.content,
		picurls,
		posttime:Date.now()
	})
};
