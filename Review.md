# Review Questions

## What is Node.js?
    Node is a server environment that allows us to run JavaScript outside of the browser.

## What is Express?
    Express is a lightweight framework that is used to abstract lower-level processes/pieces for server APIs, like React does for rendered UIs.
## Mention two parts of Express that you learned about this week.
    Routing - organize requests by URL & HTTP method 
    Routers - segment application by separate concerns (eg. users db router & posts db router) with individual preferences (eg. different middleware).

## What is Middleware?
    Middleware are intermediaries that can modify requests & responses that it receives then those along. Middleware fortify and extend the functionality of Express, which is otherwise minimal.

## What is a Resource?
    A resource is the foundational unit in a RESTful API; it's an object and its context, which can have multiple representations, but a unique URI (universal resource identified).

## What can the API return to help clients know if a request was successful?
    An appropriate status code (most likely 200 or 201) and the response data or a reassuring message.

## How can we partition our application into sub-applications?
    Routers can partition our application by separating the application into constituent parts.

## What is express.json() and why do we need it?
    express.json() is a built-in middleware that we need to parse requests containing JSON. 