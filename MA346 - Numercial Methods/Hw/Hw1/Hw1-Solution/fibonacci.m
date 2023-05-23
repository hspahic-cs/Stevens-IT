% INPUT: n
% OUTPUT: nth term in fibonacci sequence
% 1. If n == 0  
    % return 0
% 2. If n == 1 or n == 2 
    % return 1
% 3. Else
    % Set a = 1, b = 1, and temp = b
    % For 0 to n-2
        % i. set b to a + b
        % ii. set a to temp
        % iii. set temp to new value of b
% END FUNCTION

function for_result = fibonacci(n)
if (n == 0)
    for_result = 0
elseif (n == 1 || n == 2)
    for_result = 1
else
    a = 1
    b = 1
    temp = b
    for k = 0:n-3
        b = a + b
        a = temp
        temp = b
    end
    for_result = b
end
   
