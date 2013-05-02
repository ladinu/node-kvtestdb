module.exports = kvtestdb;
function kvtestdb() {
}

kvtestdb.backend = "implement";

kvtestdb.makeKey = function(req) {
  return req.url.split('/')[1];
}

kvtestdb.get = function(req, res, key) {
  var key   = key || makeKey(req);
  var value = backend.get(key);

  value.on('error', function(err) {
    res.writeHead(err.code, {
      'Content-Length':  err.msg.length  || 0,
      'Content-Type':    err.contentType || 'text/plain'
    });
    res.end(err.msg);
  });

  value.pipe(res);
}
