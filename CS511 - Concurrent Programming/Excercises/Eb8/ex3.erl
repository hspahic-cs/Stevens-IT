-module(ex3).
-compile(export_all).

start() ->
    S = spawn(?MODULE, server, [0]),
    [spawn(?MODULE, client, [S, 10]) || _ <- lists:seq(1, 10)].

server(C) ->
    receive
        {counter, From} ->
            From!{sent, C},
            server(0);
        {continue, _From} ->
            server(C + 1)
    end.

client(S, 0) ->
    S!{counter, self()}, 
    receive 
        {sent, C} -> 
             io:format("Number of counts since previous display: ~w~n", [C])
    end;

client(S, N) ->
    S!{continue, self()},
    client(S, N-1).
            