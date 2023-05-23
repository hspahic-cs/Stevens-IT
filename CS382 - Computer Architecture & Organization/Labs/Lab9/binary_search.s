.text
.global _start
.extern printf
.extern scanf

_start: 
    BL selection_sort_start    
    ldr x0, =input
    ldr x1, =var
    BL scanf
    ldr x1, =var 
    ldr x1, [x1]

    BL binary_search
    BL print_result

selection_sort_start: 
    ldr x2, =array
    sub SP, SP, #8
    STUR LR, [SP, #0]
    ldr x8, =size             
    ldr x8, [x8]              
    mov x21, x8               
    lsl x21, x21, #3
    add x21, x2, x21          
    subs xzr, x8, #1          
    B.LE end_selection_sort
    add x9, x2, xzr           
while_loop: 
    subs xzr, x9, x21         
    B.GE end_selection_sort     
    ldr x10, [x9]             
    mov x11, x9               
    mov x4, x9                
    mov x5, x11               
for_loop:
    subs xzr, x11, x21        
    B.GE exit_for_loop            
    ldr x12, [x11]                           
    subs xzr, x12, x10        
    B.LT switch               
return_to_for_loop:
    add x11, x11, #8          
    B for_loop

switch:        
    mov x10, x12
    mov x5, x11               
    B return_to_for_loop

exit_for_loop: 
    BL swap                    
    add x9, x9, #8             
    B while_loop
    
end_selection_sort:
    ldur LR, [SP, #0]
    add SP, SP, #8
    BR LR
    
swap: 
    sub SP, SP, #16
    STUR x9, [SP, #8]
    STUR x10, [SP, #0]
    ldr x9, [x4]        
    ldr x10, [x5]               
    STUR x9, [x5]       
    STUR x10, [x4]      
    LDUR x9, [SP, #8]
    LDUR x10, [SP, #0]
    add SP, SP, #16
    BR LR 

binary_search: 
    sub sp, sp, #4
    STUR LR, [sp, #0]
    ldr x2, =array
    ldr x8, =size 
    ldr x8, [x8]       
    sub x8, x8, #1
    mov x9, xzr        
bs_loop:
    subs xzr, x8, x9
    b.LT print_error
    mov x10, x9
    sub x11, x8, x9
    lsr x11, x11, #1
    add x10, x10, x11   
    lsl x11, x10, #3
    add x12, x11, x2    
    ldr x11, [x12]      
    subs xzr, x11, x1   
    b.EQ exit_bs_loop
    b.GT go_left        
    b.LT go_right       

go_left: 
    sub x8, x10, #1 
    b bs_loop

go_right:
    add x9, x10, #1
    b bs_loop

exit_bs_loop:
    LDUR LR, [sp, #0]
    add sp, sp, #4
    mov x1, x10
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
    mov w8, #93
    svc #0

    .data 

array: 
    .dword 64, 25, 12, 22, 11, 1, 3

size: 
    .dword 7

var: 
    .dword 1
    
input:
    .asciz "%ld"

solution:
    .ascii "Value found at i = %d\n\0" 

error: 
    .ascii "Value not found\n\0"

    .end
    