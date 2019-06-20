const knx = require('vity_knx');

module.exports = class KNXConnector {
    constructor(ItemManager) {
        this.ItemManager = ItemManager;
        this.forceStop = false;
        this.isConnect = false;
        process.on('uncaughtException', (err) => {
            console.log(err);
            this.disconnect();
        })
        process.on('exit', (code) => {
            this.disconnect();
        })
        process.on('SIGINT', () => {
            this.disconnect();
        })
        process.on('SIGTERM', () => {
            this.disconnect();
        })
        process.once('SIGUSR2',() => {
            console.log("Nodemon Restart")
            this.disconnect();
            setTimeout(() => {
                process.kill(process.pid, 'SIGUSR2');
            }, 1000);
        });
        this.connect();
    }

    connect() {
        this.connection = new knx.Connection({
            ipAddr: '192.168.1.128',
            ipPort: 3671,
            minimumDelay: 10,
            // suppress_ack_ldatareq: false,
            handlers: {
              connected: () => {
                  console.log("KNX Connected");
                  this.ItemManager.getItems()
                    .then((items) => {
                        for (let i = 0; i < items.length; i++) {
                            let item = items[i];
                            this.connection.read(item.feedback_ga, (src, value) => {
                                // console.log("Read GA", src, value);
                                this.ItemManager.statusByName[item.name] = (value[0] !== 0 ? 'ON' : 'OFF');
                            })
                        }
                    })
                  this.isConnect = true;
              },
              disconnected: () => {
                this.isConnect = false;
                console.log("KNX Disconnected")
                // if (!this.forceStop) {
                //   this.forceStop = false;
                //   this.connect();
                // }
              },
              event: this.onEvent.bind(this),
              error: (connstatus) => {
                console.log('**** ERROR: %j', connstatus);
              }
            }
          });
    }

    onEvent(evt, src, dest, value) {
        // console.log(evt, src, dest, value); // GroupValue_Write 1.1.1 0/1/2 <Buffer 01>
        if (evt == 'GroupValue_Write') {
            this.ItemManager.getItemByFeedbackGA(dest)
                .then(item => {
                    if (item) {
                        this.ItemManager.statusByName[item.name] = (value[0] !== 0 ? 'ON' : 'OFF');
                    }
                })
        }
    }

    setValue(ga, value) {
        this.connection.write(ga, value);
    }

    disconnect() {
        this.forceStop = true;
        if (this.isConnect)
           this.connection.Disconnect();
    }
}