class Three_Way{
    private int f, s, t;
    private int current_method;

    Three_Way(){
        current_method = 0
        f = 0
        s = 0
        t = 0
    }

    synchronized void first(){
        while(current_method != 0){
            wait()
        }
        
        current_method = (current_method + 1) % 3
        f++
        print_result()
        notifyAll()
    }
    
    synchronized void second(){
        while(current_method % 3 != 1){
            wait()
        }
        
        current_method = (current_method + 1) % 3
        s++
        print_result()
        notifyAll()
    }

    synchronized void third(){ 
        while(current_method % 3 != 2){
            wait()
        }

        current_method = (current_method + 1) % 3
        t++;
        print_result()
        notifyAll()
    }

    synchronized void print_result(){
        println("f: " + f + " || s: " + s + " || t: " + t +  " [current method - "  + current_method + "] ")
    }
}

Three_Way test = new Three_Way();

100.times{
    Thread.start{
        test.first()
    }
}

100.times{
    Thread.start{
        test.second()
    }
}

100.times{
    Thread.start{
        test.third()
    }
}