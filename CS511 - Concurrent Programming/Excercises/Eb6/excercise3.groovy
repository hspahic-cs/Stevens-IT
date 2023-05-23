class Barrier{
    final int size;
    private int cur;

    Barrier(int size){
        cur = 0;
        this.size=size;
    }

    synchronized void waitAtBarrier(){
        cur = cur + 1
        println("Before barrier: " + cur)
        while(cur < size){
            wait()
        }
        notify()
        println("After barrier: " + cur)    
    }
}

Barrier b = new Barrier(3)

20.times{
    int id = it
    Thread.start{
        //println(b.cur + " BEFORE BARRIER")
        b.waitAtBarrier()
        //println(b.cur + " AFTER BARRIER")
}
}