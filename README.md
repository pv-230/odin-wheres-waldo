# The Odin Project: Where's Waldo

This app is intended to recreate the classic Where's Waldo experience in the browser. The main learning goal for the project is to practice integrating a Backend-as-a-Service. The BaaS that is used is Firebase with the Firestore database. Additionally, I chose to learn how to use Styled Components instead of the css style sheets I have been using in past projects. The project also offers more practice with React and React Router.

https://www.theodinproject.com/lessons/node-path-javascript-where-s-waldo-a-photo-tagging-app

## Implementation Highlights

- Asset loading progress is shown during initial app start
- Images have been converted to webp format to reduce loading times
- Images have been manually edited for background transparency and optimal size
- ~~Designed with mobile device use in mind~~ *Currently a bit broken with mobile browsers pull-to-refresh feature*
- Implementation of panning and zooming for ~~both~~ desktop ~~and mobile~~
- Players can submit their time score after finding all the characters in a scene
- Leaderboard with pages that display player scores saved in Firestore
- High res scene images that become scaled to the user's device viewport
- Character locations are validated by comparing where the player clicked to coordinates from Firestore, no matter how the scene is scaled

## Screenshots

![First screenshot](/screenshots/screen1.webp?raw=true)

![Second screenshot](/screenshots/screen2.webp?raw=true)

![Third screenshot](/screenshots/screen3.webp?raw=true)
