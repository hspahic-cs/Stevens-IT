// This file should set up the express server as shown in the lecture code
import { bands } from "./config/mongoCollections.js";
import { bandData, albumData } from "./data/index.js";
import { closeConnection, dbConnection } from "./config/mongoConnection.js";

const db = await dbConnection()
await db.dropDatabase()

let pinkFloyd = undefined
let theTribe = undefined
let lamar = undefined
let watsky = undefined
let hoboJohnson = undefined
let flobots = undefined
let gorillaz = undefined

// TESTING FOR ALBUMS.JS

// Passing Cases: albums.create
try{
    pinkFloyd = await bandData.create("   Pink Floyd", ["Progressive Rock   ", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 1965)
    await albumData.create(pinkFloyd._id, "  The Dark Side of the Moon", "10/15/1975", [" Speak to Me   ", " Breathe (In the Air)  ", "Money    "], 4)
    await albumData.create(pinkFloyd._id, "The Wall", "10/15/1979", ["In the Flesh?", "Another Brick in the Wall, Pt 1.", "The Thin Ice"], 3)
    await albumData.create(pinkFloyd._id, "Another Day In Paradise", "10/15/2021", ["Wow", "Much", "Song"], 5)
    pinkFloyd = await bandData.get(pinkFloyd._id)
    console.log(pinkFloyd)
} catch(e){console.log(e)}

// Failing Cases: albums.create
try{
    await albumData.create(pinkFloyd._id, "Another Day In Paradise", "10/15/1899", ["Wow", "Much", "Song"], 5)
} catch(e){console.log(e)}

try{
    await albumData.create(pinkFloyd._id, "Another Day In Paradise", "10/15/2024", ["Wow", "Much", "Song"], 5)
} catch(e){console.log(e)}

try{
    await albumData.create(pinkFloyd._id, "Another Day In Paradise", "10/15/2230", ["Wow", "Much", "Song"], 5)
} catch(e){console.log(e)}

try{
    await albumData.create(pinkFloyd._id, "Another Day In Paradise", "1/15/1899", ["Wow", "Much", "Song"], 5)
} catch(e){console.log(e)}

try{
    await albumData.create(pinkFloyd._id, "Another Day In Paradise", "10/32/1899", ["Wow", "Much", "Song"], 5)
} catch(e){console.log(e)}

try{
    await albumData.create(pinkFloyd._id, "Another Day In Paradise", "10/15/1902", ["Much", "Song"], 5)
} catch(e){console.log(e)}

try{
    await albumData.create(pinkFloyd._id, "Another Day In Paradise", "10/15/1924", ["Wow", "Much", "Song"], 6)
} catch(e){console.log(e)}

// Passing Cases: albums.getAll
try{
    let pinkFloydAlbums= await albumData.getAll(pinkFloyd._id)
    console.log(pinkFloydAlbums)
} catch (e){console.log(e)}

// Failing Cases: albums.getAll
try{
    let pinkFloydAlbums= await albumData.getAll(pinkFloyd)
    console.log(pinkFloydAlbums)
} catch (e){console.log(e)}

try{
    let pinkFloydAlbums= await albumData.getAll("641629eb9af038ceb87b782c")
    console.log(pinkFloydAlbums)
} catch (e){console.log(e)}

// Passing Cases: albums.get
try{
    let pinkFloydAlbums= await albumData.getAll(pinkFloyd._id)
    let specificAlbum = await albumData.get(pinkFloydAlbums[0]._id)
    console.log(specificAlbum)
} catch(e){
    console.log(e)
}

// Failing Cases: albums.get
try{
    let pinkFloydAlbums= await albumData.get("wow not right")
    console.log(pinkFloydAlbums)
} catch (e){console.log(e)}

try{
    let pinkFloydAlbums= await albumData.get("641629eb9af038ceb87b782c")
    console.log(pinkFloydAlbums)
} catch (e){console.log(e)}

// Passing Cases: albums.remove
try{
    let pinkFloydAlbums= await albumData.getAll(pinkFloyd._id)
    let removedAlbum = await albumData.remove(pinkFloydAlbums[0]._id)
    console.log(removedAlbum)
} catch(e){
    console.log(e)
}

try{
    let pinkFloydAlbums= await albumData.getAll(pinkFloyd._id)
    await albumData.remove(pinkFloydAlbums[0]._id)
    await albumData.remove(pinkFloydAlbums[1]._id)
    pinkFloydAlbums= await albumData.getAll(pinkFloyd._id)
    console.log(pinkFloydAlbums)
} catch(e){
    console.log(e)
}

// Failing Cases: albums.remove
try{
    let removedAlbum = await albumData.remove("Wow much eerror")
    console.log(removedAlbum)
} catch (e){console.log(e)}

try{
    let removedAlbum = await albumData.remove("641629eb9af038ceb87b782c")
    console.log(removedAlbum)
} catch (e){console.log(e)}

// Passing Cases: bands.update
try{
    let updatedBand = await bandData.update(pinkFloyd._id, "PinkFloydd", ["Not Real"], "http://www.fakewebsite.com", "NothingRecords", ["Meep", "Mypself", "Aye"], 2012)
    console.log(updatedBand)
} catch(e) {console.log(e)}

// Failing Cases: bands.update

try{
    let updateBand = await bandData.update(pinkFloyd._id)
} catch(e) {console.log(e)}

try{
    let updateBand = await bandData.update("641629eb9af534ceb87b782c","PinkFloydd", ["Not Real"], "http://www.fakewebsite.com", "NothingRecords", ["Meep", "Mypself", "Aye"], 2012 )
} catch(e){console.log(e)}

try{
    let updateBand = await bandData.update(pinkFloyd._id, "PinkFloydd", ["Not Real"], "http://www.fakewebsite.com", "NothingRecords", ["Meep", "Mypself", "Aye"], 2050)
} catch(e){console.log(e)}

console.log("~~~~~~~~~NOW SEEDING DATABASE~~~~~~~")

// Seeding database
// Seeding database
try{
    theTribe = await bandData.create("A Tribe Called Quest", ["Jazz", "Rap", "Freestyle", "Hip Hop"], "http://www.thetribe.com", "Jive", ["Q-Tip", "Phife Dog", "Ali Shaheed Muhammad", "Jarobi White"], 1985)
    await albumData.create(theTribe._id, "Midnight Marauders", "11/09/1993", ["We Can Get Down", "Electric Relaxation", "8 Million Stories"], 5)
    await albumData.create(theTribe._id, "The Low End Theory", "09/24/1991", ["Check the Rhimes", "Jazz (We've Got)", "Scenario - LP Mix"], 5)
} catch(e){console.log(e)}

try{    
    lamar = await bandData.create("Kendrick Lamar", ["Hip Hop", "Progressive", "Jazz Rap"], "http://www.kendricklamar.com", "Top Dawg", ["Kendrick Lamar Duckworth"], 2003)
    await albumData.create(lamar._id, "good kid, m.A.A.d city", "10/22/2012", ["Sing About Me, I'm Dying Of Thirst", "Money Trees", "The Art Of Peer Pressure", "m.A.A.d city"], 5)
    await albumData.create(lamar._id, "To Pimp A Butterfly", "03/15/2015", ["Wesley's Theory", "How Much A Dollar Cost", "Alright", "The Blacker The Berry"], 5)
    await albumData.create(lamar._id, "DAMN", "04/14/2017", ["FEAR", "PAIN", "DNA", "DUCKWORTH"], 5)
} catch (e) {console.log(e)}

try{
    watsky = await bandData.create("Watsky", ["Alternative Hip Hop", "Slam Poetry", "Progressive Rap"], "http://www.georgewatsky.com", "Steel Wool Media", ["George Watsky"], 2001)
    await albumData.create(watsky._id, "x Infinity", "08/19/2016", ["Knots", "Roses", "Theories", "Exquisite Corpse"], 5)
    await albumData.create(watsky._id, "Cardboard Castles", "03/12/2013", ["Tiny Glowing Screens, Pt.2", "Hey Asshole", "The Legend of Hardhead Ned", "Kill a Hipster"], 5)
    await albumData.create(watsky._id, "All You Can Do", "08/12/2014", ["Tears To Diamonds", "Whoa Whoa Whoa", "Sarajevo"], 3)
} catch (e) {console.log(e)}

try{
    hoboJohnson = await bandData.create("Hobo Johnson", ["Emo Rap", "Spoken Word", "Hip Hop"], "http://www.hobojohnson.com", "Reprise", ["Frank Lopes Jr."], 2015)
    await albumData.create(hoboJohnson._id, "The Rise Of Hobo Johnson", "01/01/2016", ["3%", "Romeo & Juliet", "Mario & Link"], 3.5)
    await albumData.create(hoboJohnson._id, "The Fall Of Hobo Johnson", "01/01/2019", ["Typical Story", "Mover Awayer", "You & the Cockroach", "All in My Head"], 5)
} catch (e) {console.log(e)}

try{
    flobots = await bandData.create("Flobots", ["Alternative Hip Hop", "Rap Rock", "Indie Rock"], "http://www.flobots.com", "Flobots Musics, LLC", ["Jamie 'Jonny 5' Laurie", "Stephen 'Brer Rabbot' Bracket", "Kenny 'KennyO' Ortiz", "Andy 'Roc' Guerrero"], 2000)
    await albumData.create(flobots._id, "Fight With Tools", "05/20/2008", ["There's A War Going On For Your Mind", "Same Thing", "Anne Braden", "Stand Up"], 4.2)
    await albumData.create(flobots._id, "Noenemies", "05/05/2017", ["Failure Games", "Quarentine", "Rattle The Cage"], 2.5)
} catch (e) {console.log(e)}

try{
    gorillaz = await bandData.create("gorillaz", ["Alternative Rock", "Art Pop", "Electronic", "Trip Hop"], "http://www.gorillaz.com", "Warner", ["Murdoc Niccals", "2-D", "Noodle", "Russel Hobbs"], 1998)
    await albumData.create(gorillaz._id, "Gorillaz", "03/26/2001", ["Clint Eastwood", "Dracula", "Tomorrow Comes Today"], 4)
    await albumData.create(gorillaz._id, "Demon Days", "05/11/2005", ["Dirty Harry", "Kids With Guns", "Every Planet We Reach Is Dead", "Feel Good Inc."], 4.6)
    await albumData.create(gorillaz._id, "Song Machine, Season One: Strange Timez", "10/23/2020", ["The Lost Chord", "With Love To An Ex", "Desole"], 3.7)
} catch (e) {console.log(e)}

await closeConnection()