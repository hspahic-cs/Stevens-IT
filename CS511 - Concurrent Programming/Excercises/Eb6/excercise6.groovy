import java.util.concurrent.locks.*

class Pizza {
    // Variables declared here
    private int s;
    private int l;

    Lock lock = new ReentrantLock()
    Condition buySmall = lock.newCondition()
    Condition buyLarge = lock.newCondition()


    Pizza(){
        s = 0
        l = 0
    }

    void puchaseSmallPizza(){
        lock.lock()
        try{
            print_result("Waiting on Small Pizza")
            while(s == 0){
                buySmall.await()
            }
            s--
            print_result("Bought Small Pizza")
        } finally{
            lock.unlock()
        }
    }

    void purchaseLargePizza(){
        lock.lock()
        try{
            print_result("Waiting on Large Pizza")
            while(l == 0 && s < 2){
                buyLarge.await()
            }

            if(l > 0){
                l--
            } else{
                s = s - 2
            }
            print_result("Bought Large Pizza")
        } finally{
            lock.unlock()
        }        
    }

    void bakeSmallPizza(){
        lock.lock()
        try{
            s++
            buySmall.signal()
            buyLarge.signal()
            print_result("Baking Small Pizza")
        } finally{
            lock.unlock()
        }
    }
    
    void bakeLargePizza(){
        lock.lock()
        try{
            l++
            buyLarge.signal()
            print_result("Baking Large Pizza")
        } finally{
            lock.unlock()
        }
    }

    void print_result(msg){
        lock.lock()
        try{
            println(msg + ": Large = " + l + " Small = " + s)
        } finally{
            lock.unlock()
        }
    }
}

Pizza shop = new Pizza()

3.times{
    Thread.start{
        shop.bakeLargePizza()
        shop.bakeSmallPizza()
    }
}

3.times{
    Thread.start{
        shop.puchaseSmallPizza()
        shop.purchaseLargePizza()
    }
}


