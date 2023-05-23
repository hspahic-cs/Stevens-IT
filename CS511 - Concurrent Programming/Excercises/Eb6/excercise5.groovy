import java.util.concurrent.locks.*;

class PowerGrid{
    private int p;
    private int c;
    
    Lock lock = new ReentrantLock()
    Condition stopProducing = lock.newCondition()
    Condition startConsuming = lock.newCondition()
  
    PowerGrid(){
        p = 0
        c = 0
    }
    
    // What is stopping 
    void startProducing(){
        lock.lock()
        try{
            p++
            stopProducing.signal()
            startConsuming.signal()
            print_result("Start Producing")
        } finally{
            lock.unlock()
        }
    }
    
    void stopProducing(){
        lock.lock()
        try{
            while(p == c){
                stopProducing.await()
            }
            print_result("Stop Producing")
            p--
        } finally{
            lock.unlock()
        }
    }

    void startConsuming(){
        lock.lock()
        try{
            while(p == c){
                startConsuming.await()
            }
            print_result("Start Consuming")
            c++
        } finally{
            lock.unlock()
        }
    }

    void stopConsuming(){
        lock.lock()
        try{
            c--
            startConsuming.signal()
            stopProducing.signal()
            print_result("Stop Consuming")
        } finally{
            lock.unlock()
        }
        
    }

    void print_result(value){
        lock.lock()
        try{
        println("Current values of P: " + p + " || C: " + c + " Running " + value)
        } finally{
            lock.unlock()
        }
    }
}

PowerGrid temp = new PowerGrid()

4.times{
    int id = it
    Thread.start{
        temp.startProducing()
        //println("Currently Producing: " + id)
        temp.stopProducing()
    }    
}

4.times{
    int id = it
    Thread.start{
        temp.startConsuming()
        //println("Currently Consuming: " + id)
        temp.stopConsuming()
    }
}
