# ITEMDesigner
A very quick and dirty Item planner for games using javascript and a little php



![Item Designer Main Screen](https://raw.githubusercontent.com/XOAProductions/ITEMDesigner/master/images/ITEMDesigner_1.PNG)

In the screenshot above you can see the main screen of the item designer. Here, you can enter all the values that an item in a diablo-style game will need (the statistics here are the one's we're currently using for our game).
On the right hand side a little preview is generated so you can get a feel for how the item will look to the user later on. With the press of the "Create Item" button, the correct class, based on the item type, is created and uploaded to the server via php. 

You can then browse through existing items ("Browse Items" in the navigtation bar), view their statistics and edit them as you like. 

The site also has a section where you can download the generated .json files to parse them into your game. This enables you to prototype and plan items quickly using a web interface instead of having to boot up your game engine. 

In the future there will also be the possibility of creating set-items and a hero calulator, where you can test out different gear and see how the player's statistics will behave, enabling you to quickly find inconsitencies in balancing or generally op or underpowered combinations.



The site was thrown together extremely quickly and is currently lacking a lot of comments and structure, hopefully this will change in the near future, but right now we're focusing on quickly implementing a system that lets us plan our games more efficiently, so some good practices have unfortunately been neglected.
