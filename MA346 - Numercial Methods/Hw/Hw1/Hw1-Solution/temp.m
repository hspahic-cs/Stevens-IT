function result = temp()
fileID = fopen('results.txt', 'w');
for n = 1:30
     An = fibonacci(n);
     A = fibonacci(n-1);

     Bn = fibonaccivect(n);
     B = fibonaccivect(n-1);
     
     fprintf(fileID, "For loop with n = " + n + " -> " + An/A + "\n");
     fprintf(fileID, "Direct Calc with n = " + n + " -> " + Bn/B + "\n");
     fprintf(fileID, "\n")
end
fclose(fileID);
