## Overview
In this API, we can load available images in the page and also rescale them to desired height and width. Upon rescaling, the rescaled image can be used on calling again instead of rescaling the original image again and again. All images will be loaded from 'assets\images\full' folder. The resized images will be stored to 'assets\images\thumb' folder.

### Scripts
Install: npm install
Build: npm run build
Start server: npm run start
Run unit tests: npm run test

### Usage
The server will listen on port 3000:

#### Valid Endpoints
http://localhost:3000/
http://localhost:3000/api/images
http://localhost:3000/api/images?filename=fjord
http://localhost:3000/api/images?filename=fjord&width=200&height=200

Expected query arguments are:
filename: should be from the files available in the 'assets\images\full\ or 'assets\images\thumb' folder
Available filenames:
    encenadaport
    fjord
    icelandwaterfall
    palmtunnel
    santamonica
height: should be numerical value > 0
width: should be numerical value > 0

#### Example 1
http://localhost:3000/
http://localhost:3000/api/images
Will display home page list available image names and sample links to access

#### Example 2
http://localhost:3000/api/images?filename=fjord
Will display the original fjord image.

#### Example 3
http://localhost:3000/api/images?filename=fjord&height=200&width=200
Will scale the fjord image to 200 by 200 pixels and create a thumb with given parameters. On subsequent calls will serve the resized image instead of resizing the original image again.

#### Example 4
http://localhost:3000/api/images?filename=fjord&height=-200&width=200
Will display error message to provide valid values for height and width

#### Example 5
http://localhost:3000/api/images?filename=fjord&width=200
Will display error message to provide both height and width values
