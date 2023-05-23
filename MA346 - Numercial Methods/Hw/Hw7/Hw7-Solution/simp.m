function err_simp = simp(f, a, b, n)
%TRAPEZOIDAL_RULE Summary of this function goes here
%   Detailed explanation goes here
%   assume function = sqrt(x)
    
% Create x vector --> [a, a+(b-a)/2, ..., b]
    x = linspace(a, b, n+1)
    y = arrayfun(@(y) sqrt(y), x)
    
    % Calculate estimated integrals for trapezoids & simpsons
    interval = x(2) - x(1);
    simpsons_sum = 0;

    for i=1:n
        dsimpsons = (interval / 6) * (f(x(i)) +4*f((x(i) + x(i+1)) / 2) + f(x(i+1)));
        simpsons_sum = dsimpsons + simpsons_sum;
    end
    
    fun_integral = integral(f, a, b);
    err_simp = fun_integral - simpsons_sum;
end

