-module(ex4).
-compile(export_all).

start(Freq) -> 
    Pids = [spawn(?MODULE, student, []) || _ <- lists:seq(1,10)],
    spawn(?MODULE, timer, [Freq, []]).

timer(Freq, Pids) ->
    timer:sleep(Freq),
    [PID!{tick} || PID <- Pids],
    timer(Freq, Pids).

student() -> 
    receive 
        {tick} ->
            io:format("Recieved tick: ~p~n", [self()]),
            student()
    end.
