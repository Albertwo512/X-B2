import Parse from 'parse/dist/parse.min.js';
async function saveNewPlayer() {     //Create your Parse Object
    const soccerPlayer = new Parse.Object('SoccerPlayer');     //Define its attributes
    soccerPlayer.set('playerName', 'A. Wed');
    soccerPlayer.set('yearOfBirth', 1997);
    soccerPlayer.set('emailContact', 'a.wed@email.io');
    soccerPlayer.set('attributes', ['fast', 'good conditioning']);
     try {
         //Save the Object
    const result = await soccerPlayer.save();
    alert('New object created with objectId: ' + result.id);
    } catch (error) {
        alert('Failed to create new object: ' + error.message);
        }
      }