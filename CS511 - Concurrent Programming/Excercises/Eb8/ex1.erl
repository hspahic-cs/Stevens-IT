-module(ex1).
-compile(export_all).

start(N) ->
    C = spawn(?MODULE, counter_server, [0]),
    [spawn(?MODULE, turnstile, [C, 50]) || _ <- lists:seq(1,N)],
    C.

counter_server(State) ->
    receive
        {bump} -> 
            counter_server(State+1);
        {read, From} ->
            io:format("Returns result from ~p: ~w~n", [From, State]),
            counter_server(State)
    end.

turnstile(C, 0) ->
    C!{read, self()};

turnstile(C, N) ->
    C!{bump},
    turnstile(C, N-1).

