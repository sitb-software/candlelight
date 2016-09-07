# Candlelight
A NodeJs Web Framework

## Installation

  	npm install candlelight --save
  	
## Usage
	
    import Application from 'candlelight/Application';
    import RestController from 'candlelight/annotation/RestController';
    import RequestMapping from 'candlelight/annotation/RequestMapping';
    import HttpMethod from 'candlelight/http/HttpMethod';

    @RestController
    class ApplicationController{
        @RequestMapping({value: '/index', method: HttpMethod.GET})
        index(ctx){
            return {
                success: true,
                message: 'Hello World!'
            };
        }
    }
	
    const app = new Application();
    app.run({
        controllers: {
            ApplicationController
        }
    });
