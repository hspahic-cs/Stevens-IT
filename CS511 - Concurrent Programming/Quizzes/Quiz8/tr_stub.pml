// Students: Harris Spahic & Simrun Heir
#define PT 5 /* Number of Passenger Trains */
#define FT 2 /* Number of Freight Trains */
byte permToLoad;   /* machine semaphores, 0 permits by default */
byte doneLoading;
byte track[2];     /* track semaphores */

inline acquire(s) {
   atomic { 
    s>0;
    s-- }
}

inline release(s) { s++ }

proctype PassengerTrain(int i) {
  /* complete */
  acquire(track[i]);
  release(track[i])
}


proctype FreightTrain() { 
  /* complete */ 
  acquire(track[0]);
  acquire(track[1]);
  permToLoad = 1;
  // Does the thing
  do
    :: doneLoading == 1 -> break
    :: else
  od;
  doneLoading = 0;
  release(track[0]);
  release(track[1])
}

proctype LoadingMachine() {
  end1: /*  avoids invalid end-state error */
   /* complete */
  do
    :: do 
       :: permToLoad == 1 -> break
       :: else 
       od;
       permToLoad = 0;
       doneLoading = 1
  od
}

init {
  byte i;
  track[0]=1;
  track[1]=1;

  atomic {
    for (i:1..(PT)) {     /* spawn passenger trains */
      do  /* randomly choose a direction */
    	:: run PassengerTrain(0);break;
    	:: run PassengerTrain(1);break;
      od
    }
    for (i:0..(FT)) {     /* spawn freight trains */
      run FreightTrain();
    }
    run LoadingMachine(); /* spawn loading machine */
  }
}
