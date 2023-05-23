import java.util.concurrent.Semaphore;

int c = 0
int d = 0

Semaphore cat_mutex = new Semaphore(1)
Semaphore dog_mutex = new Semaphore(1)
Semaphore mutex = new Semaphore(1)

20.times{
    // Dog feeding area
    Thread.start{
        mutex.acquire()
        dog_mutex.acquire()
        d++;
        if(d == 1){
            cat_mutex.acquire()
        }
        dog_mutex.release()
        mutex.release()

        dog_mutex.acquire()
        d--;
        if(d == 0){x`
            cat_mutex.release()
        }
        dog_mutex.release()
    }
}

20.times{
    // Cat feeding area
    Thread.start{
        mutex.acquire()
        cat_mutex.acquire()
        c++;
        if(c == 1){
            dog_mutex.acquire()
        }
        cat_mutex.release()
        mutex.release()

        cat_mutex.acquire()
        c--;
        if(c == 0){
            dog_mutex.release()
        }
        cat_mutex.release()
    }
}