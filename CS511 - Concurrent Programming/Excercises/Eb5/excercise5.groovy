import java.util.concurrent.Semaphore

Semaphore station0 = new Semaphore(1)
Semaphore station1 = new Semaphore(1)
Semaphore station2 = new Semaphore(1)
Semaphore[] permToProcess = [new Semaphore(0),new Semaphore(0),new Semaphore(0)]
Semaphore[] doneProcessing = [new Semaphore(0),new Semaphore(0),new Semaphore(0)]

5.times{
    int id = it
    Thread.start{
        station0.acquire()
        println(id + " entered station 0")
        permToProcess[0].release()
        doneProcessing[0].acquire()
        println(id + " exited station 0")
        station0.release()
        
        station1.acquire()
        println(id + " entered station 1")
        permToProcess[1].release()
        doneProcessing[1].acquire()
        println(id + " exited station 1")
        station1.release()
        
        station2.acquire()
        println(id + " entered station 2")
        permToProcess[2].release()
        doneProcessing[2].acquire()
        println(id + " exited station 2")
        station2.release()
    }
}

3.times{
    int id = it
    Thread.start{
        while(true){
            permToProcess[id].acquire()
            println(id + " station done with work")
            doneProcessing[id].release()
           
        }
    }
}