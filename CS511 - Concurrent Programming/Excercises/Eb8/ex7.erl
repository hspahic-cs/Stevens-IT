-module(ex7).
-compile(export_all).

start(W, M) ->
    S = spawn(?MODULE, server, [0, 0]),
    [spawn(?MODULE, patriots, [S]) || _ <- lists:seq(1, W)],
    [spawn(?MODULE, jets, [S]) || _ <- lists:seq(1, M)].

patriots(S) ->
    S!{self(), pat}.

jets(S) ->
    S!{self(), perm_to_enter}, 
    receive
        {accepted, From} ->
            S!{self(), jet}
    end.

server(Patriots, Jets) -> 
    io:format("Current tally. Pats: ~w, Jets: ~w~n", [Patriots, Jets]),
    receive 
        {From, pat} -> 
            server(Patriots + 1, Jets);
        {From, perm_to_enter} when Patriots >= 2 ->
            From!{accepted, self()},
            server(Patriots - 2, Jets + 1);
        {From, jet} ->
            server(Patriots, Jets)
    end.