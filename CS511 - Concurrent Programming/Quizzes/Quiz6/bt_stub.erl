-module(bt_stub).
-compile(nowarn_export_all).
-compile(export_all).

-type btree() :: {empty}
	      |  {node,number(),btree(),btree()}.

-spec t1() -> btree().
% Partners: Harris Spahic & Simrun Heir
t1() ->
    {node,1,{node,2,{empty},{empty}},{node,3,{empty},{empty}}}.

-spec t2() -> btree().
t2() ->
    {node,1,
     {node,2,{empty},{empty}},
     {node,3,{empty},
      {node,3,{empty},{empty}}}}.

%% Checks that all the trees in the queue are empty trees.
-spec all_empty(queue:queue()) -> boolean().
all_empty(Q) ->
    X = queue:out(Q),
    case X of
        {empty, _} -> true;
        {{value, {node, _Num, _Rt, _Lt}}, Rest}-> false;
        _ -> false
    end.
        

%% helper function for ic
-spec ich(queue:queue()) -> boolean().
ich(Q) ->
    X = queue:out(Q),  
    case X of
        {empty, _} -> all_empty(Q);
        {{value, {node, Num, Rt, Lt}}, Rest} -> ich(queue:in(Rt, queue:in(Lt, Rest)));
        {{value, {empty}}, _Rest} -> all_empty(Q)
    end.

-spec ic(btree()) -> boolean().
ic(T) ->
    ich(queue:in(T,queue:new())).
