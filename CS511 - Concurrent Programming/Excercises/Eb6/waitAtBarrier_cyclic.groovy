import java.util.concurrent.locks.*

class Barrier{
    final int size;
    private int cur;
    private int cur2;
    private int finished;
    boolean permEnter;

    Barrier(int size){
        cur = 0
        cur2 = 0
        finished = 0
        permEnter = true
        this.size=size;
    }

    Lock lock = new ReentrantLock()
    Condition bar1 = lock.newCondition()
    Condition bar2 = lock.newCondition()
    Condition enter = lock.newCondition()
    
    // Cascading signal --> one stops waiting, the next stop waiting & so on
    void waitAtBarrier(){
        lock.lock()
        try{
            while(!permEnter || cur >= size){
                println("Entering the wait for enter")
                enter.await()
            }

            cur2 = 0
            cur = cur + 1
            print_result("Waiting on first bar")
            while(cur < size){
                bar1.await()
            }

            permEnter = false
            print_result("Exiting first bar")
            bar1.signal()

            cur2 = cur2 + 1
            print_result("Waiting on second bar")
            while(cur2 < size){
                bar2.await()
            }

            finished += 1

            if(finished % size == 0){
                cur = 0
                permEnter = true
                size.times{
                    enter.signal()
                }
            }
            
            print_result("Exiting second bar")
            bar2.signal()

        } finally{
            lock.unlock()
        }
    }

    void print_result(msg){
        println(msg + " || Cur:" + cur + " || NCur: " + cur2)
    }

}

Barrier b = new Barrier(3)

90.times{
    int id = it
    Thread.start{
        //println(b.cur + " BEFORE BARRIER")
        b.waitAtBarrier()
        //println(b.cur + " AFTER BARRIER")
}
}