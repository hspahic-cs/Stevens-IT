-module(ex2).
-compile(export_all).

start() -> 
    S = spawn(?MODULE, server, []),
    [spawn(?MODULE, client, [S]) || _ <- lists:seq(1,10)].

client(S) ->
    S!{start, self()},
    receive
        {Servlet} ->
            Sv = Servlet
    end,
    Sv!{add, "h", self()},
    Sv!{add, "e", self()},
    Sv!{add, "l", self()},
    Sv!{add, "l", self()},
    Sv!{add, "o", self()},
    Sv!{done, self()},
    receive 
        {Sv, Str} ->
            io:format("Done: ~p~s~n", [self(), Str]);
        _ -> 
            io:format("Made it ~n", [])
    end.

server() ->
    receive 
        {start, From} ->
            From!{spawn(?MODULE, servlet, [[]])}, 
            server()
    end.

servlet(L) ->
    receive
        {add, C, _From} ->
            servlet([L | C]);
        {done, From} ->
            From!{self(), L}
    end.
