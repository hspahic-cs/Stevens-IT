% INPUT: A b 
% A -> nxn float matrix
% b -> float vector of size n
% OUTPUT: Returns x1, x2, ..., xn that solves Ax = b or message indicating
% no solution


function result = guass_elim(A,x)
% DESCRIPTION: Applies Gaussian Elimination using back-substitution to
% solve Ax = b

% NOTE: I will add comments throughout my code, rather than describe the
% algorithm here for readability purposes

% 1. Checks if #rows in A == #cols in A
% Else throws an error
if size(A, 1) ~= size(A,2)
    error("Error: A is not a square matrix!")
end 

A = [A transpose(x)];
dim = size(A, 1);
solution = zeros(dim, 1);

% For every column
for i = 1:dim-1
    small_p = 0;
    % Find the smallest index with a non-zero value in column i
    for p = i:dim
        % If value found break out of loop
        if A(p,i) ~= 0
            small_p = p;
            break
        end 
    end
    
    % If no value was found (small_p never changed to an index) return
    % error
    if small_p == 0
        result = "No unique solution exists"
        return 
    end
    
    % If the row is not the same as the column, switch the ith & pth row
    if small_p ~= i
       A([small_p, i],:) = A([i, small_p], :);
    end
    
    % Eliminate all ith column elements (through row subtraction) with 
    % row i 
    for j = i+1:dim
        m = A(j,i)/A(i,i);
        A(j,:) = A(j,:) - m *A(i,:);
    end

    % Print A for error checking
    A
end

% If the bottom right element of the matrix A is 0, then no solution exists
if A(dim, dim) == 0
    result = "No unique solution exists"
    return
end

% Solve last row for rightmost variable Xn
solution(dim) = A(dim, dim+1) / A(dim,dim);

% Back substitute prior calculated Xn values, to get Xi for i from 1:dim -1 
for temp = 1:dim-1
    i = dim - temp;
    sum = 0;
    for j = i+1:dim
        sum = sum + A(i, j) * solution(j);
    end
    sum = (A(i, dim + 1) - sum) / A(i,i);
    solution(i) = sum;
end

% Return solution
result = solution
 
end
