var config_connection = {
    "local": {
        "mongoServer": {
            //mongodb://127.0.0.1:27017/CartDemo
            //"url": 'mongodb://autorp:jz1005linux27017Mdb@58.96.173.102/', //for scalability, set a url for each DB. or if we use replica set, set an array of url for each db.
            "url": "/mongodb://127.0.0.1:27017/"
            "db": {
                "hr_resume": "hr_resume" //mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database]

            }
        }
        ip: "localhost"
    },
    "dev": {
        "mongoServer": {
            //mongodb://127.0.0.1:27017/CartDemo
            //"url": 'mongodb://autorp:jz1005linux27017Mdb@58.96.173.102/', //for scalability, set a url for each DB. or if we use replica set, set an array of url for each db.
            "url": "/mongodb://127.0.0.1:27017/"
            "db": {
                "hr_resume": "hr_resume" //mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database]

            }
        }
        ip: "localhost"
    },
    "qa": {
        "mongoServer": {
            //mongodb://127.0.0.1:27017/CartDemo
            //"url": 'mongodb://autorp:jz1005linux27017Mdb@58.96.173.102/', //for scalability, set a url for each DB. or if we use replica set, set an array of url for each db.
            "url": "/mongodb://127.0.0.1:27017/"
            "db": {
                "hr_resume": "hr_resume" //mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database]

            }
        }
        ip: "localhost"
    },
    "pro": {
        "mongoServer": {
            //mongodb://127.0.0.1:27017/CartDemo
            //"url": 'mongodb://autorp:jz1005linux27017Mdb@58.96.173.102/', //for scalability, set a url for each DB. or if we use replica set, set an array of url for each db.
            "url": "/mongodb://127.0.0.1:27017/"
            "db": {
                "hr_resume": "hr_resume" //mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database]

            }
        }
        ip: "localhost"
    }


};

var config_common = {
    "tables": {
        "stock": {
            value: "rsh_stock_snap",
            desc: "stock table"
        }
    },
    "events": {
        "getStocksRealTimeData": {
            value: "getStocksRealTimeData",
            "desc": "get stocks real time data."
        }
    }

};

module.exports = {
    getConfig: function() {
        var config = config_common;
        console.dir("using env: " + global.env);
        config.connection = config_connection[global.env];
        config.fs = config_fs[global.env];
        return config;
    }
};
