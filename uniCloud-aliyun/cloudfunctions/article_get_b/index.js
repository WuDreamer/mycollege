const db = uniCloud.database();
exports.main = async (event, context) => {
	let {skip=0} = event;
	return  await db.collection("article").limit(5).skip(skip).orderBy("posttime","asc").get();
};

