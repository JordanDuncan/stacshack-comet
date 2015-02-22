#House of Sails
###STACShack 2015
**Team C.O.M.E.T. (@JrdnDncn, @NikkPavlov, @ScottMax_)**

Home Automation System, augmented by Leap Motion controls.

Technologies:

- Node.js
- Sails.js
- LeapJS

###Running

While in the current working directory, run `sails lift` (make sure you've run `npm install` first, and have sails.js installed).

The application uses a RESTful API to update the attributes of each room and display it in localhost:80/house/, in real time. Updating the information on the client page is done with the use of websockets.

API calls are GET requests to URLs of the form:

`/rules/api?cmd=room,attribute,value`

For example,

```
GET /rules/api?cmd=livingroom,light,0
// This sets the light level in room "livingroom" to zero (off).
```

###Leap Motion Controls

To control and adjust the temperature/lighting for rooms, the following controls are implemented:

- Make a pinching gesture with either hand
- While maintaining this pinching gesture, swipe your hand to the left or right to adjust the currently selected room
- To toggle the heating on or off, move your hand up while pinching (as if adjusting a slider)
- To toggle the light on or off, move your hand down while pinching (as if pulling a light switch)