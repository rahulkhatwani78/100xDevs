Ports: 
https => 443
http => 80

By Default the https redirects us to the 443 port, for eg., if we go to https://google.com it will call the port 443

HTTP provides following: 
Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Status Codes: 
1) 200 Series (Success)
    a) 200 OK
    b) 204 No Content
2) 300 Series (Redirection)
    a) 301 Moved Permanently
    b) 304 Not Modified
3) 400 Series (Client Error)
    a) 400 Bad Request
    b) 401 Unauthorized
    c) 403 Forbidden
    d) 404 Not Found
4) 500 Series (Server Error)
    a) 500 Internal Server Error
    b) 502 Bad Gateway