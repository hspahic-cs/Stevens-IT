byte n=0

active proctype P() {
    n++;
    printf("P's PID is %d. \n", _pid)
}

active proctype Q() {
    n++;
    printf("Q's PID is %d. \n", _pid)
}