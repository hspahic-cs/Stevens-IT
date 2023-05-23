// Name: Harris Spahic
// Date: 10/20/21
// Pledge: "I pledge my honor I have abided by the Stevens Honor System"


.text
.global _start
.extern printf

_start:  
    mov x2, #8
    ldr x3, =ID_vec
    bl find_max
    bl find_max_end

find_max:
    sub SP, SP, #16
    STUR LR, [SP, #8]
    STUR x2, [SP, #0]
    subs XZR, x2, #1   //If size > 1
    B.GT recurse
    ldr x1, [x3]       //First value of address
    add SP, SP, #16
    BR LR

recurse:
    sub x2, x2, #1
    BL find_max
    LDUR x0, [SP, #0]
    LDUR LR, [SP, #8]
    add SP, SP, #16
    add x3, x3, #8
    LDUR x9, [x3]
    subs XZR, x1, x9  //If x1 < x9
    B.LT change
    BR LR

change: 
    mov x1, x9
    BR LR

find_max_end:
    ldr x0, =solution   
    bl printf 
    mov x0, #0
    mov w8, #93
    svc #0
    .data 


ID_vec:  
    .dword 3, 4, 6, 2, 8, 9, 5, 100
solution:
    .ascii "%d\n\0"
    .end
