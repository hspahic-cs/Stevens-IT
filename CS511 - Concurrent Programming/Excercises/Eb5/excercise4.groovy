import java.util.concurrent.Semaphore

MAX_WEIGHTS = 10
GYM_CAP = 50

// Declare semaphores here
Semaphore gym_access = new Semaphore(GYM_CAP)
Semaphore weights = new Semaphore(MAX_WEIGHTS)
Semaphore A1 = new Semaphore(1)
Semaphore A2 = new Semaphore(1)
Semaphore A3 = new Semaphore(1)


def make_routine(int no_excercises){
    Rand rand = new Random()
    int size = rand.nextInt(no_excercises)
    def routine = []
    
    size.times{
        routine.add(new Tuple(read.nextInt(4), rand.nextInt(MAX_WEIGHTS)))
    }
    return routine
}

100.times {
    int id = it

    Thread.start{
        routine = make_routine(20)
        gym_access.acquire()
        routine.size().times{
            // Complete excercise on machine
            if(it == 0){
                A1.acquire()
            } else if (it == 1){
                A2.acquire()
            } else{
                A3.acquire()
            }

            weights.acquire(routine[it][1])
            println "$id is performing: "+ routine[it][0] + "---"+ routine[it][1]
            
            if(it == 0){
                A1.release()
            } else if (it == 1){
                A2.release()
            } else{
                A3.release()
            }

            weights.release(routine[it][1])
        }
        
        gym_access.release()
    }
}

