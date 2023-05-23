struct passwd* init_print(int print);
void sigint_handler(int sig);
void sigchld_handler(int sig);
int read_input(char** cmd);
int fun_fgprocess(int ncmd, char** cmd);
void fun_bgprocess(int ncmd, char** cmd);
int cmd_handler(int ncmd, char** cmd);
