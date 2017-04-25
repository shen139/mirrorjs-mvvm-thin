var mirrorjs = require("mirrorjs");
let ChatApp = require("./chat/viewmodel/vm");


module.exports = function (connection, params)
{
    return new mirrorjs.app.server(
        new mirrorjs.ui.connectors.remote(connection),
        ChatApp,
        {
            /* CONF */
            "args": {
                params
            }
        });
};
