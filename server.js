var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var express = require('express');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

const port = process.env.PORT || 8080;

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));    
});

app.listen(port, (err) => {
    if (err) { console.error(err); }
    console.log(`Listening @ http://localhost:${port}/`)
});