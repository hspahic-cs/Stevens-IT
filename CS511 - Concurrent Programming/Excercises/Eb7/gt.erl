-module(gt).
-compile(nowarn_export_all).
-compile(export_all).
-author("~ Your Mom <3").

%%% (Non-empty) General trees
%%% gt:= {node, D, List, gt}\

%     7
%   /  \ 
%  3    55
%      / | \ 
%     12 77 93

-type gt(A) :: {node, A, list(gt(A))}.
-spec t1() -> gt(integer()).

t1() ->
    {node, 7, [
        {node, 3, [
            {node, 6, []}]},
        {node, 55, [
            {node, 12, []},
            {node, 77, []},
            {node, 93, []}]}
    ]}.

sum([]) -> 
    0;
sum([H|T]) -> 
    H + sum(T).

-spec sizegt(gt(_A)) -> integer().

sizegt({node, _D, CH}) ->
    1 + sum(lists:map(fun sizegt/1, CH)).

-spec is_leaf(gt(_A)) -> boolean().
is_leaf({node, _D, []}) ->
    true;
is_leaf(_) -> false.

-spec mirror(gt(A)) -> gt(A).
mirror({node, D, CH}) -> 
    {node, D, lists:reverse(lists:map(fun mirror/1, CH))}.

-spec preorder(gt(A)) -> list(A).
preorder({node, D, CH}) ->
    [D | lists:flatten(lists:map(fun preorder/1, CH))].

% % -spec postorder(gt(A)) -> list(A).
% postorder({node, D, CH}) ->
%     case {node, D, CH} of
%         {node, D, [H|[]]} -> [postorder(H) | D];
%         {node, D, [H|T]} -> [lists:append([postorder(H), lists:map(fun postorder/1, T)]) | D] ;
%         {node, D, []} -> D
%     end.

-spec prune(integer(), gt(A)) -> gt(A).
prune(0, {node, D, _CH}) ->
    {node, D, []};
prune(N, {node, D, CH}) when N>0->
    {node, D, lists:map(fun (L) -> prune(N-1,L) end, CH)}.

level(0, {node, D, _CH}) ->
    [D];

level(N, {node, _D, CH}) when N>0 ->
    lists:flatten([lists:map(fun (L) -> level(N-1, L) end, CH)]).

mapgt(F, {node, D, CH}) ->
    case {node, D, CH} of
        {node, D, CH} -> {node, F(D), lists:map(F, CH)};
        {node, D, []} -> {node, F(D), []}
    end.


% mapgt(F, {node, D, CH})
% level(N, {node, D, CH})