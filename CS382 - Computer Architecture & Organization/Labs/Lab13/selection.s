.text
.global _start
.extern printf

// Name: Harris Spahic  
// Pledge: "I pledge my honor I have abided by the Stevens Honor System."


// X1 = return address of array, X2 = arrayAddr

_start: 
    BL selection_sort_start
    BL print_result

// X2 = arrayAddr
selection_sort_start: 
    ldr x2, =array
    sub SP, SP, #8
    STUR LR, [SP, #0]
    ldr x8, =size             // x8 = Size of array
    ldr x8, [x8]              
    mov x21, x8               // x21 = size of array
    lsl x21, x21, #3
    add x21, x2, x21          // x21 = address after last element of array (addr + 8 * size)
    subs xzr, x8, #1          // if x8 <= 1 --> end function
    B.LE end_selection_sort
    add x9, x2, xzr           // x9 = s = &a[1]
while_loop: 
    subs xzr, x9, x21         // while &arr[s] < &arr[size]
    B.GE end_selection_sort     
    ldr x10, [x9]             // x10 = min = a[s]
    mov x11, x9               // &a[i] = &a[s]
    mov x4, x9                // local variable x4 = &a[s]
    mov x5, x11               // local variable x5 = first address of i
for_loop:
    subs xzr, x11, x21        // if &a[i] >= &a[size] --> exit
    B.GE exit_for_loop            
    ldr x12, [x11]            // x12 = a[i]               
    subs xzr, x12, x10        // if a[i] < min, switch
    B.LT switch               
return_to_for_loop:
    add x11, x11, #8          // &a[i] = &a[i+1]
    B for_loop

switch:        
    mov x10, x12
    mov x5, x11               // switch min address to new min
    B return_to_for_loop

exit_for_loop: 
    BL swap                    // Swap minimum with current s
    add x9, x9, #8             // &a[s] = &a[s+1]
    B while_loop
    
end_selection_sort:
    ldur LR, [SP, #0]
    add SP, SP, #8
    BR LR
    
// Swap will return nothing, X4 = address of i, X5 = address of j
swap: 
    sub SP, SP, #16
    STUR x9, [SP, #8]
    STUR x10, [SP, #0]
    ldr x9, [x4]        // a = arr[s]
    ldr x10, [x5]       // b = arr[current min]        
    STUR x9, [x5]       // arr[current min] = a
    STUR x10, [x4]      // arr[s] = b
    LDUR x9, [SP, #8]
    LDUR x10, [SP, #0]
    add SP, SP, #16
    BR LR 

print_result:
    mov x11, x2         // make temp = &a[0]
    mov x12, #0
print_loop:
    ldr x0, =solution
    mov x1, x12
    ldr x2, [x11]
    sub SP, SP, #16 
    STUR X11, [SP, #0]
    STUR X12, [SP, #8]
    bl printf
    LDUR X11, [SP, #0]
    LDUR X12, [SP, #8]
    add SP, SP, #16
    add x12, x12, #1
    add x11, x11, #8
    subs xzr, x11, x21  // if x11 >= &a[size] end 
    B.LT print_loop
    mov x0, #0
    mov w8, #93
    svc #0

    .data 

array: 
    .dword 64, 25, 12, 22, 11, -1, -3

size: 
    .dword 7
    
solution:
    .ascii "array[%d] = %d\n" 
    .end

    