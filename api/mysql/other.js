//引入相应模块
const mysql = require('mysql') ;

//定义数据库
let sql;
let opts = {
    host:"192.168.1.210",
    user:"sa",
    password:"Idh#168",
    database:"test"
}
let open= function () {
	sql = mysql.createConnection(opts);
	//连接数据库
	sql.connect();
}

module.exports = {
    // 获取国家数据
    getCountryData(data, callback) {
        open();

        let condition = 'SELECT * FROM country';
        let totalCount = '';
        sql.query(condition, function(err, results) {
            let responseData = {
                code: '',
                message: '',
                data: {
                    dataList: [],
                    dataMeta: {},
                }
            }
            if (!err) {
                responseData.code = 1;
                responseData.message = '查询成功';
                totalCount = results.length;
                if (results.length > 0) {
                    responseData.data.dataList = results.map(item => {
                        let obj = {};
                        obj['code'] = item.Code;
                        obj['cn'] = item.ChineseName;
                        obj['en']= item.EnglishName;
                        return obj
                    })
                    responseData.data.dataMeta.totalCount = totalCount

                    callback(responseData);
                } else {
                    responseData.data.dataMeta.totalCount = 0;
                    callback(responseData);
                }
            } else {
                responseData.code = 0;
                responseData.message = '查询失败！原因'+ err;
                callback(responseData);
            }
            sql.end();
		});
    },
    // async getSkuInfo(data, callback) {
    //     open();

    //     let condition = '';
    // }
}
