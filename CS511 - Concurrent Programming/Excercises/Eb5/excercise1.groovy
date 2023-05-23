import java.util.concurrent.Semaphore

Semaphore tickets = new Semaphore(0)
Semaphore mutex = new Semaphore(1)
boolean itGotLate = False


// Declare Semaphores here
20.times{
    // Pat's thread
    Thread.start{
        tickets.release()
    }
}

20.times{
    Thread.start{
        mutex.acquire()
        if(!itGotLate){
            tickets.acquire()
            tickets.acquire()}
        mutex.release()
    }
}

Thread.start{
    sleep(1000)
    itGotLate = True
    tickets.release()
    tickets.release()
}