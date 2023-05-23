// Name: Harris Spahic
// Pledge: "I pledge my honor I have abided by the Steven's Honor Code"
.text
.global _start
.extern printf

_start:
	ldr X9, =N				// Size = x9
	ldr X9, [X9]			// Ldr size
	ldr X10, =x				// &x = X10 
	ldr x11, =y				// &y = X11	
	bl edge_distances	
	bl print_result
	
edge_distances:
	sub sp, sp, #8
	STUR LR, [sp, #0]
	cmp X9, #1				// If n = 1p
	b.LE end_edge_distances	// End the function
	LSR X21, X9, #1			// haflway = N / 2  = X21
	ADD X22, xzr, xzr		// s = 0 = X22
	
    fsub D15, D15, D15		
	fsub D16, D16, D16 		// max = 0 = D16
	mov x5, xzr				// Minoffset (pair1)	
	mov x6, xzr				// Minoffset (pair2)
	mov x7, xzr				// Maxoffset (pair1)
	mov x8, xzr 			// Maxoffset (pair2)

	mov X3, #1
	mov X4, #0
	bl compute_distance 
	fmov D15, D0	

	ADD X23, X22, #1		// Else i = s + 1 = X23	
	b inner_loop

outer_loop:
	cmp X22, X21			// If s == halfway, end
	b.eq fill_data
	ADD X22, X22, #1
	ADD X23, X22, #1		// Else i = s + 1 = X23
	
inner_loop:					
	cmp X23, X9				// Loop until end of list
	B.EQ outer_loop
	mov X3, X22
	mov X4, X23
	bl compute_distance		// Compute the difference between two points
	
	fcmp D0, D15			// Distance returned 
	B.GE check_max			// If D15 (min) >= distance, skip
	fmov D15, D0			// Else: Min = D15
	mov X5, X22				// Minoffset1 = s
	mov X6, X23				// Minoffset2 = i

check_max:					// Same just switched
	fcmp D0, D16		
	B.LE finish_check
	fmov D16, D0
	mov X7, X22
	mov X8, X23

finish_check:				
	add X23, X23, #1
	b inner_loop

fill_data:					
	mov X1, x5
	mov x2, x6
	mov x3, x7
	mov x4, x8

end_edge_distances:
	LDUR LR, [sp, #0]
	add sp, sp, #8
	br lr

// X10 holds address x, X11 holds address of y, X4 holds offset, return D0
compute_distance:
	sub sp, sp, #48
	STUR D15, [sp, #0]
	STUR D16, [sp, #8]
	STUR D17, [sp, #16]
	STUR D18, [sp, #24]
	STUR X10, [sp, #32]
	STUR X11, [sp, #40]
	
	LSL X3, X3, #3
	ADD X10, X10, X3
	ADD X11, X11, X3
	LDUR D15, [X10]
	LDUR D16, [X11] 	
	LSL X4, X4, #3
	SUB X4, X4, X3
	ADD X10, X4, X10
	ADD X11, X4, X11
	LDUR D17, [X10]
	LDUR D18, [X11]

	FSUB D15, D17, D15
	FSUB D16, D18, D16
	
	FMUL D15, D15, D15
	FMUL D16, D16, D16
	FADD D15, D15, D16

	FMOV D0, D15
	
	LDUR D15, [sp, #0]
	LDUR D16, [sp, #8]
	LDUR D17, [sp, #16]
	LDUR D18, [sp, #24]
	LDUR X10, [sp, #32]
	LDUR X11, [sp, #40]
	add sp, sp, #48
	br lr

// At this point minimum offsets at X1, X2, maximum offsets at X3, X4
print_result:
	cmp X9, #1
	b.gt valid_print
	ldr X0, =error
	mov X1, X9
	b print_end

valid_print: 
	ldr x0, =solution
	
print_end:
	bl printf

	mov x0, #0
    mov w8, #93
    svc #0

.data
N:
	.dword 8
x:
	.double 0.0, 0.4140, 1.4949, 5.0014, 6.5163, 3.9303, 8.4813, 2.6505
y: 	
	.double 0.0, 3.9862, 6.1488, 1.047, 4.6102, 1.4057, 5.0371, 4.1196

large_number: 
	.double 100000000.0

solution:
	.ascii "Minimum distance: (%d,%d) | Maximum distance: (%d,%d) \n\0"
error: 
	.ascii "ERROR: Only 1 point or less %d\n\0"

.end
