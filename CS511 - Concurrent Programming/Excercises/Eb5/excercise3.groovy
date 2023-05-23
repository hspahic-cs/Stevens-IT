import java.util.concurrent.Semaphore

final int capacity = 19
int cur_capacity = 0

Semaphore east_coast = new Semaphore(0)
Semaphore west_coast = new Semaphore(0)

Semaphore barrier = new Semaphore(0)

Semaphore leave = new Semaphore(0)
Semaphore arrive = new Semaphore(0)
Semaphore boarding = new Semaphore(0)

Semaphore mutex = new Semaphore(1)

Thread.start{
    int coast = 0
    while(true){
        // allow passengers on        
        mutex.acquire()
        if(coast == 0){
            capacity.times{east_coast.release()}
        } else{
            capacity.times{west_coast.release()}
        }
        mutex.release()
        
        // move to opposite coast
        arrive.acquire()
        if(coast == 0){
            println("Sailing from East Coast")
        } else{
            println("Sailing from West Coast")
        }
        coast = 1 - coast
        capacity.times{leave.release()}

        // wait for all passengers to get off
        boarding.acquire()

    }
}

// East Coast
100.times{
    int id = it
    Thread.start{
        east_coast.acquire()
        
        mutex.acquire()
        cur_capacity++
        println(id + " : East Coast boarded")
        mutex.release()

        if(cur_capacity == capacity){
            capacity.times{barrier.release()}
            barrier.acquire()
        } else{
            barrier.acquire()
        }

        arrive.release()
        leave.acquire()

        mutex.acquire()
        cur_capacity--
        println(id + " : East Coast departs")
        mutex.release()

        if(cur_capacity == 0){
            boarding.release()
        }
    
    }
}

// West Coast
100.times{
    int id = it
    Thread.start{
        west_coast.acquire()

        mutex.acquire()
        cur_capacity++
        println(id + " : West Coast boarded")
        mutex.release()

        if(cur_capacity == capacity){
            capacity.times{barrier.release()}
            barrier.acquire()
        } else{
            barrier.acquire()
        }
        
        arrive.release()
        leave.acquire()

        mutex.acquire()
        cur_capacity--
        println(id + " : West Coast departs")
        mutex.release()

        if(cur_capacity == 0){
            boarding.release()
        }
    }
}