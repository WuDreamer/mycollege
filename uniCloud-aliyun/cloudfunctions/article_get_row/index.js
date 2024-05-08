const db = uniCloud.database();
exports.main = async (event, context) => {
	let {id} = event;
	return await db.collection("article").doc(id).get();
};
