class Bar{
    private int pats;
    private int j;
    private int p;
    private boolean itGotLate;

    Bar(){
        pats = 0
        j = 0
        p = 0
        itGotLate = false
    }
    
    synchronized void jets(){
        while(pats < 2 && !itGotLate){
            wait()
        }
        pats-=2
        j++
        show_cur()
    }

    synchronized void show_cur(){
        println("p : " + p + " | j : " + j)
    }

    synchronized void patriots(){
        pats++
        p++;
        show_cur()
        notify()
    }

    synchronized void itGotLate(){
        itGotLate = true
        notifyAll()
    }
}

Bar b = new Bar()

100.times{
    int id = it
    Thread.start{
        b.jets()
    }

}

100.times{
    int id = it
    Thread.start{
        b.patriots()
    }
}

