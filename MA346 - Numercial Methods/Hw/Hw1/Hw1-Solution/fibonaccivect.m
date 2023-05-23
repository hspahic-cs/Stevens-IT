% INPUT: n
% OUTPUT: nth term in fibonacci sequence
% 1. If n == 1 or n == 2 
    % return 1
% 2. Else
    % Set a = 1, b = 1, and temp = b
    % For 0 to n-2
        % i. set b to a + b
        % ii. set a to temp
        % iii. set temp to new value of b
% END FUNCTION

function direct_result = fibonaccivect(n)
direct_result = (1 / sqrt(5))*(((1+sqrt(5))/2)^n - ((1-sqrt(5))/2)^n)
   