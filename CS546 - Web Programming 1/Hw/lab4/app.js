/*

1. Create a band of your choice.
2. Log the newly created band. (Just that band, not all bands)
3. Create another band of your choice.
4. Query all bands, and log them all
5. Create the 3rd band of your choice.
6. Log the newly created 3rd band. (Just that band, not all bands)
7. Rename the first band
8. Log the first band with the updated name. 
9. Remove the second band you created.
10. Query all bands, and log them all
11. Try to create a band with bad input parameters to make sure it throws errors.
12. Try to remove a band that does not exist to make sure it throws errors.
13. Try to rename a band that does not exist to make sure it throws errors.
14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a band by ID that does not exist to make sure it throws errors.

*/

import * as bands from "./data/bands.js";
import {dbConnection, closeConnection} from './config/mongoConnection.js';

const db = await dbConnection();
await db.dropDatabase();

let pinkFloyd = await bands.create("Pink Floyd", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 1965);
console.log(pinkFloyd);

let theTribe = await bands.create("A Tribe Called Quest", ["Freestyle", "Jazzy Rap"], "http://www.check-the-vibe.com", "Epic", ["Q-Tip", "Phife Dawg", "Ali Shaheed Muhammad", "Jarobi White"], 1985)
console.log(theTribe)

let motherMother = await bands.create("   Mother Mother   ", ["Alt Rock", "  Indie Rock "], "   http://www....dasdsaweadssa..dsa ds.com   ", " Last Gang Records   ", ["Ryan Guldemond   ", "Molly Guldemond", "Jasmin Parkin", "Ali Siadat", "  Mike Young  "], 2005)
console.log(motherMother)

let allBands = await bands.getAll();
console.log(allBands);

let motherFan = await bands.get(motherMother._id)
console.log(motherFan)

pinkFloyd = await bands.rename(pinkFloyd._id, "sinkToy")
console.log(pinkFloyd)

console.log(await bands.remove(theTribe._id))

allBands = await bands.getAll();
console.log(allBands);

try{
    await bands.remove('12f8391f1ab73ef415cbb30e')
} catch (e) {console.log(e)}

try{
    await bands.rename('12f8391f1ab73ef415cbb30c', "sally")
} catch (e) {console.log(e)}

try{
    await bands.remove(pinkFloyd._id, 12345)
} catch (e) {console.log(e)}

try{
    await bands.remove('12f8391f1ab73ef415cbb30c')
} catch (e) {console.log(e)}

try{
    await bands.get('12f8391f1ab73ef415cbb30c')
} catch (e) {console.log(e)}

// try{
//     const fakeBand = await bands.create()
// } catch(e){console.log(e)}

// try{
//     const fakeBand = await bands.create(123, ["Alt Rock", "Indie Rock"], "http://www....dasdsaweadssa..dsa ds.com", "Last Gang Records", ["Ryan Guldemond", "Molly Guldemond", "Jasmin Parkin", "Ali Siadat", "Mike Young"], 2005)
// } catch(e) {console.log(e)}

// try{
//     const fakeBand = await bands.create("band", ["Alt Rock", "Indie Rock"], "http://www....dasdsaweadssa..dsa ds.cm", "Last Gang Records", ["Ryan Guldemond", "Molly Guldemond", "Jasmin Parkin", "Ali Siadat", "Mike Young"], 2005)
// } catch(e) {console.log(e)}

// try{
//     const fakeBand2 = await bands.create("band", ["Alt Rock", "Indie Rock"], "htp://www....dasdsaweadssa..dsa ds.com", "Last Gang Records", ["Ryan Guldemond", "Molly Guldemond", "Jasmin Parkin", "Ali Siadat", "Mike Young"], 2005)
// } catch(e) {console.log(e)}

// try{
//     const fakeBand3 = await bands.create("band",["Alt Rock", "Indie Rock"], "http://ww....dasdsaweadssa..dsa ds.com", "Last Gang Records", ["Ryan Guldemond", "Molly Guldemond", "Jasmin Parkin", "Ali Siadat", "Mike Young"], 2005)
// } catch(e) {console.log(e)}

// try{
//     const fakeBand4 = await bands.create("band",["Alt Rock", "Indie Rock"], "http:/www....dasdsaweadssa..dsa ds.com", "Last Gang Records", ["Ryan Guldemond", "Molly Guldemond", "Jasmin Parkin", "Ali Siadat", "Mike Young"], 2005)
// } catch(e) {console.log(e)}

// try{
//     const fakeBand = await bands.create("band",["Alt Rock", 1, "Indie Rock"], "http://www....dasdsaweadssa..dsa ds.com", "Last Gang Records", ["Ryan Guldemond", "Molly Guldemond", "Jasmin Parkin", "Ali Siadat", "Mike Young"], 2005)
// } catch(e) {console.log(e)}

// try{
//     const fakeBand = await bands.create("band",[], "http://www....dasdsaweadssa..dsa ds.com", "Last Gang Records", ["Ryan Guldemond", "Molly Guldemond", "Jasmin Parkin", "Ali Siadat", "Mike Young"], 2005)
// } catch(e) {console.log(e)}

// try{
//     const fakeBand = await bands.create("band",["Alt Rock", "  Indie Rock"], " http://www....dasdsaweadssa..dsa ds.com  ", "   Last Gang Records ", [" Ryan Guldemond ", "Molly Guldemond", " Jasmin Parkin  ", "Ali Siadat", " Mike Young  "], 2005)
// } catch(e) {console.log(e)}

// try{
//     const fakeBand = await bands.create("band",["Alt Rock", "Indie Rock"], "http://www....dasdsaweadssa..dsa ds.com", "Last Gang Records", ["Ryan Guldemond", "Molly Guldemond", "Jasmin Parkin", "Ali Siadat", "Mike Young"], "2005")
// } catch(e) {console.log(e)}

// try{
//     const fakeBand = await bands.create("band",["Alt Rock", "Indie Rock"], "http://www....dasdsaweadssa..dsa ds.com", "Last Gang Records", ["Ryan Guldemond", "Molly Guldemond", "Jasmin Parkin", "Ali Siadat", "Mike Young"], 1853)
// } catch(e) {console.log(e)}

// try{
//     const fakeBand = await bands.create("band",["", "Indie Rock"], "http://www....dasdsaweadssa..dsa ds.com", "Last Gang Records", ["Ryan Guldemond", "Molly Guldemond", "Jasmin Parkin", "Ali Siadat", "Mike Young"], 1853)
// } catch(e) {console.log(e)}

// try{
//     const fakeBand = await bands.create("band",["Alt Rock", "Indie Rock"], "http://www....dasdsaweadssa..dsa ds.com", "Last Gang Records", ["", "Molly Guldemond", "Jasmin Parkin", "Ali Siadat", "Mike Young"], 1853)
// } catch(e) {console.log(e)}

// console.log(theTribe._id)
// const tribeCopy = await bands.get(theTribe._id); 
// console.log(theTribe); 

// try{
//     const fakeBand = await bands.get("1234567853fbe1f5138a5ee0")
// } catch(e){console.log(e)}

// const removeTribe = await bands.remove(theTribe._id)
// console.log(removeTribe)

// allBands = await bands.getAll()
// console.log(allBands)


await closeConnection();
console.log('Done!');
