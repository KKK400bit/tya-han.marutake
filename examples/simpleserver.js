var port, server, service;

if (phantom.args.length !== 1) {
    console.log('Usage: simpleserver.js <portnumber>');
    phantom.exit();
} else {
    port = phantom.args[0];
    server = require('webserver').create();

    service = server.listen(port, function (request, response) {

        console.log('Request at ' + new Date());
        console.log(JSON.stringify(request, null, 4));

        response.statusCode = 200;
        response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'text/html;charset=utf-8'
        };
        response.write('<html>');
        response.write('<head>');
        response.write('<title>Hello, world!</title>');
        response.write('</head>');
        response.write('<body>');
        response.write('<p>This is from PhantomJS web server.</p>');
        response.write('<p>Request data:</p>');
        response.write('<pre>');
        response.write(JSON.stringify(request, null, 4));
        response.write('</pre>');
        response.write('<p>Test POST:</p>');
        response.write('<form action="#" method="post" accept-charset="UTF-8">');
        response.write('<input name="foo" type="submit" value="submit" />');
        response.write('<input name="my name" type="text" />');
        response.write('</form>');
        response.write('</body>');
        response.write('</html>');
    });

    if (service) {
        console.log('Web server running on port ' + port);
    } else {
        console.log('Error: Could not create web server listening on port ' + port);
        phantom.exit();
    }
}
