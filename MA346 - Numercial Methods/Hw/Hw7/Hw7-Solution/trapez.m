function err_trap = trapez(f, a, b, n)
%TRAPEZOIDAL_RULE Summary of this function goes here
%   Detailed explanation goes here
%   assume function = sqrt(x)
    
% Create x vector --> [a, a+(b-a)/2, ..., b]
    x = linspace(a, b, n+1)
    y = arrayfun(@(y) sqrt(y), x)
    
    % Calculate estimated integrals for trapezoids & simpsons
    interval = x(2) - x(1);
    trap_sum = 0;
    for i=1:n
        dtrap = ((f(x(i)) + f(x(i+1))) / 2) * interval;
        trap_sum = trap_sum + dtrap;
    end

    fun_integral = integral(f, a, b);
    
    err_trap = fun_integral - trap_sum
end


