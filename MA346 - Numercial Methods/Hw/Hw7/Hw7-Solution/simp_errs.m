function [errs, slope] = simp_errs(n_arr, fun, a, b)
%FIND_ERRS Summary of this function goes here
%   Detailed explanation goes here
    y = zeros(1, length(n_arr));
    length(n_arr)
    for i = 1:length(n_arr)
        n_arr(1)
        y(i) = simp(fun, a, b, n_arr(i))
    end
    errs = y
    slope = (log(y(length(n_arr))) - log(y(1))) / (log(n_arr(length(n_arr))) - log(n_arr(1)))
    
    loglog(n_arr, y)
end
