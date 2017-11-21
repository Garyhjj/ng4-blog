var Scan = require('../lib/mongo').Scan;
var sillyDatetime = require('silly-datetime');
// 将 post de content 从 markdown 转换成 html

Scan.plugin('formatTime', {
    afterFind: function(scans) {
        return scans.map(function(scan) {
            scan.lastScan = scan.lastScan?sillyDatetime.format(scan.lastScan):'';
            scan.create_at = scan.create_at?sillyDatetime.format(scan.create_at):'';
            return scan;
        });
    },
    afterFindOne: function(scan) {
        if (scan) {
            scan.lastScan = scan.lastScan?sillyDatetime.format(scan.lastScan):'';
            scan.create_at = scan.create_at?sillyDatetime.format(scan.create_at):'';
        }
        return scan;
    }
})

module.exports = {
    create: function create(site) {
        let data = {
            site:site,
            count:1,
            lastScan:new Date().getTime()
        }
        return Scan.create(data).exec();
    },

    getScanBySite: function(site) {
        return Scan.findOne({
                site: site
            })
            .addCreatedAt()
            .exec()
    },
    getScans: function() {
        return Scan.find()
            .addCreatedAt()
            .formatTime()
            .exec();
    },

    // 通过文章 id 给 pv 加 1
    incCount: function (site) {
        return Scan
            .update({
                site: site
            }, {
                $inc: {
                    count: 1
                },
                $set:{'lastScan':new Date().getTime()}
            })
            .exec();
    }
};
