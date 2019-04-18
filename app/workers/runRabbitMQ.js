const {prodConn} = require('./producer_script1');
const {consumeConn} = require('./consumer_scpipt2');

(run = () => {
    prodConn();
    consumeConn();
})();
