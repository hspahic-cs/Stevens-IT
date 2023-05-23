-module(ex8).
-compile(export_all).

% rand:uniform(N)
start() ->
    S = spawn(?MODULE, server, []),
    [spawn(?MODULE, client, [S]) || _ <- lists:seq(1, 10)].

server() ->
    receive 
        {From, Ref, start} -> 
            Sv = spawn(?MODULE, servlet, [rand:uniform(10)]),
            From!{ok, Sv},
            server()
    end.

servlet(Val) ->
    receive 
        {From, G} ->
            case G == Val of 
                true -> 
                    From!{gotIt};
                _ -> 
                    From!{tryAgain},
                    servlet(Val)
            end
    end.
    
client(S) ->
    S!{self(), 0, start},
    receive
        {ok, Sv} ->
            client_loop(Sv, rand:uniform(10), 0)
    end.

client_loop(S, G, C) ->
    S!{self(), G},
    receive 
        {gotIt} ->
            io:format("Pid: ~p guessed number in ~w tries ~n", [self(), C]);
        {tryAgain} ->
            client_loop(S, rand:uniform(10), C+1)
    end.

        
