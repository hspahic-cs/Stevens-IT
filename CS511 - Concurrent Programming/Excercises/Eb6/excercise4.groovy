import java.util.concurrent.locks.*;

class TrainStation {
    final Lock lock = new ReentrantLock()
    
    final Condition northOpen = lock.newCondition()
    final Condition southOpen = lock.newCondition()
    
    boolean north_occ = false
    boolean south_occ = false

    void acquireNorthTrackP () {
        lock.lock()
        try{
            println("North waiting to enter")
            while(north_occ){
                northOpen.await()
            }
            north_occ = true
            println("North entering")
        } finally{
            lock.unlock()
        }
    }

    void releaseNorthTrackP () {
        lock.lock()
        try{
            north_occ = false
            northOpen.signal()
            //frieghtOpen.signal()
            println("North exiting")
        } finally{
            lock.unlock()
        }
    }

    void acquireSouthTrackP () {
        lock.lock()
        try{
            println("South waiting to enter")
            while(south_occ){
                southOpen.await()
            }
            south_occ = true
            println("South entering")
        } finally{
            lock.unlock()
        }
    }

    void releaseSouthTrackP () {
        lock.lock()
        try{
            south_occ = false
            southOpen.signal()
            println("South exiting")
        } finally{
            lock.unlock()
        }
    }


// Code is signaling both southOpen & northOpen in lock, then southOpen falls through; but northOpen remains waiting
// Is there a way to make sure both awaits are called simultaneously? 
// Easy to make all freight trains go with a new lock; hard to make interspersed 

    void acquireTracksF () {
        lock.lock()
        try{
            println("Freight waiting to enter")
            
            while(north_occ){
                northOpen.await()
            } 
            
            while(south_occ){
                southOpen.await()
            }
            
            south_occ = true
            north_occ = true
            println("Freight entering")
        } finally{
            lock.unlock()
        }
    }

    void releaseTracksF () {
        lock.lock()
        try{
            south_occ = false
            north_occ = false
            println("Freight exiting " + "S:" + south_occ + " N: " + north_occ)
            southOpen.signal()
            northOpen.signal()
//           frieghtOpen.signal()
        } finally{
            lock.unlock()
        }
    }
}

TrainStation s = new TrainStation ();

100.times{
    Thread.start { // Passenger Train going North
        s.acquireNorthTrackP();
        println "NPT"+Thread.currentThread().getId();
        s.releaseNorthTrackP();
    }
}

100.times{
    Thread.start { // Passenger Train going South
        s.acquireSouthTrackP();
        println "SPT"+ Thread.currentThread().getId();
        s.releaseSouthTrackP()
    }
}

100.times {
    Thread.start { // Freight Train
        s.acquireTracksF();
        println "FT "+ Thread.currentThread().getId();
        s.releaseTracksF();
    }
}