// Name: Harris Spahic
// Pledge: "I pledge my honor I have abided by the Steven's Honor Code"

.text
.global _start
.extern printf

_start: 
    adr X0, a
    LDUR D0, [X0]
    fmov D8, D0
    
    adr X0, b
    LDUR D0, [X0]
    fmov D9, D0
    
    adr X0, n
    LDUR D0, [X0]
    fmov D10, D0
    
    adr X0, const1
    LDUR D0, [X0]
    fmov D11, D0

    adr X0, const2
    LDUR D0, [X0]
    fmov D12, D0
    
    adr X0, const3
    LDUR D0, [X0]
    fmov D13, D0

    adr X0, const4
    LDUR D0, [X0]
    fmov D14, D0

    adr X0, actual
    LDUR D1, [X0]
    fmov D16, D1

    
    bl lower_integral_apx
    bl print_result

// Variable key
// D8 = a, D9 = b, D10 = n, D11 = const1, D12 = const2, D13 = const3, D14 = const4
lower_integral_apx: 
    sub sp, sp, #16
    stur lr, [sp, #8]
    stur D8, [sp, #0]
    
    fsub D1, D1, D1
    fsub D15, D9, D8    
    fdiv D15, D15, D10  // length of increment --> max - min / n = D15

loop:
    fcmp D8, D9
    b.GE integral_exit
    fmov D2, D8         // a into D2
    bl fx                
    fmul D2, D2, D15    // fx * interval
    fadd D1, D1, D2     // Add fx to result
    fsub D2, D2, D2     // D2 reset
    fadd D8, D8, D15    // a + interval 
    b loop

integral_exit:
    ldur D8, [sp, #0]
    ldur lr, [sp, #8]
    add sp, sp, #16
    br lr

// Return value of D2, Input also at D2, y = 2.5x^3 − 15.5x^2 + 20x + 15
fx: 
    sub sp, sp, #8
    stur lr, [sp, #0]
    fmov D20, D2        // Temp = x 
    fsub D2, D2, D2
    fadd D2, D2, D14    // Add 15

    fmul D21, D20, D13  // Add c*x
    fadd D2, D21, D2    

    fmul D22, D20, D20  // Add bx^2  
    fmul D21, D22, D12
    fadd D2, D21, D2    

    fmul D22, D22, D20  // Add ax^3
    fmul D21, D22, D11
    fadd D2, D21, D2
    
    ldur lr, [sp, #0]
    add sp, sp, #8
    br lr

print_result: 
    ldr x0, =solution
    fmov D0, D1
    fmov D1, D16
    fsub D2, D0, D1
    
    bl printf

    mov x0, #0
    mov w8, #93
    svc #0

.data
a: .double -0.5
b: .double 5.0
n: .double 3000000

const1: .double 2.5
const2: .double -15.5
const3: .double 20
const4: .double 15

actual: .double 74.1069775


solution: .ascii "Apx: %lf | Actual: %lf | Dif: %lf\n"
.end 
