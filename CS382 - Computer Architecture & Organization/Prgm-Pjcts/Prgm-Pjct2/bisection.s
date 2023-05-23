.text
.global _start
.extern printf

_start: 
    ldr x1, =N      
    ldr x1, [x1]        // X1 --> Degree of polynomial
    ldr x2, =coeff      // X2 --> &coeff array

    adr x0, const1
    LDUR d0, [x0]
    fmov d1, d0         // D1 --> a, the left x val

    adr x0, const2
    LDUR d0, [x0]
    fmov d2, d0         // D2 --> b, the right x val

    adr x0, err
    LDUR d0, [x0]
    fmov d3, d0         // D3 --> err
    fmul d3, d3, d3

    adr x0, temp1
    LDUR d0, [x0]
    fmov d14, d0        // D14 --> 2.0

    fsub d15, d15, d15  // D15 -> obligitory 0 values

    bl bisection
    bl print_result

// Assume x1 = N, X2 = &ceoff, D1 = A, D2 = B, D3 = err
bisection:
    sub sp, sp, #8
    stur lr, [sp, #0]
    cmp x1, #1
    b.lt print_error
    
loop_bisection:
    fmov d4, d1
    bl calc             // Calculate f(A)
    fmov d19, d0        // d19 = f(A)   

    fmov d4, d2
    bl calc             // Calculate f(B)
    fmov d20, d0        // d20 = f(B)

    fadd d5, d2, d1     // D5 = B + A

    fdiv d5, d5, d14    // C = D5 / 2
    fmov d4, d5         
    bl calc
    fmov d21, d0        // d21 = f(C)
    
    fmul d22, d21, d21  // d22 = f(c)^2
    fcmp d22, d3
    b.lt end_bisection

    fmul d23, d21, d19  // d23 = f(c) * f(a) Check if f(C) & f(B) have the same sign
    fcmp d23, d15       // If they don't then go to dif_signs
    b.lt dif_signs
    fmov d1, d5         // Else interval becomes [A, C] where A is pos & C is negative
    b loop_bisection
    
dif_signs: 
    fmov d2, d5         //If signs are different --> C must be negative & B positve
    b loop_bisection

end_bisection:    
    fmov d1, d5
    fmov d2, d21
    ldur lr, [sp, #0]
    add sp, sp, #8
    br lr

// Assume X1 = N, X2 = &coeff, D4 = value to input into f(x) || Returns result at D0
calc: 
    sub sp, sp, #32
    stur lr, [sp, #24]
    stur x1, [sp, #16]
    stur x2, [sp, #8]
    stur d4, [sp, #0]
    
    fmov d0, d15         // Reset result d0 -> 0
    fmov d10, d4         // Store power
    mov x9, x2           // Set x9 --> &coeff
    lsl x10, x1, #3
    add x9, x9, x10      // Set x9 --> &coeff + 8 * N -> &coeff[-1]
    mov x11, #0          // Set counter = 0

calc_loop:
    cmp x2, x9           // check if &coeff[i] < &coeff[0]
    b.gt calc_end        // if true, end loop
    ldr d9, [x2]         // else load coeff[i] into d9
    cmp x11, #0
    b.ne calc_cont
    fadd d0, d9, d0      // if adding constant (0th run), only add constant
    b calc_loop_end

calc_cont:
    fmul d9, d9, d10     // else coeff * val
    fadd d0, d9, d0
    fmul d10, d10, d4    // square value

calc_loop_end:
    add x11, x11, #1
    add x2, x2, #8
    b calc_loop   

calc_end:
    ldur d4, [sp, #0]
    ldur x2, [sp, #8]
    ldur x1, [sp, #16]
    ldur lr, [sp, #24]
    add sp, sp, #32
    br lr

print_result: 
    ldr x0, =solution
    bl printf
    
    b print_end

print_error:
    ldr x0, =error
    bl printf

print_end:
    mov x0, #0
    mov x8, #93
    svc #0 

.data
    N: 
        .dword 3
    coeff: 
        .double 5.3, 0.0, 2.9, -3.1 
    const1: 
        .double 1.0
    const2: 
        .double 2.0
    err: 
        .double 0.01
    temp1: 
        .double 2.0
    
    solution: 
        .ascii "f(c) = %lf | Polynomial has solution at x = %lf \n\0"
    error: 
        .ascii "Polynomial has no solution in this interval\n\0"
    
.end
