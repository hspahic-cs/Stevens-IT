import java.util.concurrent.Semaphore
// One-time use barrier
// Barrier size = N
// Total number of threads in the system = N
final int N=3
int t=0
Semaphore barrier = new Semaphore(0)
Semaphore mutex = new Semaphore(1)

N.times {
  int id = it
  Thread.start {
    while (true) {
        // barrier arrival protocol
        mutex.acquire()
            if (t<N) {
                t++
            } else if (t==N) {
                N.times { barrier.release() }
            } else {
                barrier.release() 
            }
        mutex.release()
        // barrier
        println id+" got to barrier"
        barrier.acquire() 
        println id+" went through"
    }
  }
}