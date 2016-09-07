# Nite
A NodeJs Web Framework

## Installation

  	npm install nite --save
  	
## Usage
	
    import Application from 'nite/Application';
    import RestController from 'nite/annotation/RestController';
    import RequestMapping from 'nite/annotation/RequestMapping';
    import HttpMethod from 'nite/http/HttpMethod';

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
