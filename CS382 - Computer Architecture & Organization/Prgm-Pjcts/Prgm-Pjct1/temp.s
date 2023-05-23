.text
.global _start 

_start:
    mov x10, #10        // Just 10 for mulitiplication
    mov x20, #0         // Checks if its the first run
    mov x19, #0         // Sum of values
    ldr x1, =input       

loop:
    sub sp, sp, #40
    stur x0, [sp, #0]
    stur x1, [sp, #8]
    stur x2, [sp, #16]
    stur x10, [sp, #24]
    stur x19, [sp, #32]
    
    mov x0, 0
    mov x2, 1
    mov x8, 63
    svc 0

    ldur x0, [sp, #0] 
    ldur x1, [sp, #8]
    ldur x2, [sp, #16]
    ldur x10, [sp, #24]
    ldur x19, [sp, #32]
    add sp, sp, #40
    
    ldr x21, [x1]
    cmp x21, #'\n'
    b.eq print_result

    sub x21, x21, #48
    
    cmp x20, #0
    b.ne not_first_run
    add x19, x19, x21
    b finish_comp

not_first_run:
    mul X19, X19, X10
    add x19, x19, x21

finish_comp:
    add x20, x20, #1    // Increase size by 2 each time
    b loop

print_result:
    mul x19, x19, x19
    mov x20, #0
    mov x21, x19
L1: 
    sub sp, sp, #8
    udiv x21, x21, x10
    mul x22, x21, x10
    sub x22, x19, x22   // Rem x22 & quotient x21
    udiv x19, x19, x10
    
    add x22, x22, #48
    stur x22, [sp]
    add x20, x20, #1

    cmp x21, #0
    b.ne L1

L1_print: 
    ldr x1, =input
    ldur x22, [sp]
    stur x22, [x1]
    mov x0, 0 
    mov x2, 1
    mov x8, 64
    svc 0
    
    sub x20, x20, #1
    add sp, sp, #8
    cmp x20, #0
    b.ne L1_print
    
    ldr x1, =newline
    mov x0, 0 
    mov x2, 1
    mov x8, 64
    svc 0

    mov x0, 0
    mov x8, 93
    svc 0 

.data
    newline: .ASCII "\n"
.bss
    input: .skip 1
.end

