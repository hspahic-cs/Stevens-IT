import java.util.concurrent.Semaphore;

Semaphore permToLoad = new Semaphore(0)
Semaphore doneLoading = new Semaphore(0)
int count_ptrains = 0
int freight_trains = 0

List<Semaphore> tracks = [new Semaphore(1), new Semaphore(1)]

3.times{
    int dir = (new Random()).nextInt(2)
    int id = it
    Thread.start{ // Passenger Train travelling in direction dir
        tracks[dir].acquire()
        println(id + ": Passenger train entering station "+ dir)
        count_ptrains++
        println(id + ": Passenger train leaving station " + dir)
        println("trains have come to the station ---> " + count_ptrains)
        tracks[dir].release()
    }
}

3.times{
    int dir = (new Random()).nextInt(2)
    int id = it
    Thread.start{ // Freight Train travelling in direction dir
        tracks[0].acquire()
        tracks[1].acquire()
        permToLoad.release()
        println(id + ": Freight Train arrived to station")
        doneLoading.acquire()
        println(id + ": Freight Train leaving station")
        freight_trains++ 
        println("Freight have come to the station --> " + freight_trains)
        tracks[1].release()
        tracks[0].release()
    }
}


// Infinite loop because of loading machine

Thread.start{ // Loading Machine
    while(true){
        permToLoad.acquire()
        println("Machine loading")
        // load frieght train
        doneLoading.release()
    }
}
